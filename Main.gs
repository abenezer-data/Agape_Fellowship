function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.poll_answer) {
      return handlePollAnswer(data.poll_answer);
    }
    if (data.callback_query) {
      return handleCallbackQuery(data.callback_query);
    }
    if (data.message) {
      return handleMessage(data.message);
    }

  } catch (error) {
    Logger.log(`Error in doPost: ${error.message}`);
  }
}


function setBotMenuButton() {
  const payload = {
    menu_button: { type: 'commands' }
  };
  callTelegramAPI('setChatMenuButton', payload);
}

function setBotCommands() {
  const commands = [
    { command: 'menu', description: '☰ Main Menu' },
    { command: 'donate', description: '❤️ Donate to Support' },
    { command: 'prayer', description: '🙏 Need Prayer?' },
    { command: 'about', description: 'ℹ️ About Us' },
    { command: 'contact', description: '📞 Contact a Leader' },
    { command: 'faq', description: '❓ Frequently Asked Questions' },
    { command: 'feedback', description: '💬 Leave Feedback' },
    { command: 'cancel', description: '❌ Cancel current operation' }
  ];

  callTelegramAPI('setMyCommands', { commands });
}