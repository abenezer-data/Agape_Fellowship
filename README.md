# 📖 Agape Fellowship Bot – README

---

## 📝 Overview
The **Agape Fellowship Telegram Bot** is a multi-functional assistant built with **Google Apps Script** for the **Ethiopian Defence University’s fellowship group**.  
It engages members, delivers **spiritual content**, and simplifies **admin communication**.

---

## ✨ Features

### 👥 For Users
- 📜 **Interactive menu** with Bible verses, gospel songs, life tips  
- 🙏 **Submit prayer requests** & feedback  
- 💳 **View donation info**, leader contacts, and FAQs  
- 📝 **Participate in weekly Bible quizzes**

### 🔑 For Admins
- 🔒 **Password-protected broadcast mode**  
- 📨 Send **text, images, videos, polls** to all members  
- 🔄 **Daily-changing secure access**

---

## 💻 Commands
| Command           | Description                  |
|-------------------|------------------------------|
| `/start` `/menu`  | 📜 Main menu                 |
| `/donate`         | 💳 Donation info             |
| `/prayer`         | 🙏 Submit prayer request     |
| `/about`          | ℹ Fellowship info            |
| `/contact`        | 📞 Leader contacts           |
| `/faq`            | ❓ FAQs                      |
| `/feedback`       | 🗣 Send feedback             |
| `/cancel`         | ❌ Cancel current action/admin mode |

---

## ⚙ Automated Tasks
- ⏰ `sendDailyVerse()` – Daily Bible verse  
- 🎵 `sendRandomGospelSong()` – Random YouTube gospel song  
- 💡 `sendRandomLifeTip()` – Daily life tip  
- 📊 `sendWeeklyQuizPoll()` – Weekly Bible quiz  
- 🎥 `updateVideoCache()` – Refresh YouTube playlist cache  

