function sendDailyVerse() {
  const verseSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Verses');
  if (!verseSheet) return Logger.log("Verses sheet not found.");

  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const verses = verseSheet.getDataRange().getValues();
  const todayVerse = verses.find((verse, index) => {
    if (index === 0) return false;
    const verseDate = Utilities.formatDate(new Date(verse[0]), Session.getScriptTimeZone(), "yyyy-MM-dd");
    return verseDate === today;
  });

  if (todayVerse) {
    const message = `☀️✨ *Rise and shine!* ✨☀️\n📖 Here's your Bible verse for today's blessing:\n\n*${todayVerse[1]}*`;
    broadcastMessage(message);
  } else {
    Logger.log("No verse for today.");
  }
}

function sendRandomGospelSong() {
  const videoSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Videos');
  if (!videoSheet) return Logger.log('Videos sheet not found.');

  const videos = videoSheet.getDataRange().getValues();
  if (videos.length === 0) return Logger.log('No cached videos found.');

  const randomIndex = Math.floor(Math.random() * videos.length);
  const [title, videoId] = videos[randomIndex];
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const message = `🎵 *Gospel Vibes Feed*\n\n${title}\n🔗 ${videoUrl}`;

  broadcastMessage(message);
}

function sendRandomLifeTip() {
  const tipsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tips');
  if (!tipsSheet) return Logger.log('Tips sheet not found.');

  const tips = tipsSheet.getDataRange().getValues().slice(1); // Skip header
  if (tips.length === 0) return Logger.log('No tips found');

  const [category, tipText] = tips[Math.floor(Math.random() * tips.length)];
  const message = `💡 *Life Tip* (${category})\n\n${tipText}`;

  broadcastMessage(message);
}

function sendWeeklyQuizPoll() {
  const quizSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Quiz');
  if (!quizSheet) return Logger.log('Quiz sheet not found.');

  const props = PropertiesService.getScriptProperties();
  const data = quizSheet.getDataRange().getValues().slice(1); // Remove header
  const totalQuizzes = data.length;
  let nextIndex = (parseInt(props.getProperty("lastQuizIndex") || totalQuizzes)) - 1;
  if (nextIndex < 0) nextIndex = totalQuizzes - 1; // Wrap around

  const [question, optA, optB, optC, optD, correctLetterRaw] = data[nextIndex];
  // ... [Rest of the quiz logic remains the same] ...
  // This function is quite complex and remains largely unchanged internally.
}

function updateVideoCache() {
  const allVideos = fetchYouTubePlaylistVideos(CONFIG.UPLOADS_PLAYLIST_ID);
  if (allVideos.length > 0) {
    const sheet = getOrCreateSheet('Videos', ['Title', 'Video ID']);
    sheet.clearContents().getRange(1, 1, 1, 2).setValues([['Title', 'Video ID']]);
    sheet.getRange(2, 1, allVideos.length, 2).setValues(allVideos);
    Logger.log(`Cached ${allVideos.length} videos`);
  }
}