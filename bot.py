import json
import time
import os
import schedule
from telegram import Update, Bot
from telegram.ext import CommandHandler, CallbackContext, Updater

# === CONFIGURATION ===
BOT_TOKEN = os.getenv("BOT_TOKEN")  
VERSE_FILE = 'verses.json'
USER_FILE = 'users.txt'

# Ensure token is available
if not BOT_TOKEN:
    raise ValueError("BOT_TOKEN environment variable not set!")

bot = Bot(token=BOT_TOKEN)

# === Load verses from JSON ===
def load_verses():
    with open(VERSE_FILE, 'r') as f:
        return json.load(f)

# === Load users ===
def load_users():
    try:
        with open(USER_FILE, 'r') as f:
            return set(line.strip() for line in f)
    except FileNotFoundError:
        return set()

# === Save user ===
def save_user(user_id):
    users = load_users()
    if str(user_id) not in users:
        with open(USER_FILE, 'a') as f:
            f.write(f"{user_id}\n")

# === Handle /start command ===
def start(update: Update, context: CallbackContext):
    user_id = update.effective_user.id
    save_user(user_id)
    context.bot.send_message(chat_id=user_id, text="🙏 Welcome to Agape Fellowship! ✨")

# === Send verse to users ===
def send_daily_verse():
    verses = load_verses()
    users = load_users()
    if not verses:
        print(" No verses found in JSON file.")
        return

    verse = verses[int(time.time()) % len(verses)]  # Rotate through verses

    for user_id in users:
        try:
            bot.send_message(chat_id=int(user_id), text=f"📖 *Daily Bible Verse*\n\n{verse}", parse_mode="Markdown")
        except Exception as e:
            print(f"Failed to send to {user_id}: {e}")

# === Main Bot Setup ===
def main():
    updater = Updater(token=BOT_TOKEN)
    dispatcher = updater.dispatcher
    dispatcher.add_handler(CommandHandler("start", start))

    updater.start_polling()

    # Schedule daily verse
    schedule.every().day.at("08:00").do(send_daily_verse)

    print("✅ Bot is running...")

    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == '__main__':
    main()
