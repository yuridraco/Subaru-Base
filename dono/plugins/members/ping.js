const os = require("os");

module.exports = {
name: "ping-pl",

run: async ({ subaru, msg, from, sender, isGroup, pushname, seloSz, react }) => {
try {
const start = Date.now();
react("🔥");
const end = Date.now();
const latency = end - start;
const memoryUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
const uptime = (process.uptime() / 60).toFixed(2);
const nodeVersion = process.version;
const platform = os.platform();
await subaru.sendMessage(from, {
text: `⚡ Pong!\n\n` +
`📌 Latência: ${latency}ms\n` +
`💻 Plataforma: ${platform}\n` +
`🟢 Node: ${nodeVersion}\n` +
`📈 Memória usada: ${memoryUsed} MB\n` +
`⏱️ Uptime: ${uptime} min\n` +
`👤 Usuário: ${pushname}\n` +
`🔹 Grupo: ${isGroup ? "Sim" : "Não"}\n`
}, {quoted: seloSz});

} catch (e) {
console.error(`❌ Erro no plugin ${module.exports.name}:`, e);
await subaru.sendMessage(from, { text: "⚠️ Ocorreu um erro ao executar o comando." });
}
}
};