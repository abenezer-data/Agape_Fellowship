gape Fellowship Bot – README
Overview
The Agape Fellowship Telegram Bot is a multi-functional assistant built with Google Apps Script for Ethiopian Defence University’s fellowship group. It engages members, delivers spiritual content, and simplifies admin communication.

Features
For Users:

Interactive menu with Bible verses, gospel songs, life tips.

Submit prayer requests & feedback.

View donation info, leader contacts, and FAQs.

Participate in weekly Bible quizzes.

For Admins:

Password-protected broadcast mode.

Send text, images, videos, polls to all members.

Daily-changing secure access.

Commands
/start /menu – Main menu
/donate – Donation info
/prayer – Submit prayer request
/about – Fellowship info
/contact – Leader contacts
/faq – FAQs
/feedback – Send feedback
/cancel – Cancel current action/admin mode

Automated Tasks
sendDailyVerse() – Daily Bible verse

sendRandomGospelSong() – Random YouTube gospel song

sendRandomLifeTip() – Daily life tip

sendWeeklyQuizPoll() – Weekly Bible quiz

updateVideoCache() – Refresh YouTube playlist cache

Setup
Google Sheet – Create tabs: Users, Prayer Requests, Feedback, Verses, Quiz, Tips, Videos.

Config – In config.gs add TELEGRAM_TOKEN, YOUTUBE_API_KEY, playlist ID, sheet names.

Deploy – Deploy > New deployment > Web app → Get URL.

Webhook –

bash
Copy
Edit
https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=<WEB_APP_URL>
Run Setup – Manually run setBotCommands() & setBotMenuButton().

Triggers – Add time-based triggers for automated tasks.
