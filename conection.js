/*
* Oi, se tá lendo isso, é porque tem interesse no bot. Muito obrigado! 
* Esse bot é gratuito, se pagou por ele, exija seu dinheiro de volta.
* Achou o bot legal ou tá pensando em kibar algo? Pelo menos segue o meu canal, kk
* Raikken-API: https://whatsapp.com/channel/0029VbB75r1HFxOvPXYp7Z10
*/

const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, isJidBroadcast,isJidStatusBroadcast, makeInMemoryStore,getContentType, makeCacheableSignalKeyStore, cacheService } = require("baileys");
const fs = require('fs')
const pino = require("pino");
const chalk = require('chalk')
const path= require('path')
const readline = require("readline");
const NodeCache  = require('node-cache');
const LoggerB = require('baileys/lib/Utils/logger').default;
const logger = LoggerB.child({});  
logger.level = 'silent';  
const { escolherPersonalidadeSubaru, escolherVideoPorRota, getFileBuffer, checkPrefix, fetchJson, getBuffer, data, hora, sincronizarCases, esperar, groupConfigCache, delay, getRandomSaudacao } = require('./dono/functions.js')

const { handleCmds } = require("./index.js");
let fotoperfil = fs.readFileSync("./database/imgs/perfil.jpeg");
const { prefix, botName, donoName, donoNmr, idCanal } = require('./dono/configs/settings.json');

const groupMetadataCache = new NodeCache({
stdTTL: 300,
checkperiod: 120 
});

async function getGroupMetadataSafe(groupId, subaru) {
if (groupMetadataCache.has(groupId)) { return groupMetadataCache.get(groupId)}
try {
const meta = await subaru.groupMetadata(groupId);
groupMetadataCache.set(groupId, meta);
return meta;
} catch (e) {
console.error(`Erro ao buscar metadata do grupo ${groupId}:`, e);
return { subject: "Grupo Desconhecido", participants: [] };
}}

function getGroupConfig(id) {
const cached = groupConfigCache.get(id);
if (cached) return cached;
if (!fs.existsSync(`./database/grupos/${id}.json`)) return null;
const config = JSON.parse(fs.readFileSync(`./database/grupos/${id}.json`));
groupConfigCache.set(id, config);
return config;
}

const well = fs.readFileSync("./database/imgs/well.png");
const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

const startConnection = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("./dono/configs/session");
  const { version } = await fetchLatestBaileysVersion();
  const isJidNewsletter = (jid) => jid?.endsWith("@newsletter");

  const subaru = makeWASocket({
    version: [2, 3000, 1025190524],
    logger: pino({ level: "silent" }),
    printQRInTerminal: !process.argv.includes("--code"),
    browser: ['Linux', 'Opera', '110.0.5481.100'],
    auth: state,
    markOnlineOnConnect: false,
    syncFullHistory: false,
    keys: makeCacheableSignalKeyStore(state.keys, logger),  
    groupMetadataCache,
    shouldIgnoreJid: (jid) =>
      isJidBroadcast(jid) || isJidStatusBroadcast(jid) || isJidNewsletter(jid),
    getMessage: async (key) => {
      const msg = await store.loadMessage(key.remoteJid, key.id);
      return msg?.message || undefined;
    },
  });
    
  store.bind(subaru.ev);
  if (process.argv.includes("--code") && !subaru.authState.creds.registered) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const question = (text) => new Promise((resolve) => rl.question(text, resolve));
    let phoneNumber = await question("Insira o número de telefone para conectar: ")
    phoneNumber = phoneNumber.replace(/\D/g, "");
    const code = await subaru.requestPairingCode(phoneNumber);
    console.log(`Seu código de pareamento: ${code?.match(/.{1,4}/g)?.join("-") || code}`)
    rl.close();
  }

  let isRestart = false
  subaru.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log(`Conexão fechada. Motivo: ${lastDisconnect.error?.output?.statusCode}.`),
        console.log(`Reconectando: ${shouldReconnect}`)
      if (shouldReconnect) {
        isRestart = true
        startConnection();
      }
    } else if (connection === "open") {
     if (!isRestart) {
     await esperar(500)
     await subaru.updateProfilePicture(subaru.user.id, fotoperfil);
     await esperar(500)
     const saudacao = getRandomSaudacao(donoName, prefix);
     await subaru.sendMessage(`${donoNmr}@s.whatsapp.net`, { text: saudacao });
     await sincronizarCases(subaru)
     }
     await console.log(chalk.blueBright("\nSubaru-Bot ativo!\n"));
    }
  });

  subaru.ev.on("creds.update", saveCreds);

  subaru.ev.on("messages.upsert", async ({ messages, type }) => {
    const msg = messages[0];    
    try {
    if (type !== "notify" || !msg.message || msg.key.remoteJid === "status@broadcast") {return; }
    if (!msg.message) {return; }
    const info = msg 
    var body = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info.message?.buttonsResponseMessage?.selectedButtonId || info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || info.message?.templateButtonReplyMessage?.selectedId || info?.text || ""
    const from = msg.key.remoteJid || msg.key.remoteLid || msg.key.participantAlt;    
    const isGroup = from.endsWith("@g.us");
    const isCmd = body.startsWith(prefix);
    const sender = msg.key.participant || msg.key.remoteJid || msg.key.remoteLid || msg.key.participantLid || msg.key.participantAlt
    const pushname = msg.pushName || "Usuário";
    const groupMetadata = isGroup ? await getGroupMetadataSafe(from, subaru) : {};
    const groupName = isGroup ? groupMetadata.subject : "Conversa Privada";
    const groupMembers = isGroup ? groupMetadata.participants : []
    const senderObject = groupMembers.find(member => member.jid === sender);
    let senderLid = null
    if (senderObject) {
    senderLid = senderObject.lid; }
    const cmd = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : null;
    const hora = new Date().toLocaleTimeString("pt-BR");
    let comando = cmd         
// 🔘 Botão tipo Native Flow (paramsJson)
    if (msg.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson) {
        try {
            const json = JSON.parse(msg.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson);
            let  comando = json.selectedRowId;
        } catch (e) {
        console.error("Erro ao parsear paramsJson:", e);
        }}
// Botão simples
    if (!comando && msg.message?.buttonsResponseMessage?.selectedButtonId) {
  comando = msg.message.buttonsResponseMessage.selectedButtonId; }
// Lista
    if (!comando && msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId) {
  comando = msg.message.listResponseMessage.singleSelectReply.selectedRowId; }  
   
    const messageQueue = [];
    let processingQueue = false;
    async function processQueue() {
      if (processingQueue) return;
      processingQueue = true;
      while (messageQueue.length > 0) {
      const msg = messageQueue.shift();
      await handleCmds(subaru, msg);
      await new Promise(r => setTimeout(r, delay));  }
       processingQueue = false;}
     messageQueue.push(msg);
     processQueue();
    
      
     if (cmd) {
        console.log(
        chalk.blueBright("\n╔══════╌✯╌═⊱×⊰ 𝐒𝐮𝐛𝐚𝐫𝐮-𝐁𝐚𝐬𝐞 ⊰×⊰═╌✯╌══════╗") + "\n" +
        chalk.blueBright("║★ ") + chalk.white.bold("[ COMANDO DETECTADO ]") + "\n" +
        chalk.blueBright("║") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Tipo: ") + chalk.greenBright(isGroup ? "Grupo" : "Privado") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Grupo: ") + chalk.yellowBright(groupName || "-") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Usuário: ") + chalk.yellowBright(`${pushname} (${sender.split("@")[0]}) (Lid: ${senderLid || 'não veio'})`) + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Comando: ") + chalk.greenBright(cmd) + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Horário: ") + chalk.gray(hora) + "\n" +
        chalk.blueBright("╚══════╌✯╌═⊱×⊰ 𝐒𝐮𝐛𝐚𝐫𝐮-𝐁𝐚𝐬𝐞 ⊰×⊰═╌✯╌══════╝\n"))
       } else if (body) {
        console.log(
        chalk.blueBright("\n╔══════╌✯╌═⊱×⊰ 𝐒𝐮𝐛𝐚𝐫𝐮-𝐁𝐚𝐬𝐞 ⊰×⊰═╌✯╌══════╗") + "\n" +
        chalk.blueBright("║★ ") + chalk.white.bold("[ MENSAGEM RECEBIDA ]") + "\n" +
        chalk.blueBright("║") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Tipo: ") + chalk.greenBright(isGroup ? "Grupo" : "Privado") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Grupo: ") + chalk.yellowBright(groupName || "-") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Usuário: ") + chalk.yellowBright(`${pushname} (${sender.split("@")[0]}) (Lid: ${msg.key.participantLid || 'nao veio'})`) + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Mensagem: ") + chalk.greenBright(body) + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Horário: ") + chalk.gray(hora) + "\n" +
        chalk.blueBright("╚══════╌✯╌═⊱×⊰ 𝐒𝐮𝐛𝐚𝐫𝐮-𝐁𝐚𝐬𝐞 ⊰×⊰═╌✯╌══════╝\n"))}
    } catch (err) {
        if (String(err).includes('SenderKeyRecord') || String(err).includes('decrypt') || String(err).includes('SenderKeyRecord') || String(err).includes('no session')) {
            console.log('⚠️ Mensagem não pôde ser decriptada (sem chave SenderKey), ignorando...');
            return;
        }
        console.error('Erro inesperado:', err);
    }
  });
  
  subaru.ev.on("group-participants.update", async (update) => {
    const { id, action, participants } = update;
    const groupSettingsPath = `./database/grupos/${id}.json`;   
    if (!fs.existsSync(groupSettingsPath)) return;
    try {
      const groupSettings = getGroupConfig(id);
       if (!groupSettings) return;
      const welcomeConfig = groupSettings[0]?.bemVindo?.[0];
      if (!welcomeConfig?.ativo) return;
      const groupMetadata = await getGroupMetadataSafe(id, subaru);
      const groupName = groupMetadata.subject;
      const member = participants[0];
      let textinh = "";
      if (action === "add" && welcomeConfig.entrou) {
        textinh = welcomeConfig.entrou
          .replace("%numero%", member.split("@")[0])
          .replace("%nomeGrupo%", groupName);
      } else if (action === "remove" && welcomeConfig.saiu) {
        textinh = welcomeConfig.saiu
          .replace("%numero%", member.split("@")[0])
          .replace("%nomeGrupo%", groupName);
      } 
      if (textinh) {
        await subaru.sendMessage(id, {text: textinh, mentions: [member], 
         contextInfo: { externalAdReply: {
         title: `Meu prefixo: ${prefix}`,
         body: '',
         previewType: "PHOTO",
         thumbnailUrl: well,
         mediaType: 1,
         mediaUrl: 'https://raikken-api.speedhosting.cloud/',
         sourceUrl: 'https://raikken-api.speedhosting.cloud/'}}});
      }} catch (e) {
      console.error(`Erro no evento 'group-participants.update' para o grupo ${id}:`, e);
      if (e?.data === 403) {
          console.log(`Bot foi removido do grupo ${id}. Excluindo arquivo de configuração.`)
          fs.unlinkSync(groupSettingsPath);
      }
    }
    cacheService.saveGroupMetadata(update, groupMetadata);
  });

  return subaru;
  
};

fs.watchFile(__filename, () => {
  console.log(`Arquivo '${__filename}' foi modificado. Reiniciando...`);
  process.exit();
});

startConnection().catch((err) => console.error("Erro fatal ao iniciar a conexão:", err));    