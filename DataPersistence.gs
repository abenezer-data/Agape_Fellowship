function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (headers && headers.length > 0) {
      sheet.appendRow(headers);
    }
  }
  return sheet;
}

function registerUser(userName, chatId) {
  const sheet = getOrCreateSheet('Users', ['Name', 'Chat ID']);
  const ids = sheet.getRange(2, 2, sheet.getLastRow(), 1).getValues().flat();
  if (!ids.includes(chatId)) {
    sheet.appendRow([userName, chatId]);
  }
}

function handlePrayerRequest(chatId, userId, userName, text) {
  const sheet = getOrCreateSheet('Prayer Requests', ['Date', 'User ID', 'Name', 'Prayer Request', 'Status']);
  sheet.appendRow([new Date(), userId, userName, text, 'New']);
  PropertiesService.getScriptProperties().deleteProperty(`user_${userId}_state`);
  sendMessage(chatId, '🙏 Thank you for sharing. Our team will lift you up in prayer.\n\nUse /menu to return.');
}

function handleFeedback(chatId, userId, userName, text) {
  const sheet = getOrCreateSheet('Feedback', ['Date', 'User ID', 'Name', 'Feedback']);
  sheet.appendRow([new Date(), userId, userName, text]);
  PropertiesService.getScriptProperties().deleteProperty(`user_${userId}_state`);
  sendMessage(chatId, '💬 Thank you for your feedback! We appreciate your input.\n\nUse /menu to return.');
}