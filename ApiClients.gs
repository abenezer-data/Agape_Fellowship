function callTelegramAPI(method, payload) {
  try {
    const response = UrlFetchApp.fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_TOKEN}/${method}`, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log(`Error calling Telegram API method ${method}: ${error.message}`);
    return null;
  }
}

function fetchYouTubePlaylistVideos(playlistId) {
  let allVideos = [];
  let nextPageToken = '';
  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${CONFIG.YOUTUBE_API_KEY}&pageToken=${nextPageToken}`;
    try {
      const response = UrlFetchApp.fetch(url);
      const data = JSON.parse(response.getContentText());
      data.items.forEach(item => {
        allVideos.push([item.snippet.title, item.snippet.resourceId.videoId]);
      });
      nextPageToken = data.nextPageToken || '';
    } catch (error) {
      Logger.log(`Error fetching YouTube videos: ${error.message}`);
      break;
    }
  } while (nextPageToken);
  return allVideos;
}