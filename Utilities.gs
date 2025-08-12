function sendMessage(chatId, text, keyboard = null) {
  const payload = {
    chat_id: String(chatId),
    text: text,
    parse_mode: 'Markdown'
  };
  if (keyboard) {
    payload.reply_markup = keyboard;
  }
  return callTelegramAPI('sendMessage', payload);
}


function sendMenuMessage(chatId, text) {
  const keyboard = {
    inline_keyboard: [
      [{ text: '❤️ Donate to Support', callback_data: 'donate' }, { text: '🙏 Need Prayer?', callback_data: 'prayer' }],
      [{ text: 'ℹ️ About Us', callback_data: 'about' }, { text: '📞 Contact a Leader', callback_data: 'contact' }],
      [{ text: '❓ FAQ', callback_data: 'faq' }, { text: '💬 Leave your Feedback', callback_data: 'feedback' }]
    ]
  };
  sendMessage(chatId, text, keyboard);
}

function broadcastMessage(message) {
  const userSheet = getOrCreateSheet('Users');
  if (userSheet.getLastRow() < 2) return;
  const users = userSheet.getRange(2, 2, userSheet.getLastRow() - 1, 1).getValues();
  users.forEach(user => {
    sendMessage(user[0], message);
  });
}


function forwardEventToUsers(message) {
  const usersSheet = getOrCreateSheet("Users");
  if (usersSheet.getLastRow() < 2) return;

  const userRows = usersSheet.getRange(2, 2, usersSheet.getLastRow() - 1, 1).getValues();
  const adminChatId = message.chat.id;
  const messageId = message.message_id;

  // Forwards rich media (photos, videos, etc.)
  if (message.photo || message.video || message.audio || message.document) {
      userRows.forEach(user => {
          callTelegramAPI('copyMessage', { chat_id: user[0], from_chat_id: adminChatId, message_id: messageId });
      });
  // Handle polls separately
  } else if (message.poll) {
      // Logic to recreate and send poll to all users
  } else if (message.text) {
      broadcastMessage(message.text);
  }
}

function getFAQText() {
  return `❓ **Frequently Asked Questions**

**Q: What is Agape Fellowship?**
A: We are a Christian fellowship sharing God's love.

**Q: When do you meet?**
A: Saturday 02:00 PM @ Beza High School.

**Q: How can I get involved?**
A: Attend services or contact a leader.

**Q: How can I request prayer?**
A: Use the "🙏 Need Prayer?" menu option.

**Q: Can I donate online?**
A: Use "❤️ Donate to Support" from the menu.`;
}

function getTodayPassword() {
  const today = new Date().getDate().toString().padStart(2, '0');
  return `agape_${today}`;
}