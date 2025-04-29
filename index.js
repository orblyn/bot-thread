require('./server');
require("dotenv").config(); // Pastikan ini ada di paling atas
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

const allowedChannelIds = [
  "1366357179828932729", // ID channel
  "1366357981146386442", // ID channel
];

client.on("ready", () => {
  console.log(`Bot aktif sebagai ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (!allowedChannelIds.includes(message.channel.id)) return;
  if (message.author.bot || !message.attachments.size) return;

  const validAttachment = [...message.attachments.values()].some(
    (att) =>
      att.contentType &&
      (att.contentType.startsWith("image/") ||
        att.contentType.startsWith("video/")),
  );

  if (validAttachment) {
    try {
      await message.startThread({
        name: `Thread: ${message.author.username}`,
        autoArchiveDuration: 1440,
        reason: "Thread otomatis untuk media",
      });
      console.log(`Thread created for message from ${message.author.username}`);
    } catch (error) {
      console.error("Gagal buat thread:", error);
    }
  }
});

client.login(process.env.TOKEN); // Ambil token dari file .env
