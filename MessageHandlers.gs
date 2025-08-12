function handleMessage(message) {
  const chatId = message.chat.id;
  const text = message.text;
  const isAdminMode = CacheService.getScriptCache().get(`admin_mode_${chatId}`) === 'true';

  // Check for password to enter admin mode
  if (text === getTodayPassword()) {
    CacheService.getScriptCache().put(`admin_mode_${chatId}`, 'true', CONFIG.CACHE_DURATION);
    sendMessage(chatId, "🔒 Password verified! You are now in broadcast mode.\n\nPlease send your event message, or type /cancel to exit.");
    return;
  }

  // Handle admin broadcast mode
  if (isAdminMode) {
    if (text && text.startsWith('/')) {
        CacheService.getScriptCache().remove(`admin_mode_${chatId}`);
        if(text.toLowerCase() === '/cancel'){
             return sendMessage(chatId, "Broadcast mode cancelled.");
        }
        handleUserCommand(message); // Process the original command for the admin
        return;
    }
    forwardEventToUsers(message);
    CacheService.getScriptCache().remove(`admin_mode_${chatId}`);
    sendMessage(chatId, "✅ Event sent to all users!");
    return;
  }

  // Handle regular user messages and commands
  if (text) {
    handleUserCommand(message);
  }
}


function handleUserCommand(message) {
  const { chat, text, from } = message;
  const chatId = chat.id;
  const userName = chat.first_name || 'Friend';
  const userId = from.id;

  registerUser(userName, chatId);

  const props = PropertiesService.getScriptProperties();
  const userState = props.getProperty(`user_${userId}_state`);

  // Handle user states for prayer and feedback
  if (userState === 'waiting_prayer') {
    return handlePrayerRequest(chatId, userId, userName, text);
  }
  if (userState === 'waiting_feedback') {
    return handleFeedback(chatId, userId, userName, text);
  }

  // Handle commands
  const command = text.trim().toLowerCase();
  switch (command) {
    case '/start':
    case '/menu':
      const welcome = `🌟 **Welcome to our fellowship ${userName}!** 🌟\n❤️ A place to share God's love and build lasting friendships 🤝\n\nPlease choose an option from the menu below:`;
      sendMenuMessage(chatId, welcome);
      break;
    case '/donate':
      sendMessage(chatId, `❤️ *Support Agape Fellowship* ❤️\n\nYour generosity fuels our mission to spread Christ’s love, care for the hurting, and disciple the next generation.\n\n📖 *"እግዚአብሔር በደስታ የሚሰጠውን ይወዳልና እያንዳንዱ በልቡ እንዳሰበ ይስጥ፥ በኀዘን ወይም በግድ አይደለም።"* – 2ኛ ቆሮንቶስ 9:7\n📍 *Bank Transfer Info:*\n*Name:* Dawit Teshome\n*Account Number:* 1000406564995`);
      break;
    case '/prayer':
      props.setProperty(`user_${userId}_state`, 'waiting_prayer');
      sendMessage(chatId, '🙏 Please share your prayer request below.');
      break;
    case '/about':
      sendMessage(chatId, `🎓 *About Agape Fellowship – EDU* 💒\n\nAgape Fellowship is more than just a group — it's *a family of faith* for university students like you, journeying together through campus life with Jesus at the center.\n\n💛 Whether you're adjusting to college, facing challenges, or simply longing for a deeper relationship with God — *you belong here*.\n\nWe are a student-led Christian fellowship committed to growing in Christ, loving one another genuinely, and being a light on campus. Through weekly meetups, Bible studies, worship nights, and prayer, we create a safe and joyful space to know God and make Him known.\n\n📖 *“በወንድማማች መዋደድ እርስ በርሳችሁ ተዋደዱ፤ እርስ በርሳችሁ ተከባበሩ፤”* – ሮሜ 12:10\n\n— With all our hearts,  \n*Agape Fellowship, EDU University* 🤍`);
      break;
    case '/contact':
      sendMessage(chatId, '📞 **Contact our Leaders:**\n\nFiraol Teklu: 0960611176\nDawit Teshome: 0940455910\nDibora: 0961332017');
      break;
    case '/faq':
      sendMessage(chatId, getFAQText());
      break;
    case '/feedback':
      props.setProperty(`user_${userId}_state`, 'waiting_feedback');
      sendMessage(chatId, '💬 Please share your feedback with us. Your thoughts help us improve!');
      break;
    default:
      sendMessage(chatId, '🤖 Unknown command. Use /menu to see available options.');
  }
}


function handleCallbackQuery(query) {
  const { message, from, data } = query;
  const chatId = message.chat.id;
  const userId = from.id;
  const props = PropertiesService.getScriptProperties();

  // Answer the callback query to remove the "loading" state on the button
  callTelegramAPI('answerCallbackQuery', { callback_query_id: query.id });

  const responses = {
    donate: () => sendMessage(chatId, '**Dawit Teshome**\n1000406564995'),
    prayer: () => {
      props.setProperty(`user_${userId}_state`, 'waiting_prayer');
      sendMessage(chatId, '🙏 Please share your prayer request below.');
    },
    about: () => sendMessage(chatId, `🎓 *About Agape Fellowship – EDU* 💒\n\nAgape Fellowship is more than just a group — it's *a family of faith* for university students like you...`), // Truncated for brevity
    contact: () => sendMessage(chatId, '📞 **Contact our Leaders:**\n\nFiraol Teklu: 0960611176\nDawit Teshome: 0940455910\nDibora: 0961332017'),
    faq: () => sendMessage(chatId, getFAQText()),
    feedback: () => {
      props.setProperty(`user_${userId}_state`, 'waiting_feedback');
      sendMessage(chatId, '💬 Please share your feedback with us.');
    }
  };

  const handler = responses[data];
  if (handler) {
    handler();
  } else {
    sendMessage(chatId, "Sorry, I didn't understand that option.");
  }
}


function handlePollAnswer(poll) {
  const { poll_id, user, option_ids } = poll;
  const props = PropertiesService.getScriptProperties();
  const meta = JSON.parse(props.getProperty(poll_id) || '{}');

  // Differentiate between admin polls and regular quizzes
  if (meta.is_admin_poll) {
    const sheet = getOrCreateSheet('resposonse(admin)', ['Date', 'User ID', 'Name', 'Question', 'Answer', 'Poll ID']);
    sheet.appendRow([new Date(), user.id, user.first_name || '', meta.question, meta.options[option_ids[0]], poll_id]);
  } else {
    if (!meta.correctIndex || option_ids[0] !== meta.correctIndex) return;
    const sheet = getOrCreateSheet('Responses', ['Date', 'User ID', 'Name', 'Question', 'Answer', 'Correct', 'Poll ID']);
    sheet.appendRow([new Date(), user.id, user.first_name || '', meta.question, meta.options[option_ids[0]], 'Yes', poll_id]);
  }
}