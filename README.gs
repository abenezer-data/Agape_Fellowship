/**
 * ===================================================================================
 * |                           AGAPE FELLOWSHIP BOT - README                         |
 * ===================================================================================
 *
 * This document provides an overview of the Agape Fellowship Telegram Bot, its
 * features, setup instructions, and code structure.
 * -----------------------------------------------------------------------------------
 *
 * I. INTRODUCTION
 *
 * The Agape Fellowship Bot is a multi-functional Telegram bot built using Google Apps
 * Script. It serves as a digital assistant for the Agape Fellowship at Ethiopian Defence University,
 * designed to engage members, provide essential information, automate content delivery,
 * and streamline communication between leaders and the congregation.
 *
 * -----------------------------------------------------------------------------------
 *
 * II. CORE FEATURES
 *
 * ### For Regular Users:
 * - **Interactive Menu:** Easy navigation through inline keyboard buttons.
 * - **Spiritual Resources:** Receive daily Bible verses, random gospel songs, and life tips.
 * - **Prayer Requests:** Submit prayer requests privately, which are logged for the prayer team.
 * - **Donations:** Get information on how to support the fellowship financially.
 * - **Information Hub:** Access details about the fellowship, contact info for leaders, and FAQs.
 * - **Feedback System:** Users can submit feedback to help improve the fellowship.
 * - **Weekly Quiz:** Participate in weekly Bible quizzes and see correct answers.
 *
 * ### For Admins:
 * - **Broadcast Mode:** A password-protected mode to send messages to all subscribed users.
 * - **Rich Content Broadcasting:** Admins can send text, photos, videos, documents, and create polls that are instantly forwarded to everyone.
 * - **Secure Access:** Admin access is temporary and secured with a password that changes daily.
 *
 * -----------------------------------------------------------------------------------
 *
 * III. USER COMMANDS
 *
 * - `/start` or `/menu`: Displays the main welcome message and interactive menu.
 * - `/donate`: Shows bank details for donations.
 * - `/prayer`: Initiates the process for a user to submit a prayer request.
 * - `/about`: Provides a detailed description of the Agape Fellowship.
 * - `/contact`: Lists the names and phone numbers of the fellowship leaders.
 * - `/faq`: Shows a list of frequently asked questions.
 * - `/feedback`: Allows the user to send their feedback.
 * - `/cancel`: Exits the current operation (like submitting feedback) or cancels broadcast mode for an admin.
 *
 * -----------------------------------------------------------------------------------
 *
 * IV. AUTOMATED TASKS (TRIGGERS)
 *
 * These functions are designed to run on a time-based schedule set up in the Apps
 * Script Triggers section.
 *
 * - `sendDailyVerse()`: Sends a pre-selected Bible verse for the day. (Recommended Trigger: Daily)
 * - `sendRandomGospelSong()`: Sends a link to a random YouTube video from the fellowship's playlist. (Recommended Trigger: Daily)
 * - `sendRandomLifeTip()`: Sends a helpful life tip from the 'Tips' sheet. (Recommended Trigger: Daily)
 * - `sendWeeklyQuizPoll()`: Sends a multiple-choice quiz from the 'Quiz' sheet. (Recommended Trigger: Weekly)
 * - `updateVideoCache()`: Fetches the latest videos from the YouTube playlist to keep the song list fresh. (Recommended Trigger: Daily or Weekly)
 *
 * -----------------------------------------------------------------------------------
 *
 * V. SETUP & INSTALLATION
 *
 * Follow these steps to get the bot running:
 *
 * 1.  **GOOGLE SHEET SETUP:**
 * - This script is bound to a Google Sheet. Create the following tabs (case-sensitive):
 * - `Users`: Will store user names and chat IDs. Headers: `Name`, `Chat ID`.
 * - `Prayer Requests`: Logs all prayer requests.
 * - `Feedback`: Logs all user feedback.
 * - `Verses`: Stores daily verses. Headers: `Date` (in YYYY-MM-DD format), `Verse Text`.
 * - `Quiz`: Stores weekly quiz questions. Headers: `Question`, `Option A`, `Option B`, etc., `Correct Answer Letter`.
 * - `Tips`: Stores life tips. Headers: `Category`, `Tip Text`.
 * - `Videos`: Acts as a cache for YouTube videos. Headers: `Title`, `Video ID`.
 *
 * 2.  **CONFIGURATION (`Configuration.gs`):**
 * - Get a `TELEGRAM_TOKEN` from the BotFather on Telegram.
 * - Get a `YOUTUBE_API_KEY` from the Google Cloud Platform console.
 * - Find the `UPLOADS_PLAYLIST_ID` for your fellowship's YouTube channel.
 * - Paste these values into the `CONFIG` object in `Configuration.gs`.
 *
 * 3.  **DEPLOY THE SCRIPT:**
 * - In the Apps Script editor, go to `Deploy` > `New deployment`.
 * - Select `Web app` as the deployment type.
 * - Configure it as follows:
 * - Execute as: `Me`
 * - Who has access: `Anyone` (This is required for Telegram to reach the script)
 * - Click `Deploy`. Copy the provided Web app URL.
 *
 * 4.  **SET THE TELEGRAM WEBHOOK:**
 * - Take the Web app URL you just copied and run the following command in your browser or a terminal (replace placeholders):
 * `https://api.telegram.org/bot<YOUR_TELEGRAM_TOKEN>/setWebhook?url=<YOUR_WEB_APP_URL>`
 * - A success message `{"ok":true,"result":true,"description":"Webhook was set"}` will appear.
 *
 * 5.  **INITIAL BOT SETUP:**
 * - From the Apps Script editor, manually run the `setBotCommands()` and `setBotMenuButton()` functions once to register your command list with Telegram.
 *
 * 6.  **SET UP TRIGGERS:**
 * - In the Apps Script editor, go to the `Triggers` section (clock icon).
 * - Click `Add Trigger` and create time-based triggers for each function in the `AutomatedTriggers.gs` file according to your desired schedule.
 *
 * -----------------------------------------------------------------------------------
 *
 * VI. FILE STRUCTURE
 *
 * The code is organized into logical groups (files) for better management:
 *
 * - `README.gs`: (This file) Project documentation.
 * - `Configuration.gs`: Stores all API keys and static configuration values.
 * - `Main.gs`: The main entry point (`doPost`) and one-time setup functions.
 * - `MessageHandlers.gs`: Handles all direct interactions from users (messages, commands, button clicks).
 * - `AutomatedTriggers.gs`: Contains all functions designed to be run on a schedule.
 * - `DataPersistence.gs`: Manages all communication with Google Sheets and Properties Service.
 * - `ApiClients.gs`: Contains wrapper functions for making calls to external APIs (Telegram, YouTube).
 * - `Utilities.gs`: A collection of helper functions used across the project (e.g., sending messages, broadcasting).
 *
 * ===================================================================================
 */