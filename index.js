/*
* Oi, se tá lendo isso, é porque tem interesse no bot. Muito obrigado! 
* Esse bot é gratuito, se pagou por ele, exija seu dinheiro de volta.
* Achou o bot legal ou tá pensando em kibar algo? Pelo menos segue o meu canal, kk
* Raikken-API: https://whatsapp.com/channel/0029VbB75r1HFxOvPXYp7Z10
* Para os comandos da API funcionar, precisa de uma Key, acesse o site oficial!
* https://raikken-api.speedhosting.cloud/
*/

/* ===========================//CONSTS\\================================//*/
const { default:makeWASocket, DissubaruectReason, useMultiFileAuthState,fetchLatestBaileysVersion, isJidBroadcast, isJidStatusBroadcast, proto, makeInMemoryStore, makeCacheableSignalKeyStore, PHONENUMBER_MCC, downloadContentFromMessage, relayWAMessage, mentionedJid, processTime, MediaType, Browser, MessageType, Presence, Mimetype, Browsers, getLastMessageInChat, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadAndSaveMedia, logger, getContentType, INativeFlowMessage, messageStubType, WAMessageStubType, BufferJSON, generateWAMessageContent, downloadMediaMessage, prepareWAMessageMedia, baileys, cacheService } = require("baron-baileys-v2");

const { os, fs, path, exec, spawn, crypto, axios, fetch, FormData, cheerio, moment, mss, sendPoll, imageToWebp, videoToWebp, writeExifImg, writeExifVid, imageToWebp2, videoToWebp2, writeExifImg2, writeExifVid2, getMembros, getAdmins, util, rgtake, botSemKey } = require('./dono/exports-consts.js')

const { getPlugin, loadPlugins } = require("./dono/functions.js");

const { prefix, botName, donoName, donoNmr, RaikkenKey, baseRaikken, idCanal, botNumber, donoLid, botLid, baseRaikkenTinder } = require('./dono/configs/settings.json');

const { menumembros, menuAdm, menubn, menudono, menugeral } = require('./dono/configs/menus.js')

const { escolherPersonalidadeSubaru, escolherVideoPorRota, getFileBuffer, checkPrefix, fetchJson, getBuffer, data, hora, loadJSON, saveJSON, saveJSON2, sincronizarCases, lerOuCriarJSON, onlyNumbers, toUserLid, toUserOrGroupJid, registrarAluguel, renovarAluguel, removerAluguel, listarAlugueis, verificarAlugueis, carregarAlugueis, gerarlinkUploadCatbox, bytesParaMB, getBufferFromUrl, checarVersao, atualizarBot, emCooldown, tempoRestante, delay, getFamiliaData } = require('./dono/functions.js')

const { selogpt, seloCriador, seloGpt, seloMeta, seloLuzia , seloLaura,seloCopilot, seloNubank, seloBb,seloBradesco, seloSantander, seloItau, selodoc, pay, seloSz, seloface, seloluzia, seloloc, seloSticker, spiral } = require("./dono/fileSz.js")

const selo = seloSz

const { menuimg, erroImg, defaultAvatar, imgnazista, imggay, imgcorno, imggostosa, imggostoso, imgfeio, imgvesgo, imgbebado, imggado, matarcmd, deathcmd, beijocmd, chutecmd, tapacmd, rnkgay, rnkgado, cmdmenu, rnkcorno, rnkgostoso, rnkgostosa, rnknazista, rnkotaku, rnkpau, suruba, minado_bomb, thumbnail, imgsigma, imgbeta, imgbaiano, imgbaiana, imgcarioca, imglouco, imglouca, imgsafada, imgsafado, imgmacaco, imgmacaca, imgputa, rnksigma, rnkbeta, rnkbaiano, rnkbaiana, rnkcarioca, rnklouco, rnklouca, rnksafada, rnksafado, rnkmacaco, rnkmacaca, errocmd, rnkputa } = require("./dono/configs/links.json")


async function getGroupMetadataSafe(groupId, subaru) {
const cached = cacheService.getGroupMetadata(groupId);
if (cached) return cached;
const meta = await cacheService.updateFromAPI(groupId, subaru);
if (meta) return meta;
return { id: groupId, subject: "Grupo Desconhecido", participants: [] };
}

function getGroupConfig(id) {
const cached = groupConfigCache.get(id);
if (cached) return cached;
if (!fs.existsSync(`./database/grupos/${id}.json`)) return null;
const config = JSON.parse(fs.readFileSync(`./database/grupos/${id}.json`));
groupConfigCache.set(id, config);
return config;
}

/* ===========================//INICIO\\================================ */
const handleCmds = async (subaru, msg) => {
const info = msg
const content = msg.message?.conversation 
 || msg.message?.extendedTextMessage?.text 
 || msg.message?.imageMessage?.caption 
 || msg.message?.videoMessage?.caption 
 || msg.message?.buttonsResponseMessage?.selectedButtonId 
 || msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId 
 || msg.message?.templateButtonReplyMessage?.selectedId
 || msg.message?.interactiveResponseMessage?.body?.text
 || ''; 
const body = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info.message?.buttonsResponseMessage?.selectedButtonId || info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || info.message?.templateButtonReplyMessage?.selectedId || info?.text || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.imageMessage?.caption || info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info.message?.buttonsResponseMessage?.selectedButtonId || info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || info.message?.templateButtonReplyMessage?.selectedId || JSON.parse(info.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || '{}')?.id ||
 info?.text || '';
const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const q = args.join(' ');
const sz = q
const from = msg.key.remoteJid || msg.key.remoteLid || msg.key.remoteLid
const isGroup = from.endsWith('@g.us');
const sender = msg.key.participant || msg.key.remoteJid || msg.key.remoteLid || msg.key.participantLid || msg.key.participantAlt
//const senderLid = info.key?.participantLid || info.message?.extendedTextMessage?.contextInfo?.participantLid || info.key.remoteLid || info.key?.participant || "";
const userJid = info?.key?.participant?.replace(/:[0-9][0-9]|:[0-9]/g, "");
const type = msg.type
const isJsonIncludes = (json, value) => {
if(JSON.stringify(json).includes(value)) return true
return false}
const menc_prt = info?.message?.extendedTextMessage?.contextInfo?.participant || info?.message?.key?.participantLid || null;
const menc_jid = args?.join(" ").includes('@') ? args.join(" ").replace(/[^0-9]/g, '') + "@s.whatsapp.net" : "";
const menc_jid2 = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
const sender_ou_n = q.includes("@") ? menc_jid : sender;
const menc_os2 = q.includes("@") ? menc_jid : menc_prt;
const usuariosMencionados = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
const usuarioRespondido = info?.message?.extendedTextMessage?.contextInfo?.participant || null;
const alvo = usuariosMencionados.length > 0 ? usuariosMencionados[0] : usuarioRespondido;
const botLid2 = botLid || subaru.user?.lid.split(':')[0] + "@lid" ||"não catou";
const baileysIs = (msg, type) => !!msg?.message?.[type];
const isImage = baileysIs(info, "imageMessage");
const isVideo = baileysIs(info, "videoMessage");
const isSticker = baileysIs(info, "stickerMessage");
const isAudio = baileysIs(info, "audioMessage");
const isDocument = baileysIs(info, "documentMessage");
const isVisuU2 = baileysIs(info, 'viewOnceMessageV2');
const isContact = baileysIs(info, 'contactMessage');
const isLocation = baileysIs(info, 'locationMessage');
const isProduct = baileysIs(info, 'productMessage');
const isMedia = isImage || isVideo || isSticker || isAudio || isVisuU2;
const quoted = info.message?.extendedTextMessage?.contextInfo?.quotedMessage || info.quoted || false;
const quotedType = quoted ? Object.keys(quoted)[0] : null;
const isQuotedMsg = quotedType === 'conversation';
const isQuotedMsg2 = quotedType === 'text'
const isQuotedText = quotedType === 'extendedTextMessage';
const isQuotedImage = quotedType === 'imageMessage';
const isQuotedVideo = quotedType === 'videoMessage';
const isQuotedAudio = quotedType === 'audioMessage';
const isQuotedDocument = quotedType === 'documentMessage';
const isQuotedSticker = quotedType === 'stickerMessage';
const isQuotedContact = quotedType === 'contactMessage';
const isQuotedLocation = quotedType === 'locationMessage';
const isQuotedProduct = quotedType === 'productMessage';
const isQuotedViewOnce = quotedType === 'viewOnceMessage' || quotedType === 'viewOnceMessageV2';
const isQuotedDocW = quotedType === 'documentWithCaptionMessage'
const imgCaption = (isQuotedImage ? quoted?.imageMessage?.caption : info.message?.imageMessage?.caption) || "";
const vidCaption = (isQuotedVideo ? quoted?.videoMessage?.caption : info.message?.videoMessage?.caption) || "";
const convText = (isQuotedMsg ? quoted?.conversation : info.message?.conversation) || "";
const extdText = (isQuotedText ? quoted?.extendedTextMessage?.text : info.message?.extendedTextMessage?.text) || "";
const docNoCap = (isQuotedDocument ? quoted?.documentMessage?.caption : info.message?.documentMessage?.caption) || "";
const docWCap= (isQuotedDocW ? quoted?.documentWithCaptionMessage?.message?.documentMessage?.caption : info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption) || "";
const mediaInfo = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.imageMessage : isQuotedVideo ? JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.videoMessage : isQuotedSticker ? JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.stickerMessage : info;

function getGroupAdmins(participants) {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

const toJid = (id) => {
if (!id)
return '';
if (id.endsWith('@lid'))
return id.replace('@lid', '@s.whatsapp.net');
if (id.includes('@'))
return id;
return `${id}@s.whatsapp.net`;
};

function getSenderLid(msg) {
const { jidDecode, jidEncode } = require('baron-baileys-v2');
try {
const sender = msg?.key?.participant || msg?.key?.remoteJid || msg?.key?.remoteLid || msg?.key?.participantLid || msg?.key?.participantAlt || '';
const user = jidDecode(sender)?.user || sender.split('@')[0] || '';
const lid = jidEncode(user, 'lid');
return { jid: sender, lid };
} catch (err) {
// console.error('Erro ao gerar LID do remetente:', err);
return { jid: null, lid: null };
}}

const groupMetadata = isGroup ? await subaru.groupMetadata(from): ""
const participants = isGroup ? await groupMetadata.participants : ''
const groupName = isGroup? groupMetadata.subject: ""
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : []
const groupMemb2 = isGroup ? groupMetadata.participants.map(p => p.id) : []
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
let senderJid;
if (isGroup) {
const participant = info.key.participant;
if (!participant) {
senderJid = null;
} else if (participant.includes(':')) {
senderJid = participant.split(':')[0] + '@s.whatsapp.net';
} else if (participant.endsWith('@lid')) {
const membro = groupMembers.find(m => m.lid === participant);
senderJid = membro ? membro.jid : null; 
} else {
senderJid = participant;
}
} else {
senderJid = info.key.remoteJid;
}

const senderObject = groupMembers.find(member => member.jid === sender || member.id === sender || member.lid === sender);
let senderLid = senderObject ? senderObject.lid || senderObject.id : null;
const sender2 = senderLid || senderJid
const isCmd = content.startsWith(prefix)
const cmd = isCmd ? content.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const comando = cmd;
const pushname = info.pushName ? info.pushName : ""
const numeroBot = subaru.user.id.split(":")[0]+"@s.whatsapp.net"
const isDono = sender.includes(donoNmr) || sender === donoLid
const isBotGroupAdmins = groupAdmins.includes(botLid2) || groupAdmins.includes(numeroBot) || false;
const isGroupAdmins = groupAdmins.includes(sender) || groupAdmins.includes(senderLid) || groupAdmins.includes(senderJid) || groupAdmins.includes(sender2) || isDono || false;
const isAdm = isGroupAdmins
const participantes = isGroup ? groupMetadata.participants.map(usuario => usuario.id) : ''
const mencionados = isGroup ? participantes.sort(() => 0.5 - Math.random()).slice(0, 5) : '' 
var budy = info?.message?.conversation || info?.message?.extendedTextMessage?.text || '';
const adivinha = info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) == '3A' ? 'iPhone' : 'WhatsApp Web';
const somembros = isGroup ? (groupMembers.length > 0 ? getMembros(groupMembers) : getAdmins(groupMembers)) : []
//====================( FACILITADORES )====================//
const esperar = (tempo) => {
return new Promise(resolve => setTimeout(resolve, tempo));
}

// Converte uma stream de dados em um buffer.
async function streamToBuffer(stream) {
const chunks = [];
for await (const chunk of stream) {
chunks.push(chunk);
}
return chunks;
}

//====================( FUNÇÕES DE ENVIO DE MÍDIA )====================//
// Envia uma resposta de texto estilizada como se fosse de um canal.
async function reply(texto) {
await subaru.sendPresenceUpdate('composing', from);
await esperar(1000);
subaru.sendMessage(from, {
text: texto,
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: `${idCanal}`,
newsletterName: '『𝐒𝐮𝐛𝐚𝐫𝐮-𝐁𝐚𝐬𝐞』'
}}}, { quoted: info });
}

async function reply2 (texto) {
await subaru.sendPresenceUpdate('composing', from) 
await esperar(1000) 
subaru.sendMessage(from, { text: texto, contextInfo: {forwardingScore: 100000, isForwarded: true }}, {quoted: info})
}

async function DLT_FL(file) {
try { 
fs.unlinkSync(file);
} catch (error) {}
}

// Envia uma mensagem de texto, mas com um quoted de loc.
const enviarBan = (texto) => {
const selob = {
"key": {
"fromMe": false,
"participant":
"0@s.whatsapp.net",
"remoteJid": null},
message: {liveLocationMessage: 
{degreesLatitude: 173.282, 
degreesLongitude: -19.378,
sequenceNumber: "1657237469254001", 
thumbnail: null, 
caption: `*🚫𝐃𝐄𝐒𝐂𝐔𝐌𝐏𝐑𝐈𝐌𝐄𝐍𝐓𝐎 𝐃𝐀𝐒 𝐑𝐄𝐆𝐑𝐀𝐒!🚫*`}}}

subaru.sendMessage(from, { text: texto }, { quoted: selob })
}

//enviar mensagem de texto simples. 
const enviar = (texto) => {
subaru.sendMessage(from, { text: texto }, { quoted: info })}

// Envia uma imagem a partir de um link.
const enviarImg = (link) => {
subaru.sendMessage(from, { image: { url: link } }, { quoted: info })}

// Envia uma imagem com legenda.
const enviarImg2 = (link, texto) => {
subaru.sendMessage(from, { image: { url: link }, caption: texto }, { quoted: info })}

// Envia um vídeo a partir de um link.
const enviarVd = (link) => {
subaru.sendMessage(from, { video: { url: link }, mimetype: "video/mp4" }, { quoted: info })}

// Envia um vídeo com legenda.
const enviarVd2 = (link, texto) => {
subaru.sendMessage(from, { video: { url: link }, caption: texto, mimetype: "video/mp4" }, { quoted: info })}

// Envia um áudio (como se fosse gravado).
const enviarAd = (link) => {
subaru.sendMessage(from, { audio: { url: link }, mimetype: "audio/mpeg", ptt: true, contextInfo: { forwardingScore: 999, isForwarded: true }}, { quoted: info })}
//====================( FUNÇÕES DE MENÇÃO )====================//
// Envia uma imagem mencionando usuários no texto.
const mencionarIMG = async (teks = '', FileN, membrosGrupo = []) => {
const memberr = []
const senderInfo = getSenderLid(somembros)
const senderJid = toJid(senderInfo.lid)
memberr.push(senderJid)
const palavras = teks.split(/\s+/)
for (const palavra of palavras) {
if (palavra.startsWith('@')) {
const tag = palavra.replace('@', '').replace(/\D/g,'') 
const member = membrosGrupo.find(m => m.includes(tag))
if (member && !memberr.includes(member)) {
memberr.push(member)
}}}
await subaru.sendMessage(from, { image: { url: FileN }, caption: teks.trim(), mentions: memberr }, { quoted: seloSz }).catch(async () => { await subaru.sendMessage(from, { text: 'Erro ao enviar imagem.' }, { quoted: seloSz })})
}

// Envia um texto mencionando um array de usuários.
const mentions = async (teks = '', membrosGrupo = [], id = null) => {
const memberr = []
const senderInfo = getSenderLid(info)
const senderJid = toJid(senderInfo.lid)
memberr.push(senderJid)
const lines = teks.split('\n')
for (const line of lines) {
for (const word of line.split(' ')) {
if (word.startsWith('@')) {
const tag = word.replace('@', '').replace(/\D/g, '')
const member = membrosGrupo.find(m => m.includes(tag))
if (member && !memberr.includes(member)) {
memberr.push(member)
}}}}

if (!id) { await subaru.sendMessage(from, { text: teks.trim(), mentions: memberr})
} else {
await subaru.sendMessage(from, { text: teks.trim(), mentions: memberr}, { quoted: seloSz })
}}

const mention = async (teks = '', membrosGrupo = []) => {
const members = []
const senderInfo = getSenderLid(info)
const senderJid = toJid(senderInfo.lid)
members.push(senderJid)
const lines = teks.split('\n')
for (const line of lines) {
for (const word of line.split(' ')) {
if (word.startsWith('@')) {
const tag = word.replace('@','').replace(/\D/g,'')
const member = membrosGrupo.find(m => m.includes(tag))
if (member && !members.includes(member)) {
members.push(member)}}}}

await subaru.sendMessage(from, { text: teks.trim(), mentions: members}, { quoted: seloSz }).catch(async () => { await subaru.sendMessage(from, { text: 'Erro ao enviar mensagem.' }, { quoted: seloSz })})
}

//=====================( ABAIXO O AUSENTE/AFK )====================//
let afkData = {};
try {
const data = fs.readFileSync('./database/users/ausente.json', 'utf8');
if (data) {
afkData = JSON.parse(data);
}
} catch (error) {
if (error.code === 'ENOENT') {
fs.writeFileSync('./database/users/ausente.json', JSON.stringify({}));
} else {
console.error('Erro ao carregar afkData do arquivo JSON:', error.message);
}}
function verificarAFK(marc_tds) {
if (afkData[marc_tds] && afkData[marc_tds].motivo) {
const tempoSaida = afkData[marc_tds].tempoSaida;
if (isNaN(tempoSaida)) {
console.error('Erro: tempoSaida não é um número válido');
return null;
}
const tempoOffline = Date.now() - tempoSaida;
const milissegundosOffline = tempoOffline % 1000;
const segundosOffline = Math.floor(tempoOffline / 1000) % 60;
const minutosOffline = Math.floor(tempoOffline / (1000 * 60)) % 60;
const horasOffline = Math.floor(tempoOffline / (1000 * 60 * 60));
// by duarte
return `┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕۪࣪
┃࣪ ┃࣪ *❌ Esse usuário está off!❌*
┃࣪ ┃࣪ *🔮 Motivo:* ${afkData[marc_tds].motivo}
┃࣪ ┃࣪ *⏰ Tempo Offline:* ${horasOffline}h ${minutosOffline}m ${segundosOffline}s
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕۪࣪
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`;
}
return null;
}
const mencionadosAfk = menc_jid2?.length ? menc_jid2 : (menc_jid ? [menc_jid] : []);
mencionadosAfk.forEach(jid => {
const afkMessage = verificarAFK(jid);
if (afkMessage) {
subaru.sendMessage(from, { text: afkMessage, mentions: [jid] });
}
});

if (afkData[sender]) {
const motivoDeVolta = afkData[sender].motivo;
const nomeDoUser = afkData[sender].numero;
const tempoSaida = afkData[sender].tempoSaida;
delete afkData[sender];
fs.writeFileSync('./database/users/ausente.json', JSON.stringify(afkData));
const tempoOffline = Date.now() - tempoSaida;
const milissegundosOffline = tempoOffline % 1000;
const segundosOffline = Math.floor(tempoOffline / 1000) % 60;
const minutosOffline = Math.floor(tempoOffline / (1000 * 60)) % 60;
const horasOffline = Math.floor(tempoOffline / (1000 * 60 * 60));
await subaru.sendMessage(from, { text: `┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕۪࣪
┃࣪ ┃࣪ *Olha quem voltou!*
┃࣪ ┃࣪ *🔮 Motivo do AFK:* ${motivoDeVolta}
┃࣪ ┃࣪ *⏰ Tempo Offline:* ${horasOffline}h ${minutosOffline}m ${segundosOffline}s ${milissegundosOffline}ms
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕۪࣪
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`, mentions: [nomeDoUser] }, { quoted: info });
}
//====================( FUNÇÕES DO AUSENTE/AFK )====================//

//====================( FUNÇÕES DO RENAME )====================//
const { Sticker } = require("./database/outros/sticker/rename/sticker.js");
const figname = JSON.parse(fs.readFileSync("./database/outros/sticker/figname.json"))
const permuteFigPackName = (secondtxt, usu = sender) => {
if(isJsonIncludes(figname, usu)) {
AB = figname.map(i => i.id).indexOf(usu)
if(isJsonIncludes(figname[AB].fig, "pack")) {
BC = figname[AB].fig.map(i => i.mod).indexOf("pack")
return figname[AB].fig[BC].pack
} else return secondtxt
} else return secondtxt
}
const permuteFigAuthorName = (secondtxt, usu = sender) => {
if(isJsonIncludes(figname, usu)) {
AB = figname.map(i => i.id).indexOf(usu)
if(isJsonIncludes(figname[AB].fig, "author")) {
BC = figname[AB].fig.map(i => i.mod).indexOf("author")
return figname[AB].fig[BC].author
} else return secondtxt
} else return secondtxt
}

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

async function renameContextSticker(pack, autor, txt = ``, hehe) {
try {
getfile = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker');
var _sticker = new Sticker()
_sticker.addFile(getfile); 
_sticker.options.metadata = {pack: pack, author: data, emojis: ['🤠', '🥶', '😻']};
 resultadoSt = await _sticker.start();
await subaru.sendMessage(from, {sticker: fs.readFileSync(resultadoSt[0].value), contextInfo: {externalAdReply: {title: "FIGURINHA KIBADAKKKKKJ", body:"", previewType:"PHOTO", thumbnail: fs.readFileSync(resultadoSt[0].value)}}}, {quoted: selo})
await fs.unlinkSync(resultadoSt[0].value)
} catch(e) {console.log(e)}
}

async function renameContextSticker3(pack, autor, txt = ``, hehe) {
const isJsonIncludes = (json, value) => {
if(JSON.stringify(json).includes(value)) return true
return false}
const permuteFigPackName = (secondtxt, usu = sender) => {
if(isJsonIncludes(figname, usu)) {
AB = figname.map(i => i.id).indexOf(usu)
if(isJsonIncludes(figname[AB].fig, "pack")) {
BC = figname[AB].fig.map(i => i.mod).indexOf("pack")
return figname[AB].fig[BC].pack
} else return secondtxt
} else return secondtxt
}
const permuteFigAuthorName = (secondtxt, usu = sender) => {
if(isJsonIncludes(figname, usu)) {
AB = figname.map(i => i.id).indexOf(usu)
if(isJsonIncludes(figname[AB].fig, "author")) {
BC = figname[AB].fig.map(i => i.mod).indexOf("author")
return figname[AB].fig[BC].author
} else return secondtxt
} else return secondtxt
}
try {

getfile = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker');
var _sticker = new Sticker()
_sticker.addFile(getfile); 
_sticker.options.metadata = {pack: pack, author: autor, emojis: ['🤠', '🥶', '😻']};
resultadoSt = await _sticker.start();
await subaru.sendMessage(from, {sticker: fs.readFileSync(resultadoSt[0].value), contextInfo: {externalAdReply: {title: txt, body:"", previewType:"PHOTO", thumbnail: fs.readFileSync(resultadoSt[0].value)}}}, {quoted: selo})
await fs.unlinkSync(resultadoSt[0].value)
} catch(e) {console.log(e)}
}
//====================( FIM - FUNÇÕES DO RENAME )====================//

//====================( FUNÇÕES DE REAÇÃO )====================//
// Reage a uma mensagem
const react = (reassao) => {
subaru.sendMessage(from, { react: { text: reassao, key: info.key } });
}

const reagir = (reassao) => {
subaru.sendMessage(from, { react: { text: reassao, key: info.key } });
}

// Atalhos para reações comuns.
const successReact = () => react("✅");
const waitReact = () => react("⏳");
const warningReact = () => react("⚠️");
const errorReact = () => react("❌");

//====================( FUNÇÕES DE FIGURINHA / STICKER )====================//
// Converte imagem para figurinha.
const sendImageAsSticker2 = async (subaru, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
let buffer;
if (options && (options.packname || options.author)) {
buffer = await writeExifImg2(buff, options);
} else {
buffer = await imageToWebp2(buff);
}
await subaru.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
return buffer;
};

// Converte vídeo para figurinha.
const sendVideoAsSticker2 = async (subaru, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
let buffer;
if (options && (options.packname || options.author)) {
buffer = await writeExifVid2(buff, options);
} else {
buffer = await videoToWebp2(buff);
}
await subaru.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
return buffer;
}
//====================( FUNÇÕES DE GRUPOS )====================//
const pastaDosGrupos = './database/grupos/';
if (!fs.existsSync(pastaDosGrupos)){
fs.mkdirSync(pastaDosGrupos, { recursive: true });}

const PastaDeGrupos = `${pastaDosGrupos}${from}.json`;
if (isGroup && !fs.existsSync(PastaDeGrupos)) {
var datea = [{
name: groupName, 
antilink: false,
bemVindo: [{
ativo: false,
foto: "LINK",
entrou: "Opa, %numero%\n\nAntes de sair clicando por aí, dá uma olhada nas regras pra não se perder:\n1️⃣ Seja respeitoso com todos.\n2️⃣ Nada de flood ou spam.\n3️⃣ Aproveite o grupo e participe das interações!\n\nSeja bem-vindo e bora se divertir! 💙",
saiu: "Oh não… %numero% saiu do grupo! 😢\n\nEsperamos que você volte logo, mas enquanto isso, o Subaru-Bot segue firme e forte! 💪\n\nSe cuida por aí!",
}],
antiimg: false, 
antivideo: false,
antiaudio: false, 
antisticker: false,
antidoc: false,
antictt: false,
antiloc: false, 
banchat: true,
simih: true,
modobn: false,
aluguel: false,
cooldown: true,
autosticker: false,
autodown: false,
leveling: false,
listanegra: [], 
advertir: [],
antiarquivamento: {
ativo: false,
autorizados: []
},
}];
fs.writeFileSync(PastaDeGrupos, JSON.stringify(datea, null, 2) + '\n');
}
const ArquivosDosGrupos = isGroup && fs.existsSync(PastaDeGrupos) 
? JSON.parse(fs.readFileSync(PastaDeGrupos)) 
: undefined;
function ModificaGrupo(index) {
fs.writeFileSync(PastaDeGrupos, JSON.stringify(index, null, 2) + '\n');
}
function setNes(index){
fs.writeFileSync(nescj, JSON.stringify(index, null, 2) + '\n')}
function setGp(index){
fs.writeFileSync(PastaDeGrupos, JSON.stringify(index, null, 2) + '\n')}

//====================( CONSTS DE GRUPOS )====================//
const isAntiLink = isGroup ? ArquivosDosGrupos?.[0]?.antilink : undefined
const BemVindoAcao = isGroup ? ArquivosDosGrupos?.[0]?.bemVindo?.[0]: undefined;
const isBemVindo = isGroup ? ArquivosDosGrupos?.[0]?.bemVindo?.[0]?.ativo : undefined;

const isAntiImg = isGroup ? ArquivosDosGrupos?.[0]?.antiimg : undefined
const isAntiVid = isGroup ? ArquivosDosGrupos?.[0]?.antivideo : undefined
const isAntiAudio = isGroup ? ArquivosDosGrupos?.[0]?.antiaudio : undefined
const isAntiSticker = isGroup ? ArquivosDosGrupos?.[0]?.antisticker : undefined
const isAntiDoc = isGroup ? ArquivosDosGrupos?.[0]?.antidoc : undefined
const isAntiCtt = isGroup ? ArquivosDosGrupos?.[0]?.antictt : undefined
const isAntiLoc = isGroup ? ArquivosDosGrupos[0].antiloc : undefined
const isBanchat = isGroup ? ArquivosDosGrupos?.[0].banchat : undefined
const isSimih = isGroup ? ArquivosDosGrupos?.[0].simih : undefined
const isModobn = isGroup ? ArquivosDosGrupos?.[0].modobn : undefined
const isAluguelAtivo = isGroup ? ArquivosDosGrupos?.[0].aluguel : undefined
const isAntiArq = isGroup ? ArquivosDosGrupos?.[0].antiarquivamento.ativo : undefined
const isCooldown = isGroup ? ArquivosDosGrupos?.[0].cooldown : undefined
const isAutoSticker = isGroup ? ArquivosDosGrupos?.[0].autosticker : undefined
const isAutoDown = isGroup ? ArquivosDosGrupos?.[0].autodown : undefined
const isLevelingOn = isGroup ? ArquivosDosGrupos?.[0].leveling : undefined
//====================( FIM CONSTS DE GRUPOS )====================//

//====================( AUTO STICKER )====================//
if (isAutoSticker && isGroup) {
async function autofiguf() {
setTimeout(async () => {
if (budy.startsWith(prefix)) return;
if (!isImage && !isVideo) return;
let packauto = `⚝ ⇝ Grupo:\n${groupName}`;
let authorauto = `⚝ ⇝ User ⚒${pushname}\n`;
let boij2 = info.message?.imageMessage ||
info.message?.viewOnceMessage?.message?.imageMessage ||
info.message?.viewOnceMessageV2?.message?.imageMessage;
let boij = info.message?.videoMessage ||
info.message?.viewOnceMessage?.message?.videoMessage ||
info.message?.viewOnceMessageV2?.message?.videoMessage;
try {
if (boij2) {
let owgi = await getFileBuffer(boij2, 'image');
let encmediaa = await sendImageAsSticker2(subaru, from, owgi, info, {
packname: packauto,
author: authorauto
});
await DLT_FL(encmediaa);
} else if (boij && boij.seconds < 11) {
let owgi = await getFileBuffer(boij, 'video');
let encmedia = await sendVideoAsSticker2(subaru, from, owgi, info, {
packname: packauto,
author: authorauto
});
await DLT_FL(encmedia);
}
} catch (e) {
console.error("Erro no autosticker:", e);
}
}, 100); 
}
autofiguf().catch(e => console.error(e));
}


//====================( SIMILARITY / SIMILARIDADE )====================//
const getallcases = () => {
findindex = fs.readFileSync("index.js").toString().match(/case\s+'(.+?)'/g)
cstt = []
for(i of findindex) {
cstt.push(i.split(`'`)[1]) }
return cstt
}
const rmLetras = (txt) => {
return txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");}
const allCases = getallcases();
const getSimilarity = require(`./database/outros/similaridade.js`);
const similarityCmd = (txt) => {
getsmlrt = getSimilarity(allCases, txt)
if(rmLetras(getsmlrt.nome).includes('nao encontrado')) return [{comando: getsmlrt.nome, porcentagem: getsmlrt.porcentagem}]
return [{comando: prefix+getsmlrt.nome, porcentagem: Number(getsmlrt.porcentagem).toFixed(1)}]
}
//====================( FIM SIMILARITY / SIMILARIDADE )====================//

const identifyAtSign = (number) => {
const cleanNumber = number.includes('@') ? number.split('@')[1] : number;
return cleanNumber.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net";
};
const detectTinder = (query) => {
return query.replace(/#p#/g, prefix).replace(/#pc#/g, prefix + comando);
};

//======(JOGO-DA-VELHA)=======(Função)===\\
const { validmove, setGame } = require("./database/tictactoe");
const SNET = "@s.whatsapp.net";
const argss = body.split(/ +/g);
const JOGO_D_V = fs?.existsSync(`./database/tictactoe/db/${from}.json`) ?
JSON?.parse(fs?.readFileSync(`./database/tictactoe/db/${from}.json`)) : false
async function joguinhodavelha() {
const cmde = budy.toLowerCase().split(" ")[0] || "";
let arrNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
if(JOGO_D_V != false) {
const boardnow = setGame(`${from}`);
if(budy == "Cex") return reply("why");
if(
budy.toLowerCase() == "S" ||
budy.toLowerCase() == "sim" ||
budy.toLowerCase() == "ok"
) {
if(boardnow.O == sender.replace(SNET, "")) {
if(boardnow.status)
return reply(`O jogo já começou antes!`);
const matrix = boardnow._matrix;
boardnow.status = true;
fs.writeFileSync(`./database/tictactoe/db/${from}.json`,
JSON.stringify(boardnow, null, 2)
);
const chatAccept = `*🎮Ꮐ̸Ꭺ̸Ꮇ̸Ꭼ̸ Ꭰ̸Ꭺ̸ Ꮩ̸Ꭼ̸Ꮮ̸Ꮋ̸Ꭺ̸🕹️*

❌ : @${boardnow.X}
⭕ : @${boardnow.O}

Sua vez... : @${boardnow.turn == "X" ? boardnow.X : boardnow.O}

${matrix[0][0]}${matrix[0][1]}${matrix[0][2]}
${matrix[1][0]}${matrix[1][1]}${matrix[1][2]}
${matrix[2][0]}${matrix[2][1]}${matrix[2][2]}
`;
mention(chatAccept, groupMemb2);
}
} else if(
budy.toLowerCase() == "N" ||
budy.toLowerCase() == "não" ||
budy.toLowerCase() == "no"
) {
if(boardnow.O == sender.replace(SNET, "")) {
if(boardnow.status)
return reply(`O jogo já começou!`);
DLT_FL(`./database/tictactoe/db/${from}.json`);
mention(`@${boardnow.X} *_Infelizmente seu oponente não aceitou o desafio ❌😕_*`, groupMemb2)
}
}
}

if(arrNum.includes(cmde)) {
const boardnow = setGame(`${from}`);
if(!boardnow.status) return reply(`Parece que seu oponente não aceitou o desafio ainda...`)
if(
(boardnow.turn == "X" ? boardnow.X : boardnow.O) !=
 
sender.replace(SNET, "")
)
return;
const moving = validmove(Number(budy), `${from}`);
const matrix = moving._matrix;
if(moving.isWin) {
if(moving.winner == "SERI") {
const chatEqual = `*🎮Ꮐ̸Ꭺ̸Ꮇ̸Ꭼ̸ Ꭰ̸Ꭺ̸ Ꮩ̸Ꭼ̸Ꮮ̸Ꮋ̸Ꭺ̸🕹️*

Jogo termina empatado 😐
`;
reply(chatEqual);
DLT_FL(`./database/tictactoe/db/${from}.json`);
return;
}
const abt = Math.ceil(Math.random() + 4000)
const winnerJID = moving.winner == "O" ? moving.O : moving.X;
const looseJID = moving.winner == "O" ? moving.X : moving.O;
const limWin = Math.floor(Math.random() * 1) + 10;
const limLoose = Math.floor(Math.random() * 1) + 5;
const chatWon = `*🎮Ꮐ̸Ꭺ̸Ꮇ̸Ꭼ̸ Ꭰ̸Ꭺ̸ Ꮩ̸Ꭼ̸Ꮮ̸Ꮋ̸Ꭺ̸🕹️*

Vencido por @${winnerJID} 😎👑
`;

mention(chatWon, groupMemb2)
setTimeout( () => {
if(fs.existsSync("./database/tictactoe/db/" + from + ".json")) {
DLT_FL("./database/tictactoe/db/" + from + ".json");
reply(`*🕹️JOGO DA VELHA RESETADO...🕹️*`);
} else {
console.log("JOGO DA VELHA EXPIRADO") 
}
}, 300000) //5 minutos
reply(`_*🥳Parabéns @${winnerJID} Você ganhou! Jogue mais vezes e se divirta!🎉...*_`)

DLT_FL(`./database/tictactoe/db/${from}.json`);
} else {
const chatMove = `*🎮Ꮐ̸Ꭺ̸Ꮇ̸Ꭼ̸ Ꭰ̸Ꭺ̸ Ꮩ̸Ꭼ̸Ꮮ̸Ꮋ̸Ꭺ̸🕹️*

❌ : @${moving.X}
⭕ : @${moving.O}

Sua vez : @${moving.turn == "X" ? moving.X : moving.O}

${matrix[0][0]}${matrix[0][1]}${matrix[0][2]}
${matrix[1][0]}${matrix[1][1]}${matrix[1][2]}
${matrix[2][0]}${matrix[2][1]}${matrix[2][2]}
`;
mention(chatMove, groupMemb2);
}
}}

if (isBanchat && !isDono) { return //console.log(`Comando efetuado, mas tô off.`) 
}

// ========( SISTEMA DE ALUGUEL )========= \\
const db_aluguel = carregarAlugueis();
const RPT_M = []; 
const usuarioTemAluguel = db_aluguel.some(i => i.id_gp == from);
if (!RPT_M.includes(from) && isAluguelAtivo && !isDono && !usuarioTemAluguel) {
RPT_M.push(from);
setTimeout(() => {
RPT_M.splice(RPT_M.indexOf(from), 1);
}, 30000);
return reply(`O aluguel deste (Grupo/Usuário) não está registrado. Fale com o dono para registrar ou renovar: https://wa.me/${donoNmr}`);
}
if (isAluguelAtivo) {
verificarAlugueis(subaru, donoNmr);
}

// ------------------- [ SISTEMA DE VIPS - By Spiral ] -------------------//
let vip = JSON.parse(fs.readFileSync("./database/users/usuariovip.json"))
const dono2 = donoLid || donoNmr + "@s.whatsapp.net"
async function vipFunctionTempo() {
const isPremium = vip.map(i => i.id).includes(senderLid) || vip.map(i => i.id).includes(senderJid) || isDono
if(vip.length > 0) {
for (y of vip) {
let hoje = moment.tz('America/Sao_Paulo').format('YYYY-MM-DD')
if(y.save != hoje) {
y.save = hoje
fs.writeFileSync("./database/users/usuariovip.json", JSON.stringify(vip))
if(y.infinito == false) {
if(y.dias > 1) {
y.dias -= 1
fs.writeFileSync("./database/users/usuariovip.json", JSON.stringify(vip))
} else {
subaru.sendMessage(y.id, {text: `⚠️ *Seus dias como usuário VIP terminaram, para renovar entre em contato com meu dono \n• *wa.me/${donoNmr}*\n•*Essa mensagem é automática*, se for um engano entre em contato.`})
AB = vip.map(b => b.id).indexOf(y.id)
vip.splice(AB, 1)
fs.writeFileSync("./database/users/usuariovip.json", JSON.stringify(vip))
}}}}}}

async function verificarVip(userId) {
if (isDono) return true;
const vipList = JSON.parse(fs.readFileSync("./database/users/usuariovip.json"));
const vipData = vipList.find(user => user.id === userId || user.jid === userId);
if (!vipData) {
return false;
}
if (!vipData.infinito) {
await vipFunctionTempo(userId);
}
return true;
}

const isVip = await verificarVip(senderLid || senderJid);
//if (!isVip) { return enviar("❌ Este comando é exclusivo para usuários VIP.");}
// ------------------- [ FIM - SISTEMA DE VIPS - By Spiral ] -------------------//


// ------------------- [ SISTEMA DE ANTI ARQUIVAMENTO - By Spiral ] -------------------//
const autorizadosCMD = isGroup ? ArquivosDosGrupos?.[0].antiarquivamento.autorizados || [] : []
function isAutorizado(senderJid, senderLid) {
return ( autorizadosCMD.some(i => i.id === senderJid) || autorizadosCMD.some(i => i.id === senderLid) || isDono);
}

//=====( ABAIXO O COUNTMESSAGE )=====\\
const countMessage = JSON.parse(fs.readFileSync('./database/grupos/countmessage/countmsg.json'));
const groupIdscount = [];
for (let obj of countMessage) {
groupIdscount.push(obj.groupId);
}
var numbersIds = [];
if (isGroup && groupIdscount.indexOf(from) >= 0) {
var ind = groupIdscount.indexOf(from);
for (let obj of countMessage[ind].numbers) {
numbersIds.push(obj.id);
}
if (numbersIds.indexOf(sender) >= 0) {
var indnum = numbersIds.indexOf(sender);
var RSM_CN = countMessage[ind].numbers[indnum];
type == "stickerMessage" ? "" : RSM_CN.messages += isCmd ? 0 : 1;
type == "stickerMessage" ? "" : RSM_CN.cmd_messages += isCmd ? 1 : 0;
type == "stickerMessage" ? "" : RSM_CN.aparelho = adivinha;
RSM_CN.figus += type == "stickerMessage" ? 1 : 0;
fs.writeFileSync(
"./database/grupos/countmessage/countmsg.json",
JSON.stringify(countMessage, null, 2) + "\n"
);
} else {
const messages = isCmd ? 0 : 1;
const cmd_messages = isCmd ? 1 : 0;
var figus = type == "stickerMessage" ? 1 : 0;
countMessage[ind].numbers.push({
id: sender,
messages: messages,
cmd_messages: cmd_messages,
aparelho: adivinha,
figus: figus,
joinedAt: moment().tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss")
});
fs.writeFileSync(
"./database/grupos/countmessage/countmsg.json",
JSON.stringify(countMessage, null, 2) + "\n"
);
}
} else if (isGroup) {
countMessage.push({
groupId: from,
numbers: [
{
id: sender,
messages: 0,
figus: 0,
cmd_messages: isCmd ? 1 : 0,
aparelho: adivinha,
joinedAt: moment().tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss")
}
]
});
fs.writeFileSync(
"./database/grupos/countmessage/countmsg.json",
JSON.stringify(countMessage, null, 2) + "\n"
);
}

//====================( SISTEMA DO COOLDOWN )====================//
if (isCooldown && isCmd) {
if (emCooldown(sender2, from, isGroupAdmins, isDono)) {
const restante = tempoRestante(sender2, from, isGroupAdmins, isDono).toFixed(1);
await delay(300, 1000)
await subaru.sendMessage(from, { text: `⏳ Calma aí ${pushname}, espera ${restante}s pra usar outro comando.`});
return;
}}
//====================( FIM - SISTEMA DO COOLDOWN )====================//

//==========( ABAIXO OS COMANDOS POR FIGURINHA )==========\\
/* ⚠️LEMBRE SE DE MUDAR O ID DAS FIGURINHAS. ⚠️
* Use o comando: stickerid para obter o id da figurinha. 
* O id correspondente você copia e cola no nome da case, como está abaixo.
* Sim, é um número grande kkkj.
*/
const ID_STICKER = info?.message?.stickerMessage?.fileSha256?.toString('base64');
switch (ID_STICKER) {

 case '224,29,192,69,230,158,143,233,214,97,171,139,34,202,216,5,213,12,19,109,66,2,13,44,190,228,78,235,5,183,50,44': {
 if (!isAdm && !isDono) return;
 await subaru.groupSettingUpdate(from, "not_announcement");
 await reply("Grupo aberto!");
 break;
 }
 
 case '255,188,36,70,82,133,151,88,212,31,209,208,178,175,33,239,17,88,170,129,25,64,163,175,2,13,240,49,94,160,133,2': {
 if (!isAdm && !isDono) return;
 await subaru.groupSettingUpdate(from, "announcement");
 await reply("Grupo fechado!");
 break
 }

default:
//console.log('ID da figurinha não reconhecido:', ID_STICKER);

}//CUIDADO! AQUI FECHA O SWITCH DOS COMANDOS POR FIGURINHA!!

//=====( ABAIXO OS COMANDOS SEM PREFIXO )=====\\

if (!checkPrefix(body, prefix)) {
 switch (body.toLowerCase().trim()) {
 case 'a':
 if (!isAdm && !isDono) return;
 await subaru.groupSettingUpdate(from, "not_announcement");
 await reply("Grupo aberto!");
 break;
 
 case 'f':
 if (!isAdm && !isDono) return;
 await subaru.groupSettingUpdate(from, "announcement");
 await reply("Grupo fechado!");
 break
 
 case 'd' :{
 if(!isGroup) return reply(mss.grupo)
 if(!isGroupAdmins) return reply(mss.adm)
 if(!isBotGroupAdmins) return reply(mss.botadm)
 if(!alvo) return reply2("Marque a mensagem.")
 await subaru.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.extendedTextMessage.contextInfo.stanzaId, participant: alvo}})
 await subaru.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
 await react("🗑")
 break;}
 
 case 'prefixo': {
 await subaru.sendMessage(from, {text: `> ┏╾ׁ╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┓֪࣪
> │ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
> ┃࣪ ┃֪ׅ࣪ׄ᨞⁞❄️✿𖥔࣪ Olá, eu sou o ${botName} ❄️
> ┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Esse é o meu prefixo: ${prefix}
> ┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ Leia o 『 ${prefix}menu 』
> ┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
> ┗╾ׁ┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┛`}, {quoted: info})
 break
 }
 
}//SWITCH COMANDOS SEM PREFIXO

//Comando Play, optei por usar um humilde regex (por isso aquela postagem de explicação, não viu? Vai lá no canal, kk).
if (body && /^p\s+/i.test(body.trim())) {
const q1 = body.trim().slice(1).trim(); 
await react("🎵");
try {
let videoInfo;
const isUrl = /https?:\/\/(www\.)?youtube\.com\/|youtu\.be\//.test(q);
if (isUrl) {
reply('⚡ Processando seu link...');
let res = await fetch(`https://raikken-api.speedhosting.cloud/api/play2?url=${encodeURIComponent(q1)}&apikey=${RaikkenKey}`);
let json = await res.json();
if (!json.status) throw new Error('Não foi possível processar o link. Tente novamente.');
let result = json.resultado;
videoInfo = {
titulo: result.Título,
duracao: result.Duração,
thumb: result.Thumbnail,
canal: result.Canal,
views: result.Views,
url: q1
}} else {
reply('🔎 Buscando sua música...');
let res = await fetch(`https://raikken-api.speedhosting.cloud/api/play/search?query=${encodeURIComponent(q1)}&apikey=${RaikkenKey}`);
let json = await res.json();
if (!json.status || !json.resultado) throw new Error('Não foi possível encontrar a música com esse nome.');
let result = json.resultado;
videoInfo = {
titulo: result.titulo,
duracao: result.duracao,
thumb: result.thumb,
canal: result.canal,
views: result.views,
url: result.url
}}
let data = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY');
let hora = moment().tz('America/Sao_Paulo').format('HH:mm:ss');
let textin = `┏╾╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┓֪࣪
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *🎵 Música Encontrada!*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Título:* ${videoInfo.titulo}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Duração:* ${videoInfo.duracao}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Canal:* ${videoInfo.canal || 'N/A'}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Views:* ${videoInfo.views ? videoInfo.views.toLocaleString('pt-BR') : 'N/A'}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Link:* ${videoInfo.url}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Data:* ${data}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Hora:* ${hora}
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┛`;
await subaru.sendMessage(from, { image: { url: videoInfo.thumb }, caption: textin, footer: '🎶 Selecione uma opção abaixo',
buttons: [
{ buttonId: `${prefix}play ${videoInfo.url}`, buttonText: { displayText: '🎧 Áudio' }, type: 1 },
{ buttonId: `${prefix}playvideo ${videoInfo.url}`, buttonText: { displayText: '▶️ Vídeo' }, type: 1 },
{ buttonId: `${prefix}playdoc ${videoInfo.url}`, buttonText: { displayText: '📄 Documento' }, type: 1 }], headerType: 4}, { quoted: seloSz });
} catch (e) {
console.log(e);
botSemKey(subaru, from);
}
return
}

async function sendUrlText(
id,
textCaption,
title,
desc,
imageUrl,
linkAcess,
quotedThis
) {
await subaru.sendMessage(
id,
{
text: textCaption,
contextInfo: {
externalAdReply: {
title: title,
body: desc,
thumbnail: await getBuffer(imageUrl),
mediaType: 1,
sourceUrl: linkAcess,
},
},
},
{ quoted: quotedThis }
);
}

if (body === "prefixo2") {
subaru.sendMessage(from, { react: { text: `🙂‍↔`, key: info.key } });
try {
ppimg = await subaru.profilePictureUrl(
`${senderJid.split("@")[0]}@s.whatsapp.net`,
"image"
);
} catch {
ppimg = "https://i.postimg.cc/J0jC8w1f/perfil.jpg";
}
prefixmsg2 = `> *Olá! Esse é meu Prefixo:『 ${prefix} 』*`;
sendUrlText(
from,
prefixmsg2,
botName,
`${hora}, ${pushname}`,
ppimg,
`Subaru-Base `,
info
);
}
            
if (body.toLowerCase().includes(`💀`)) {
if(!isQuotedSticker) return;
reply2('⏳ Aguarde, processando figurinha...');
react("😎")
renameContextSticker3(
permuteFigPackName(null),
permuteFigAuthorName(pushname),
`Figurinha kibada 😎`,
info
).catch((err) => {
reply2(`❌ Erro, tenta mais tarde`);
});
};


if (body.trim().startsWith("$")) {
if(info.key.fromMe) return;
if(!isDono) return;
console.log("$")
const isFreeCommand = body.startsWith('$free -h');
new Promise((resolve, reject) => {
exec(body.slice(1), (err, stdout) => {
err ? reject(err) : resolve(stdout)
});
}).then(result => {
if(isFreeCommand) {
const lines = result.trim().split('\n');
const memInfo = lines[1].split(/\s+/);
const swapInfo = lines[2].split(/\s+/);
const message = `> Total de memória: ${memInfo[1]}
> Memória em uso: ${memInfo[2]}
> Memória livre: ${memInfo[3]}
> Memória compartilhada: ${memInfo[4]}
> Memória em cache: ${memInfo[5]}
> Memória disponível: ${memInfo[6]}
> Total de swap: ${swapInfo[1]}
> Swap em uso: ${swapInfo[2]}
> Swap livre: ${swapInfo[3]}`;
reply(message);
} else {
reply(result);
}
}).catch(e => {
reply(util.inspect(e.message, {depth: null}));
});
return;}

if (body.trim().startsWith("=>")) {
if (info.key.fromMe) return;
if (!isDono) return;
console.log("=>")
new Promise((resolve, reject) => {
try {
resolve(eval(`(async () => { return ${body.slice(2)} })()`));
} catch (e) {
reject(e);
}
}).then(result => {
reply(util.inspect(result, { depth: null }));
}).catch(e => {
reply(util.inspect(e, { depth: null }));
});
return;
}

if (body.trim().startsWith(">")) {
try {
if(!isDono) {return;}
console.log(">")
return subaru.sendMessage(from, {text: JSON.stringify(eval(budy.slice(2)),null,'\t')}).catch(e => {
return reply(String(e))
})
} catch (e){
return reply(String(e))}
return;
}

if (isSimih && isGroup && budy != undefined) {
if (["imageMessage","audioMessage","stickerMessage"].includes(type) || info.key.fromMe) {return;} //1
try {
const persona = escolherPersonalidadeSubaru() 
const simiPersonality = `${persona.prompt}` ;

const { data } = await axios.post(`https://raikken-api.speedhosting.cloud/api/ia/chat-simi?apikey=${RaikkenKey}`, {
message: budy,
personality: simiPersonality
});
if (data && data.response) { 
await subaru.sendMessage(from, { text: data.response }, { quoted: info });
} else {
const errorMessage = "Não entendi! Pode me explicar melhor?";
await subaru.sendMessage(from, { text: errorMessage }, { quoted: info });
}
} catch (err) {
if (err.response && err.response.data && err.response.data.error) {
 // await subaru.sendMessage(from, { text: err.response.data.error }, { quoted: info });
} else {
console.error(err);
//await subaru.sendMessage(from, { text: `Erro ao consultar a IA.` }, { quoted: info });
}
}}

//====================( SISTEMA DO LEVEL )====================//
const patentes = JSON.parse(fs.readFileSync("./database/textos/patentes.json"));
const levelUpMilestones = new Set([100, 200, 300, 400, 500, 600, 700, 800, 900, 1200, 1500, 1800, 2100, 2700, 3300, 3900, 4500, 5000, 5500, 6500, 7500, 9000, 10500, 12000, 13500, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 150000, 200000, 300000, 400000, 500000, 1000000, 1500000, 2000000, 5000000]);
const level2 = JSON.parse(fs.readFileSync("./database/users/leveling.json"));
let user = level2.find(u => u.id === sender);
if (body && isGroup && isLevelingOn) {
if (!user) {
user = {
id: sender,
nick: pushname,
contador: 0,
level: 1
};
level2.push(user); 
console.log(`Novo usuário [${pushname}] foi registrado no sistema de level.`);}
user.contador += 1;
user.nick = pushname;
const isVeteranLevelUp = user.contador >= 10000000 && user.contador % 1000000 === 0;
const isNormalLevelUp = levelUpMilestones.has(user.contador);
if (isNormalLevelUp || isVeteranLevelUp) {
const oldLevel = user.level;
user.level += 1;
const sendLevelUpMessage = async (txe) => {
try {
const profilePicUrl = await subaru.profilePictureUrl(sender).catch(() => 'https://i.postimg.cc/C1ZRKCkD/images-23.jpg');
const buffer = await getBuffer(profilePicUrl);
const photoUser = await gerarlinkUploadCatbox(buffer).catch(() => 'https://i.postimg.cc/C1ZRKCkD/images-23.jpg');
const imageUrl = `${baseRaikken}/canvas/rank?nome=${encodeURIComponent(pushname)}&avatar=${photoUser}&nivel=${user.level}&rank=${user.level}&xpAtual=${user.contador}&xpNecessario=0&apikey=${RaikkenKey}`;

await subaru.sendMessage(from, { image: { url: imageUrl }, caption: txe, mentions: [sender]}, { quoted: seloSz })
} catch (error) {
console.error("Erro ao enviar mensagem de level up:", error);
}};

let messageCaption;
if (isVeteranLevelUp) {
if (user.contador === 10000000) {
messageCaption = `🎉 Parabéns *@${sender.split("@")[0]}*, você completou com sucesso 10M de XP, possuindo assim o título de *Veterano 🎩*\n–\n• Todos os níveis daqui pra frente serão contados a cada 1M de XP... Nossa equipe se orgulha de coroar você, depois de tanto esforço e desempenho, após muito tempo de uso de nosso sistemas. ${tempo}!`;
} else {
messageCaption = `*🎉 LEGANCY LEVEL UP! 🎖️*\nMeus parabéns querido usuário veterano *@${sender.split("@")[0]}*.\n• Sua experiência acaba de levar a quantidade total de XP à triplicar. Agora você tem *${user.contador} XP*\n–\n*Obs:* Sua patente atual continua sendo a mesma, pois você chegou à maior.`;
}
} else {
const newPatente = patentes.find(p => user.contador >= p.xp).nome;
messageCaption = `🎉 Parabéns *@${sender.split("@")[0]}*, você acaba de subir de level.\n• Novo level foi alcançado por completar *${user.contador} XP.*\nNova patente desbloqueada, você agora é *${newPatente}*`}
sendLevelUpMessage(messageCaption);
}
fs.writeFileSync("./database/users/leveling.json", JSON.stringify(level2, null, 2));
}


//====================( AUTO DOWNLOAD )====================//
if (isAutoDown && isGroup) {
if (body.includes('youtube.com') || body.includes('youtu.be')) {
reply('Link do youtube detectado, enviarei o áudio.')
const endpoint = `${baseRaikken}/mp3/url?url=${encodeURIComponent(body)}&apikey=${RaikkenKey}`;
try {
const res = await fetch(endpoint);
const json = await res.json();
if (!json.status || !json.result?.success) {
return subaru.sendMessage(from, { text: '❌ Não foi possível obter o áudio. Verifique a URL e tente novamente.' });}
const title = json.result.data.title;
const mp3 = json.result.data.downloadUrl;

await subaru.sendMessage(from, {
audio: { body: mp3 },
mimetype: 'audio/mp4',
ptt: false,
fileName: `${title}.mp3`
}, { quoted: info });
} catch (err) {
console.error('Erro no comando .play:', err);
await subaru.sendMessage(chat, { text: '⚠️ Erro ao processar o áudio. Tente novamente mais tarde.' });
}
}else if( body.includes('instagram.com')) {
reply2('Link do insta detectado, enviarei o video.')
try {
const urlApi = `${baseRaikken}/instagram?url=${encodeURIComponent(body)}&apikey=${RaikkenKey}`;
const res = await axios.get(urlApi);
const json = res.data;
if (!json.status || !json.resultado?.video) { return reply("❌ Não consegui baixar o vídeo. Verifique o link e tente novamente.");}
const { video, legenda, perfil } = json.resultado;
const buffer = await getBuffer(video);

await subaru.sendMessage(from, { video: buffer, caption: `🎬 *Reel de:* @${perfil}\n\n📝 ${legenda || "Sem legenda"}\n> ©Andy-Bot v2\n> ${Raikken}`}, { quoted: info });
} catch (e) {
reply(`Eu ao baixar video do insta. ${e}`)
}
}else if( body.includes('tiktok.com')) {
reply2('Link do tiktok detectado, enviarei o video.')
try {
const res = await fetch(`${baseRaikken}/tiktok-link?url=${encodeURIComponent(body)}&apikey=${RaikkenKey}`);
const json = await res.json();
if (!json.status || !json.data || !json.data.length) {
return enviar("⚠️ Vídeo não encontrado ou inválido.")};
const videoHD = json.data.find(v => v.type === "nowatermark_hd")?.url || json.data.find(v => v.type === "nowatermark")?.url || json.data[0].url;

const legenda = `
👤 Autor: ${json.author.nickname} (@${json.author.fullname})
📆 Postado em: ${json.taken_at}
📊 Visualizações: ${json.stats.views}
❤️ Curtidas: ${json.stats.likes}
🔄 Compartilhamentos: ${json.stats.share}

> ${Raikken}`.trim();
await subaru.sendMessage(from, {video: { url: videoHD }, caption: legenda, mimetype: 'video/mp4' }, { quoted: info });
} catch (e) {
reply(`Erro ao baixar video do tiktok. ${e}`)
}
}else if( body.includes('x.com') || body.includes('twitter.com')) {
reply2('Link do x/twitter detectado, enviarei o video.')
try {
const api = `${baseRaikken}/twitter?url=${encodeURIComponent(body)}&apikey=${RaikkenKey}`;
const res = await axios.get(api);
const data = res.data;
if (!data.status) return reply('❌ Não consegui processar o vídeo. Verifique o link.');
const { desc, HD } = data.resultado;
await subaru.sendMessage(from, {
video: { url: HD },
caption: `🎬 *Twitter/X Downloader*\n\n📝 *Descrição:* ${desc}\n> ${Raikken}`,
mimetype: 'video/mp4'
}, { quoted: info});
} catch (err) {
console.error(err);
reply('❌ Erro ao acessar a API ou processar o link.');
}
} else if ( body.includes('facebook.com') || body.includes('fb.watch')) {
reply2('Link do facebook detectado, enviarei o video.')
try {
const urlapi = `${baseRaikken}/facebook?url=${encodeURIComponent(body)}&apikey=${RaikkenKey}`;
const res = await axios.get(urlapi);
const data = res.data;
if (!data.status || !data.resultado || !data.resultado.status) {
return reply('❌ Não consegui processar esse vídeo. Link inválido ou protegido.')}
const { title, duration, thumbnail, links } = data.resultado;
const linkHD = links.find(v => v.quality.includes('720'))?.link;
const linkSD = links.find(v => v.quality.includes('360'))?.link;
const finalLink = linkHD || linkSD;
if (!finalLink) return reply('❌ Nenhum link de vídeo encontrado.');
const buffer = await getBuffer(finalLink); 
await subaru.sendMessage(from, {
video: buffer,
mimetype: 'video/mp4',
caption: `🎬 *${title}*\n⏱ Duração: ${duration}\n> ${Raikken}`,
}, { quoted: info });
} catch (err) {
console.error(err);
reply('❌ Erro ao baixar ou enviar o vídeo. Tente novamente.');
}}
}
//====================( FIM AUTODOWNLOAD )====================//


//=====( ABAIXO AS FUNÇÕES DOS ANTIS )=====\\
//Antilink
if (isAntiLink) {
try {
const UrlLinks = ["https://", "wa.me", "http://"];
for (let link of UrlLinks) {
if (body.includes(link)) {
if(info.key.fromMe) {return;}
if(isGroupAdmins) {return;} 
enviarBan(`*Links não são permitidos aqui!*`);
await subaru.sendMessage(from, {delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender || senderLid }});
await subaru.groupParticipantsUpdate(from, [sender || senderLid], "remove");}}
} catch (e) {
console.log(e)
}}
//ANTI-IMAGEM
if(isAntiImg && isBotGroupAdmins && isImage) {
console.log("imagem")
if(info.key.fromMe) {return;}
if(isGroupAdmins) {return;} 
await enviarBan(`*Imagens não são permitidos aqui!*`);
await subaru.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender || senderLid}})
if(!JSON.stringify(groupMembers).includes(sender || senderLid)) return
await subaru.groupParticipantsUpdate(from, [sender || senderLid], 'remove')}
//ANTI-CONTATO
if(isAntiCtt && isBotGroupAdmins && isContact) {
if(info.key.fromMe) {return;}
if(isGroupAdmins) {return;} 
await enviarBan(`*Contatos não são permitidos aqui!*`);
await subaru.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender || senderLid}})
if(!JSON.stringify(groupMembers).includes(sender || senderLid)) return
await subaru.groupParticipantsUpdate(from, [sender || senderLid], 'remove')}
//ANTI-STICKER
if(isAntiSticker && isBotGroupAdmins && isSticker) {
console.log("sticker")
if(info.key.fromMe) {return;}
if(isGroupAdmins) {return;} 
await enviarBan(`*Figurinhas não são permitidos aqui!*`);
await subaru.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender || senderLid}})
if(!JSON.stringify(groupMembers).includes(sender || senderLid)) return
await subaru.groupParticipantsUpdate(from, [sender || senderLid], 'remove') }
//ANTI-LOCALIZAÇÃO
if(isAntiLoc && isBotGroupAdmins && isLocation) {
console.log("sticker")
if(info.key.fromMe) {return;}
if(isGroupAdmins) {return;}
await enviarBan(`*Localização não são permitidos aqui!*`);
await subaru.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender || senderLid}})
if(!JSON.stringify(groupMembers).includes(sender || senderLid)) return
await subaru.groupParticipantsUpdate(from, [sender || senderLid], 'remove') }
//ANTIDOC
if(isAntiDoc && isBotGroupAdmins && isDocument) {
console.log("doc")
if(info.key.fromMe) {return;}
if(isGroupAdmins) {return;} 
await enviarBan(`*Documentos não são permitidos aqui!*`);
await subaru.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender || senderLid}})
if(!JSON.stringify(groupMembers).includes(sender || senderLid)) return
await subaru.groupParticipantsUpdate(from, [sender || senderLid], 'remove')
let isTrueFalse = Array("play", "play2", "play3", "play4", "play5", "spotify", "playlist", "ytsearch", "ytmp4", "ytmp4-2", "ytmp3", "ytmp3-2", "tiktok", "tiktok2", "tiktokimg", "instamp3", "facebook", "facebook2", "twitter").some(item => item === comando)}
//ANTI-VIDEO
if(isAntiVid && isBotGroupAdmins && isVideo) {
console.log("vídeo")
if(isGroupAdmins) {return;}
await enviarBan(`*Vídeos não são permitidos aqui!*`);
await subaru.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
if(!JSON.stringify(groupMembers).includes(sender || senderLid)) return
await subaru.groupParticipantsUpdate(from, [sender || senderLid], 'remove') }
//ANTI-AUDIO
if(isAntiAudio && isBotGroupAdmins && isAudio) {
console.log("áudio")
if(isGroupAdmins) {return;} 
await enviarBan(`*Áudios não são permitidos aqui!*`);
await subaru.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender || senderLid}})
if(!JSON.stringify(groupMembers).includes(sender || senderLid)) return
await subaru.groupParticipantsUpdate(from, [sender || senderLid], 'remove') }

}// AQUI FECHA OS COMANDOS SEM PREFIXO.


//=====( ABAIXO OS COMANDOS COM PREFIXO )=====\\ 
const privateCmd = (id, pc, cmd, porcentagem) => {
try {
notcmd = `┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓֪࣪
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞❌✿𖥔࣪ *Comando não encontrado!* ❌
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Digitado:* ${pc}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Você quis dizer:* ${cmd}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Semelhança:* ${porcentagem}%
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ Leia o 『 ${prefix}menu 』
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`
return notcmd
} catch (e) {
console.log(e)
}
}

//=====( ABAIXO OS COMANDOS POR PLUGIN )=====\\ 
if (!body.startsWith(prefix)) {return;}
loadPlugins()
const plugin = getPlugin(cmd);
if (plugin) {
try {
await plugin.run({ subaru, msg, args, from, sender, isGroup, pushname, reply, seloSz, react, isAdm, isDono, isGroupAdmins, isBotGroupAdmins, });
} catch (e) {
console.error(`❌ Erro no plugin ${cmd}:`, e);
}
//=====( ABAIXO OS COMANDOS POR CASE )=====\\ 
} else {
try {
switch (command) {

//=====( ABAIXO OS COMANDOS DE MEMBRO \ MEMBROS )=====\\

case 'take': {
if (!isQuotedSticker) {return reply('Você usou de forma errada... Marque uma figurinha.')};
try {
const i8 = rgtake.findIndex(i => i.usuario === senderLid);
if (i8 < 0) {
return reply(`Você ainda não definiu a sua marca ďágua personalizada.\n• Use: *${prefix}rgtake subaru|base*`)}
await react("✔️");
const pack = rgtake[i8].mcdagua1;
const autor = rgtake[i8].mcdagua2;
const txt = `${pack}|${autor}`;
await renameContextSticker3(pack, autor, txt);
await subaru.sendMessage(from, { text: `Renomeado com sucesso para: ${txt}`})
} catch (error) {
console.error("Erro no take:", error);
reply(mss.erro);
}
break;}

case 'rgtake': {
var [TP, TP2] = q.split("|")
rgtakergtake = []
for (i of rgtake) {rgtakergtake.push(i.usuario)}
if(rgtakergtake.indexOf(senderLid) >= 0) return reply("Você já registrou sua marca ďagua, não é possível usar esse comando novamente.")
if(!TP) return reply(`Você esqueceu de preencher o primeiro campo... Ex: *${prefix + command} Subaru|*`)
if(!TP2) TP2 = null
rgtake.push({usuario: senderLid, mcdagua1: TP, mcdagua2: TP2})
fs.writeFileSync("./database/users/take.json", JSON.stringify(rgtake, null, 2))
reply(`Sucesso ao concluir o registro... Agora você pode usar o comando: *${prefix}take*`)
break}

case 'rntake':{
i8 = rgtake.map(i => i.usuario).indexOf(senderLid)
if(i8 < 0) return reply(`Como você quer renomear algo que você não tem registro?`)
var [MARCAD1, MARCAD2] = q.split("|")
if(!MARCAD1) return reply(`Você esqueceu de preencher o primeiro campo... Ex: *${prefix + command} sb|bot*`)
if(!MARCAD2) MARCAD2 = null
rgtake[i8].mcdagua1 = MARCAD1
rgtake[i8].mcdagua2 = MARCAD2
fs.writeFileSync("./database/users/take.json", JSON.stringify(rgtake, null, 2) + '\n')
reply(`Sua marca ďágua foi alterada para *"${MARCAD1}|${MARCAD2}"* com sucesso.`)
break}

case 'meulid': {
await subaru.sendMessage(from, { text: `🔎 Debug do seu LID:\n
> - remoteJid: ${msg.key.remoteJid || 'não veio'}
> - remoteLid: ${msg.key.remoteLid || 'não veio'}
> - participant: ${msg.key.participant || 'não veio'}
> - participantLid: ${msg.key.participantLid || 'não veio'}
> - senderLid: ${senderLid || "não veio"}`});
}
break;

case 'info': {
if (!q) {return reply(`*Uso incorreto!*\n\nDigite \`info <nome_do_comando>\` para ver sua função.\n*Exemplo:* \`info play\``);}
try {
const casesSz = './dono/configs/novidades/cases.json';
const newsSz = './dono/configs/novidades/news.json';
const todosOsComandos = lerOuCriarJSON(casesSz);
const infoDoComando = todosOsComandos.find(cmd => cmd.Comando.toLowerCase() === q.toLowerCase());
if (infoDoComando) {
let response = `┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓࣪
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Informações do Comando*\n\n`;
response += `┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Função:* ${infoDoComando.Função}`;
reply(response);
} else {
reply2(`❌ Comando \`${q}\` não encontrado. Use o comando \`${prefix}menu\` para ver todos os comandos disponíveis.`)}
} catch (e) {
console.log('Erro no comando info:', e);
reply2('Ocorreu um erro ao buscar as informações do comando.');
}
break;}

case 'afk':
let motivoFK = q ? q.trim() : 'Sem Motivo Especificado'
if (q && q.trim().toLowerCase() === 'fk') {
motivoFK = 'Motivo Padrão Gerado Automaticamente'
}
afkData[sender] = { numero: pushname, motivo: motivoFK, tempoSaida: Date.now()}
fs.writeFileSync('./database/users/ausente.json', JSON.stringify(afkData))
reply(`*Você está agora AFK. Motivo: ${motivoFK}*`);
break

case 'listaafk':
let listaAFK = '*Pessoas AFK:*\n\n'
if (Object.keys(afkData).length === 0) {
return reply('Não há ninguém AFK no momento.')
}
for (const key in afkData) {
if (afkData.hasOwnProperty(key)) {
listaAFK += `*Número: ${afkData[key].numero.split("@")[0]}*\n*Motivo: ${afkData[key].motivo}*\n\n`
}}
reply(listaAFK)
break

case 'testevip': {
if (!isPremium) { return enviar("❌ Este comando é exclusivo para usuários VIP.");}
reply("Oi, vip")
}
break

case 'minhaatividade':
case 'meuativo':
if (!isGroup) return reply(mss.grupo);
var iGroup = countMessage.map(i => i.groupId).indexOf(from);
if (iGroup < 0) return reply('Ainda não tenho dados desse grupo.');
var iUser = countMessage[iGroup].numbers.map(i => i.id).indexOf(sender);
if (iUser < 0) return reply('Ainda não tenho dados sobre você neste grupo.');
var userData = countMessage[iGroup].numbers[iUser];
let joinDate = '';
try {
const metadata = await getGroupMetadataSafe(from);
const participant = metadata.participants.find(p => p.id === sender);
if (participant && participant.joinedAt) {
joinDate = moment(participant.joinedAt).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
} else {
joinDate = userData.joinedAt || moment().tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");}
} catch {
joinDate = userData.joinedAt || moment().tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");}
var text = `*Sua atividade no grupo:* ${groupName}\n–\n• Entrou no grupo em: *${userData.joinedAt || 'Desconhecido'}*\n Mensagens enviadas: *${userData.messages}*\n• Comandos usados: *${userData.cmd_messages}*\n• Figurinhas enviadas: *${userData.figus}*\n• Dispositivo atual: *${userData.aparelho}*`;
await reply(text);
break;

case 'menu': {
await react("♥️");
const moment = require('moment-timezone');
const data = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY');
const hora = moment().tz('America/Sao_Paulo').format('HH:mm:ss');
const userToCheck = menc_jid2?.length ? menc_jid2[0] : alvo || userJid;
const formatarTempo = (segundos) => {
const h = Math.floor(segundos / 3600).toString().padStart(2, '0');
const m = Math.floor((segundos % 3600) / 60).toString().padStart(2, '0');
const s = Math.floor(segundos % 60).toString().padStart(2, '0');
return `${h}:${m}:${s}`;
};
const { escolherPersonalidadeSubaru } = require('./dono/functions.js')
const tempoAtivo = formatarTempo(process.uptime());
const persona = escolherPersonalidadeSubaru(pushname, data, hora, tempoAtivo)
const videoAleaSz = escolherVideoPorRota(persona.nome);

await subaru.relayMessage(from, {
interactiveMessage: {
header: proto.Message.InteractiveMessage.Header.create({
...(await prepareWAMessageMedia(
{ video: fs.readFileSync(videoAleaSz), gifPlayback: true },
{ upload: subaru.waUploadToServer }
)),
hasMediaAttachment: false,
title: ``,
}), 
body: { 
text: `${persona.menuStyle}`
},
footer: { text: `${botName}` },
nativeFlowMessage: {
buttons: [
{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: "𝐌𝐄𝐍𝐔 𝐆𝐄𝐑𝐀𝐋",
sections: [
{
title: "𝐌𝐄𝐍𝐔",
rows: [
{ title: "𝐌𝐄𝐍𝐔", description: "Comandos principais para membros.", id: `${prefix}menus` }
]
},
{
rows: [
{ title: "𝐌𝐄𝐍𝐔 𝐁𝐑𝐈𝐍𝐊𝐒", description: "Brincadeiras e jogos.", id: `${prefix}menubn` }
]
},
{
rows: [
{ title: "𝐌𝐄𝐍𝐔 𝐀𝐃𝐌", description: "Comandos de administração.", id: `${prefix}menuadm` }
]
},
{
rows: [
{ title: "𝐌𝐄𝐍𝐔 𝐆𝐄𝐑𝐀𝐋", description: "Todos os comandos do bot.", id: `${prefix}menugeral` }
]
},
{
rows: [
{ title: "𝐂𝐑𝐈𝐀𝐃𝐎𝐑", description: `Contato do criador da ${botName}`, id: `${prefix}criador` }
]
}
]
})
}
],
messageParamsJson: "",
},
},
}, {});
break;
}

case "menugeral": {
await react('🌙');
if (!isGroup) return enviar(mss.grupo);
const moment = require('moment-timezone');
const data = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY');
const hora = moment().tz('America/Sao_Paulo').format('HH:mm:ss');
try {
await subaru.sendMessage(from, { image: { url: menuimg }, caption: menugeral(data, hora, prefix, donoName) }, { quoted: seloSz });
} catch (e) {
reply(`*_${e.message}_*`)
}
}
break

case "menus": {
await react('🌙');
if (!isGroup) return enviar(mss.grupo);
const moment = require('moment-timezone');
const data = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY');
const hora = moment().tz('America/Sao_Paulo').format('HH:mm:ss');
try {
await subaru.sendMessage(from, { image: { url: menuimg }, caption: menumembros(data, hora, prefix, donoName) }, { quoted: seloSz });
} catch (e) {
reply(`*_${e.message}_*`)
}
}
break

case "menuadm": {
await react('🌙');
if (!isGroup) return enviar(mss.grupo);
if (!isGroupAdmins && !isDono) return enviar(mss.adm);
const moment = require('moment-timezone');
const data = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY');
const hora = moment().tz('America/Sao_Paulo').format('HH:mm:ss');
try {
await subaru.sendMessage(from, { image: { url: menuimg }, caption: menuAdm(data, hora, prefix, donoName) }, { quoted: seloSz });
} catch (e) {
reply(`*_${e.message}_*`)
}
}
break

case "menubn": {
await react('🌙');
if (!isGroup) return enviar(mss.grupo);
const moment = require('moment-timezone');
const data = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY');
const hora = moment().tz('America/Sao_Paulo').format('HH:mm:ss');
try {
await subaru.sendMessage(from, { image: { url: menuimg }, caption: menubn(data, hora, prefix, donoName) }, { quoted: seloSz });
} catch (e) {
reply(`*_${e.message}_*`)
}
}
break

case 'criador':
await subaru.sendMessage(from, { 
image: { url: 'https://i.postimg.cc/J0jC8w1f/perfil.jpg' },
caption: `┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓֪࣪
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *〽️ MEU DONO*〽️
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Nick:* ${donoName}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Número:* wa.me/${donoNmr}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Prefixo:* 「${prefix}」
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`
}, { quoted: seloSz });
break;

case 'subaru': {
const { escolherPersonalidadeSubaru } = require('./dono/functions.js')
const persona = escolherPersonalidadeSubaru()
if (!q) { return reply("Diga o que quer perguntar.") }
react('🫟')
try {
const personality = `${persona.prompt}`;
const fullPrompt = `${personality}, agora responda: ${q}`;
const res = await axios.get(`${baseRaikken}/ia/gemini?prompt=${encodeURIComponent(fullPrompt)}&apikey=${RaikkenKey}`);
if (!res.data || !res.data.resultado) {
return reply("❌ Não consegui obter resposta do subaru.");
}
console.log(res)
const resposta = res.data.resultado.trim();
return reply(`${resposta}`);
} catch (err) {
console.error("Erro ao chamar:", err);
return reply("❌ Ocorreu um erro ao se comunicar com o Subaru.");
}
}
break;

case 'sticker':
case 's':{
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
let packin;
let author23;
if (`${sender.split("@")[0]}` === donoNmr) {
packin =q ? q?.split("/")[0] : botName
author23 = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `♥️ ${donoName}`
} else {
packin =q ? q?.split("/")[0] : ` ⃟𝙱𝚘𝚝: ${botName}\n🤖⃟ 𝙽𝚞𝚖𝚎𝚛𝚘 𝚋𝚘𝚝: ${numeroBot.split('@')[0]}`
author23 = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `\n\n👤⃟𝙿𝚎𝚍𝚒𝚍𝚘 𝚙𝚘𝚛: ${pushname}\n👑⃟𝙲𝚛𝚒𝚊𝚍𝚘𝚛: Sz Psico`
}
if(boij2){
react('💭')
enviar('Hum.... espere um minutinho ai 😚')
owgi = await getFileBuffer(boij2, 'image')
let encmediaa = await sendImageAsSticker2(subaru, from, owgi, info, { packname:packin, author:author23})
await DLT_FL(encmediaa)
} else if(boij && boij.seconds < 11){
owgi = await getFileBuffer(boij, 'video')
let encmedia = await sendVideoAsSticker2(subaru, from, owgi, info, { packname:packin, author:author23})
await DLT_FL(encmedia)
react(emoji)
} else {
return reply(`Marque uma foto ou o vídeo(menor que 10s) para fazer sua figurinha com o comando: ${prefix+comando}`)
}
}
break

case 'get': 
if(!isGroupAdmins && !isDono) return enviar(mss.adm)
reply2(JSON.stringify(info.message.extendedTextMessage.contextInfo, null, 3))
break

case 'sair':
if(!isGroup) return reply(mss.grupo)
if(!isBotGroupAdmins) return reply(mss.botadm)
reply(`Não ${pushname}, não saia do grupo! Mas já que quer continuar, depois peça pra ADM de adicionar. 😭💔`)
await sleep(3000)
subaru.groupParticipantsUpdate(from, [sender], 'remove')
await sleep(1000)
reply(`Ah, menos um para eu me preocupar. 😪`)
break

case 'channel':
reply(`Olá ${pushname}, esse é o link do canal do dono: 
https://whatsapp.com/channel/0029Vb7qLZZEgGfDZIxCWI3s`).
break

case 'gerarlink': {
try {//By Duarte. 
if (isQuotedImage || isQuotedVideo || isQuotedSticker) {
const mediaInfo = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.imageMessage : isQuotedVideo ? JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.videoMessage : isQuotedSticker ? JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.stickerMessage : info;
const gerarlinkTipo = isQuotedImage ? 'image' : isQuotedVideo ? 'video' : isQuotedSticker ? 'sticker' : 'image';
const gerarlinkExt = isQuotedImage ? 'png' : isQuotedVideo ? 'mp4' : isQuotedSticker ? 'webp' : 'png';
const gerarlinkBuffer = await getFileBuffer(mediaInfo, gerarlinkTipo);
const filename = `subaru-base_${Date.now()}.${gerarlinkExt}`;
const gerarlinkFinal = await gerarlinkUploadCatbox(gerarlinkBuffer, filename);

await subaru.relayMessage(from, {
interactiveMessage: {
body: { text: `*Link gerado com sucesso!*\n\nTamanho do arquivo: ${bytesParaMB(gerarlinkBuffer.length)}` },
footer: { text:botName },
nativeFlowMessage: {
buttons: [
{
"name": "cta_copy",
"buttonParamsJson": `{\"display_text\":\"𝕮𝖔𝖕𝖎𝖆𝖗 𝖑𝖎𝖓𝖐\",\"id\":\"cta_copy\",\"copy_code\":\"${gerarlinkFinal}\"}`
},
],messageParamsJson: "",},},}, {});
} else {
enviar('*Marque uma imagem, vídeo ou figurinha*');
}} catch (e) {
console.log(e);
enviar(`❌ Erro ao tentar gerar o link. Erro:${e.message}`);
}
break;}

case 'linkimage': {
if (!isDono) return reply("Apenas dono pode usar este comando.")
if (!q) return reply("Envie um link de imagem válido.")
let url = q
try {
let buffer = await getBufferFromUrl(url)
await subaru.sendMessage(from, { image: buffer, caption: "Aqui está a imagem 👆" })
} catch (e) {
reply("Erro ao baixar a imagem: " + e.message)
}}
break


/* ====( AQUI AINDA SÃO CMDS DE MEMBROS, MAS APENAS BRINCADEIRAS )==== */
case 'jogodavelha':
if(!isGroup) return reply("Só grupos!")
if(!menc_jid2) return reply("Marque junto com o comando, o @ do usuário que deseja desafiar..")
if(JOGO_D_V != false) {
const boardnow = setGame(`${from}`);
const matrix = boardnow._matrix;
const chatMove = `*🎮Ꮐ̸Ꭺ̸Ꮇ̸Ꭼ̸ Ꭰ̸Ꭺ̸ Ꮩ̸Ꭼ̸Ꮮ̸Ꮋ̸Ꭺ̸🕹️*
 
[❗] Alguém está jogando no momento...\n\n@${boardnow.X} VS @${boardnow.O}
 
❌ : @${boardnow.X}
⭕ : @${boardnow.O}
 
 Sua vez : @${boardnow.turn == "X" ? boardnow.X : boardnow.O}
 
${matrix[0][0]}${matrix[0][1]}${matrix[0][2]}
${matrix[1][0]}${matrix[1][1]}${matrix[1][2]}
${matrix[2][0]}${matrix[2][1]}${matrix[2][2]}

caso queira resetar o jogo, mande um adm ou os jogadores que estão jogando utilizar o comando ${prefix}rv
`;
mention(chatMove, groupMemb2);
return;
}
if(q.length === 1) return reply(`*⟅❗⟆ Jogue com Alguem!!!!*
*para inicar a partida : ${prefix + command} @membro do gp*`);
const boardnow = setGame(`${from}`);
boardnow.status = false;
boardnow.X = sender.replace(SNET, "");
boardnow.O = argss[1].replace("@", "");
var blabord = [`${boardnow.X}`, `${boardnow.O}`]
fs.writeFileSync(`./database/tictactoe/db/${from}.json`,
JSON.stringify(boardnow, null, 2)
);
const strChat = `*『📌ᎬՏᏢᎬᎡᎪΝᎠϴ ϴ ϴᏢϴΝᎬΝͲᎬ⚔️』*
 
@${sender.replace(SNET,
"")} _está te desafiando para uma partida de jogo da velha..._
_[ ${argss[1]} ] Use *『S』* para aceitar ou *『N』* para não aceitar..._\n\nEm caso de problemas, marque algum administrador para resetar o jogo com o comando ${prefix}rv`;
b = [sender, menc_jid]
mentions(strChat, b, true)
break

case 'resetarvelha':
case 'rv': 
if(!sender.includes(JOGO_D_V?.X) && !sender.includes(JOGO_D_V?.O) && !isGroupAdmins) return reply(`Fale com algum dos jogadores que jogaram ou espere eles terminar para
você jogar, se não tiver nenhum dos 2 online, fale com algum adm para digitar ${prefix}rv para resetar o jogo.`)
if(fs.existsSync("./database/tictactoe/db/" + from + ".json")) {
DLT_FL("./database/tictactoe/db/" + from + ".json");
reply(`Jogo da velha resetado com sucesso nesse grupo!`);
} else {
reply(`Não a nenhuma sessão em andamento...`);
}
break

case 'nofap': {
const inicio = new Date(2025, 8, 1) 
const hoje = new Date()
const diffTime = hoje - inicio
const dias = Math.floor(diffTime / (1000 * 60 * 60 * 24))
//By jhow
let patente = 'Soldado 🪖'
let motivacional = 'Todo guerreiro começa do zero. A luta é diária! ⚔️'

if (dias >= 29) {
patente = 'Monge ♾️'
motivacional = 'Você atingiu o ápice! 🧘 Continue iluminando sua jornada.'
} else if (dias >= 27) {
patente = 'Rei 👑'
motivacional = 'Você reina sobre seus desejos. Continue forte!'
} else if (dias >= 25) {
patente = 'General ⭐️⭐️⭐️'
motivacional = 'Sua disciplina é digna de liderança. 🚀'
} else if (dias >= 23) {
patente = 'Coronel ⭐️⭐️'
motivacional = 'Você está no comando da sua vida! ✨'
} else if (dias >= 21) {
patente = 'Major 🎖️🎖️'
motivacional = 'Mais de 3 semanas de vitória, continue firme! 💪'
} else if (dias >= 19) {
patente = 'Capitão 🎖️'
motivacional = 'Sua força inspira, siga comandando sua mente! 🔥'
} else if (dias >= 17) {
patente = 'Primeiro Tenente 🎖️'
motivacional = 'A batalha está sob controle, você está vencendo! 🛡️'
} else if (dias >= 15) {
patente = 'Segundo Tenente 🎖️'
motivacional = 'Força de vontade crescendo a cada dia! 🌟'
} else if (dias >= 13) {
patente = 'Aspirante a Oficial ⚜️⚜️'
motivacional = 'A caminhada já tem fundamentos sólidos. Continue!'
} else if (dias >= 11) {
patente = 'Subtenente ⚜️'
motivacional = 'Você já mostra resiliência e foco! ✨'
} else if (dias >= 9) {
patente = 'Primeiro Sargento 🎖️'
motivacional = 'Superando limites e ganhando disciplina. 🔒'
} else if (dias >= 7) {
patente = 'Segundo Sargento 🎖️'
motivacional = 'Primeira semana vencida, orgulho demais! 🔥'
} else if (dias >= 5) {
patente = 'Terceiro Sargento 🎖️'
motivacional = 'Resistindo ao ciclo, rumo à vitória! 🚀'
} else if (dias >= 3) {
patente = 'Cabo 🎗️'
motivacional = 'Já é uma conquista sair do início, continue firme! 💥'
}
//By Jhow
let texto = `*🏆 Tabela NoFap 2025 Atualizada!*\n\n📅 Dias: *${dias}*\n🎖️ Patente: *${patente}*\n\n💡 ${motivacional}`

reply(texto)
}
break

case 'chance':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(args.length < 1) return reply(`Você precisa digitar da forma correta... Por exemplo: *${prefix}chance* _do jubileu ser gay_`)
await subaru.sendMessage(from, {text: `😵‍💫🌟 - A chance _“${q}”_ é de: *${Math.floor(Math.random() * 100)}%*. Eai, foi o que a probabilidade que esperava jovem?`, mentions: [sender]}, {quoted: selo});
break

case 'comer':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que você quer botar rebolar pros cria, a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://telegra.ph/file/d46ff5e2b8f4c5335e362.mp4`}, gifPlayback: true, caption: `Você acabou de comer a(o) *@${alvo.split('@')[0]}*`, mentions: [alvo]}, {quoted: selo})
break

case 'capinarlote':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que você quer botar pra capinar um lote, a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://telegra.ph/file/4682c1b474ce5dee3a48d.mp4`}, gifPlayback: true, caption: `Você acabou de botar o(a) *@${alvo.split('@')[0]}* pra capinar um lote`, mentions: [alvo]}, {quoted: selo})
break

case 'pgpeito':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que você quer pegar nos peitinhos, a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://telegra.ph/file/52d46e2c58318b8cfcacc.mp4`}, gifPlayback: true, caption: `Você acabou de pegar nos peitos do(a) *@${alvo.split('@')[0]}*`, mentions: [alvo]}, {quoted: selo})
break


case 'pgpau':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que você quer pegar no pau dele(a), a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://telegra.ph/file/5073ba8be6b099ed812a7.mp4`}, gifPlayback: true, caption: `Você acabou de pegar no pau do(a) *@${alvo.split('@')[0]}*`, mentions: [alvo]}, {quoted: selo})
break


case 'pgbunda':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que desejas ser acariciado, a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://telegra.ph/file/e62de1e6863c59d284b2e.mp4`}, gifPlayback: true, caption: `Você acabou de pegar na bunda do(a) *@${alvo.split('@')[0]}*`, mentions: [alvo]}, {quoted: selo})
break

case 'morder':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que você quer dar uma mordida, a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://telegra.ph/file/75e4c0273be625a2363ce.mp4`}, gifPlayback: true, caption: `Você acabou de dar uma mordida no(a) *@${alvo.split('@')[0]}*`, mentions: [alvo]}, {quoted: selo})
break

case 'sentar':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que você quer dar uma sentadinha, a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://telegra.ph/file/d695e05443043ff9a254d.mp4`}, gifPlayback: true, caption: `Você acabou de dar uma sentadinha no(a) *@${alvo.split('@')[0]}*`, mentions: [alvo]}, {quoted: selo})
break

case 'tirarft':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que você quer tirar a foto, a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://telegra.ph/file/7193308e3949803132bad.mp4`}, gifPlayback: true, caption: `Você acabou de tirar uma foto do(a) *@${alvo.split('@')[0]}*`, mentions: [alvo]}, {quoted: selo})
break

case 'estuprar':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque a pessoa que você quer comer a força, a mensagem ou o @');
await subaru.sendMessage(from, {video: {url: `https://files.catbox.moe/kusu1d.mp4`}, gifPlayback: true, caption: `Ta prr 🔥 *@${alvo.split('@')[0]}* Você foi estuprado 😰` , mentions: [alvo]}, {quoted: selo})
break

case 'boquete':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque a pessoa que você quer botar pra mamar, a mensagem ou o @');
await subaru.sendMessage(from, {video: {url: `https://files.catbox.moe/4hvf79.mp4`}, gifPlayback: true, caption: `Eita *@${alvo.split('@')[0]}* garganta profunda voce tem 😰` , mentions: [alvo]}, {quoted: selo})
break

case 'cagar':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque a pessoa que você quer botar pra cagar, a mensagem ou o @');
await subaru.sendMessage(from, {video: {url: `https://files.catbox.moe/662vzj.mp4`}, gifPlayback: true, caption: `CARALHOOOOO *@${alvo.split('@')[0]}* FAMOSO CAGA TRONCO KAKAKAKAK??? 🤯😳` , mentions: [alvo]}, {quoted: selo})
break

case 'cu':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text:`Pesquisando quantos cm de profundidade tem seu bozo @${sender_ou_n.split("@")[0]}, aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: `https://files.catbox.moe/x8k6en.jpg`}, caption: `Quantos cm o(a) *@${sender_ou_n.split("@")[0]}* 
tem no bozo ?\n• A chance é de *${random}cm* 😳`, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break 


case 'abraco':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que você quer dar um abraço, a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://files.catbox.moe/ecw188.mp4`}, gifPlayback: true, caption: `Você acabou de dar um abraço fofo no(a) *@${alvo.split('@')[0]}*`, mentions: [alvo]}, {quoted: selo})
break

case 'lavarlouca':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que você quer botar pra lavar a louça, a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://files.catbox.moe/qptf5k.mp4`}, gifPlayback: true, caption: `Você acabou de botar a(o) *@${alvo.split('@')[0]}* pra lavar a louça`, mentions: [alvo]}, {quoted: selo})
break

case 'carinho':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque o alvo que você quer dar um carinho, a mensagem ou o @.')
await subaru.sendMessage(from, {video: {url:`https://telegra.ph/file/2b6b4f4e38214bd6164ce.mp4`}, gifPlayback: true, caption: `Você acabou de dar um carinho no(a) *@${alvo.split('@')[0]}*`, mentions: [alvo]}, {quoted: selo})
break

case 'morte': case 'death':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if (args.length == 0) return reply(`Está faltando o nome da pessoa! Por exemplo: ${prefix+command} Victor`)
predea = await axios.get(`https://api.agify.io/?name=${encodeURIComponent(args[0])}`);
if (predea.data.age == null) return reply(`Você inseriu um nome invalido, certifique-se de inserir um sem acentos, emojis, números e outros.`);
await subaru.sendMessage(from, {video: {url: deathcmd}, gifPlayback: true, caption: `Pessoas com este nome citado “${predea.data.name}” tendem a morrer aos ${predea.data.age} anos.`, mentions: [sender]}, {quoted: selo});
break


case "ppt":
if(args.length < 1) return reply(`Você deve digitar ${prefix}ppt pedra, ${prefix}ppt papel ou ${prefix}ppt tesoura`);
ppt = ["pedra", "papel", "tesoura"];
ppy = ppt[Math.floor(Math.random() * ppt.length)];
ppg = Math.floor(Math.random() * 1) + 10
pptb = ppy
if((pptb == "pedra" && args == "papel") ||
(pptb == "papel" && args == "tesoura") ||
(pptb == "tesoura" && args == "pedra")) {
var vit = "vitoria"
} else if((pptb == "pedra" && args == "tesoura") ||
(pptb == "papel" && args == "pedra") ||
(pptb == "tesoura" && args == "papel")) {
var vit = "derrota"
} else if((pptb == "pedra" && args == "pedra") ||
(pptb == "papel" && args == "papel") ||
(pptb == "tesoura" && args == "tesoura")) {
var vit = "empate"
} else if(vit = "undefined") {
return reply(`Você deve digitar ${prefix}ppt pedra, ${prefix}ppt papel ou ${prefix}ppt tesoura`)
}
if(vit == "vitoria") {var tes = "Vitória do jogador"}
if(vit == "derrota") {var tes = "A vitória é do BOT"} 
if(vit == "empate") {var tes = "O jogo terminou em empate"}
reply(`*${botName}* jogou ${pptb}, o jogador jogou: ${args} -> *${tes}*`);
break

case 'nazista':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text: `Pesquisando a sua ficha de nazista: *@${sender_ou_n.split("@")[0]}* aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: imgnazista}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa nazista?\n• Porcentagem de chance de ser uma pessoa nazista: *${random}%.* `, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break 

case 'gay':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text: `Pesquisando a sua ficha de gay: @${sender_ou_n.split("@")[0]} aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
feio = random; boiola = random
if(boiola < 20 ) {var bo = 'hmm... você é hetero...'} else if(boiola == 21 ) {var bo = '+/- boiola'} else if(boiola == 23 ) {var bo = '+/- boiola'} else if(boiola == 24 ) {var bo = '+/- boiola'} else if(boiola == 25 ) {var bo = '+/- boiola'} else if(boiola == 26 ) {var bo = '+/- boiola'} else if(boiola == 27 ) {var bo = '+/- boiola'} else if(boiola == 2 ) {var bo = '+/- boiola'} else if(boiola == 29 ) {var bo = '+/- boiola'} else if(boiola == 30 ) {var bo = '+/- boiola'} else if(boiola == 31 ) {var bo = 'tenho minha desconfiança...'} else if(boiola == 32 ) {var bo = 'tenho minha desconfiança...'} else if(boiola == 33 ) {var bo = 'tenho minha desconfiança...'} else if(boiola == 34 ) {var bo = 'tenho minha desconfiança...'} else if(boiola == 35 ) {var bo = 'tenho minha desconfiança...'} else if(boiola == 36 ) {var bo = 'tenho minha desconfiança...'} else if(boiola == 37 ) {var bo = 'tenho minha desconfiança...'} else if(boiola == 3 ) {var bo = 'tenho minha desconfiança...'} else if(boiola == 39 ) {var bo = 'tenho minha desconfiança...'} else if(boiola == 40 ) {var bo = 'tenho minha desconfiança...'} else if(boiola == 41 ) {var bo = 'você é né?'} else if(boiola == 42 ) {var bo = 'você é né?'} else if(boiola == 43 ) {var bo = 'você é né?'} else if(boiola == 44 ) {var bo = 'você é né?'} else if(boiola == 45 ) {var bo = 'você é né?'} else if(boiola == 46 ) {var bo = 'você é né?'} else if(boiola == 47 ) {var bo = 'você é né?'} else if(boiola == 4 ) {var bo = 'você é né?'} else if(boiola == 49 ) {var bo = 'você é né?'} else if(boiola == 50 ) {var bo = 'você é ou não?'} else if(boiola > 51) {var bo = 'você é gay...'
}
await subaru.sendMessage(from, {image: {url: imggay}, caption: `Qual é a porcentagem de chance do(a) *@${sender_ou_n.split("@")[0]}* ser gay?\n• *${random}% homossexual*, ${bo}`, mentions: [sender_ou_n], thumbnail:null}, {quoted: selo})
}, 7000)
break

case 'feio':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text: `Pesquisando a sua ficha de feio: *@${sender_ou_n.split("@")[0]}* aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
 setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
feio = random
if(feio < 20 ) {var bo = 'É não é feio'} else if(feio == 21 ) {var bo = '+/- feio'} else if(feio == 23 ) {var bo = '+/- feio'} else if(feio == 24 ) {var bo = '+/- feio'} else if(feio == 25 ) {var bo = '+/- feio'} else if(feio == 26 ) {var bo = '+/- feio'} else if(feio == 27 ) {var bo = '+/- feio'} else if(feio == 2 ) {var bo = '+/- feio'} else if(feio == 29 ) {var bo = '+/- feio'} else if(feio == 30 ) {var bo = '+/- feio'} else if(feio == 31 ) {var bo = 'ainda tá na média'} else if(feio == 32 ) {var bo = 'dá pra pegar umas(ns) novinha(o) ainda'} else if(feio == 33 ) {var bo = 'Da pra pegar umas(ns) novinha(o) ainda'} else if(feio == 34 ) {var bo = 'é fein, mas tem baum coração'} else if(feio == 35 ) {var bo = 'tá na média, mas não deixa de ser feii'} else if(feio == 36 ) {var bo = 'bonitin mas é feio com orgulho'} else if(feio == 37 ) {var bo = 'feio e preguiçoso(a), vai se arrumar praga feia'} else if(feio == 3 ) {var bo = 'tenho '} else if(feio == 39 ) {var bo = 'feio, mas um banho e se arrumar, deve resolver'} else if(feio == 40 ) {var bo = 'fein,mas não existe gente feia, existe gente que não conhece os produtos jequity'} else if(feio == 41 ) {var bo = 'você é Feio, mas é legal, continue assim'} else if(feio == 42 ) {var bo = 'Nada que uma maquiagem e se arrumar, que não resolva.'} else if(feio == 43 ) {var bo = 'Feio que dói de ver, compra uma máscara que melhora'} else if(feio == 44 ) {var bo = 'Feio mas nada que um saco na cabeça não resolva né!?'} else if(feio == 45 ) {var bo = 'você é feio, mas tem bom gosto'} else if(feio == 46 ) {var bo = 'feio mas tem muitos amigos'} else if(feio == 47 ) {var bo = 'é feio mas tem lábia pra pegar várias novinha'} else if(feio == 4 ) {var bo = 'feio e ainda não sabe se vestir, vixi'} else if(feio == 49 ) {var bo = 'feiooo dms vey.'} else if(feio == 50 ) {var bo = 'você é feio, mas não se encherga.'} else if(feio > 51) {var bo = 'você é feio demais bixo.'}
await subaru.sendMessage(from, {image: {url: imgfeio}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa feia?\n• A porcentagem de chance é *${random}%*, ${bo}`, mentions: [sender_ou_n], thumbnail:null}, {quoted: selo})
}, 7000)
break 

case 'corno':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text:`Pesquisando a ficha de corno @${sender_ou_n.split("@")[0]}, aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: imgcorno}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa chifruda?\n• A porcentagem de chance é *${random}%*`, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break

case 'vesgo':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text:`Pesquisando a ficha de vesgo @${sender_ou_n.split("@")[0]}, aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
 setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: imgvesgo}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa vesga?\n• A porcentagem de chance é *${random}%*`, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break 

case 'bebado':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text:`Pesquisando a ficha de bebado(a) @${sender_ou_n.split("@")[0]}, aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: imgbebado}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa bêbada?\n• A porcentagem de chance é *${random}%*`, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break 

case 'gado':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text:`Pesquisando a ficha de gado @${sender_ou_n.split("@")[0]}, aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: imggado}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser um gado?\n• A porcentagem de chance é *${random}%*`, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break 

case 'fiel':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text:`Pesquisando a ficha de fiel @${sender_ou_n.split("@")[0]}, aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: `https://files.catbox.moe/hwbqmt.webp`}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser fiel?\n• A porcentagem de chance é *${random}%*`, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break 

case 'lindo':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text:`Pesquisando a ficha de lindo @${sender_ou_n.split("@")[0]}, aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: `https://files.catbox.moe/2r420g.jpg`}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser lindo?\n• A porcentagem de chance é *${random}%*`, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break 

case 'linda':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text:`Pesquisando a ficha de linda @${sender_ou_n.split("@")[0]}, aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: `https://files.catbox.moe/yb6hpe.jpg`}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser linda?\n• A porcentagem de chance é *${random}%*`, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break 

case 'gostoso':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text:`Pesquisando a sua ficha de gostoso @${sender_ou_n.split("@")[0]} aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
 setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: `https://files.catbox.moe/xkw2bd.jpg`}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa gostosa?\n• A porcentagem de chance é *${random}%*`, gifPlayback: true, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break 

case 'gostosa':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await subaru.sendMessage(from, {text:`Pesquisando a sua ficha de gostosa @${sender_ou_n.split("@")[0]} aguarde...`, mentions: [sender_ou_n]}, {quoted: selo})
setTimeout(async() => {
random = `${Math.floor(Math.random() * 110)}`
await subaru.sendMessage(from, {image: {url: imggostosa}, caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa gostosa?\n• A porcentagem de chance é *${random}%*`, gifPlayback: true, mentions: [sender_ou_n]}, {quoted: selo})
}, 7000)
break 

case 'chute':
case 'chutar':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
;
if(!alvo) return reply('Marque o alvo que você quer da um chute, a mensagem ou o @')
await subaru.sendMessage(from, {video: {url: chutecmd}, gifPlayback: true, caption: `Você acabou de dar um chute em *@${alvo.split('@')[0]}*.`, mentions: [alvo]}, {quoted: selo})
break 

case 'dogolpe':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!alvo) return reply('Marque a mensagem com o comando ou marque o @ do usuário..')
randomF = ["𝐄𝐌 𝐈𝐋𝐔𝐃𝐈𝐑 𝐏𝐄𝐒𝐒𝐎𝐀𝐒", "𝐄𝐌 𝐅𝐄𝐑𝐈𝐑 𝐎𝐒 𝐒𝐄𝐍𝐓𝐈𝐌𝐄𝐍𝐓𝐎𝐒", "𝐄𝐌 𝐃𝐀𝐑 𝐂𝐇𝐈𝐅𝐑𝐄"]
await subaru.sendMessage(from, {text: `𝐎(𝐀) *@${alvo.split("@")[0]}* 𝐄 𝐄𝐒𝐏𝐄𝐂𝐈𝐀𝐋𝐈𝐒𝐓𝐀: ${randomF[Math.floor(Math.random() * randomF.length)]}.`, mentions: [alvo]}, {quoted: selo})
break

case 'shipo':
if(!isGroup) return reply("Somente em grupos.");
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
;
if(!alvo) return reply('Marque uma pessoa do grupo para encontrar o par dela.');
await mention(`『💘』𝐄𝐔 𝐒𝐇𝐈𝐏𝐎:\n@${groupMembers[Math.floor(Math.random() * groupMembers.length)].id.split('@')[0]}\n\n@${alvo.split("@")[0]}\n\n𝐂𝐎𝐌 𝐔𝐌𝐀 𝐏𝐎𝐑𝐒𝐄𝐍𝐓𝐀𝐆𝐄𝐌 𝐃𝐄: *${Math.floor(Math.random() * 100)+"%"}*.`, groupMemb2);
break

case 'casal':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

await reagir("💘");
var m1= groupMembers[Math.floor(Math.random() * groupMembers.length)].id
var m2= groupMembers[Math.floor(Math.random() * groupMembers.length)].id
try {ppimg = await subaru.profilePictureUrl(m1)} catch(erro) {ppimg = 'https://telegra.ph/file/2fbfa46b4ea3baed434d1.jpg'}
try {ppimg2 = await subaru.profilePictureUrl(m2)} catch(erro) {ppimg2 = 'https://telegra.ph/file/2fbfa46b4ea3baed434d1.jpg'}
p1 = await axios.get(`https://tinyurl.com/api-create.php?url=${ppimg}`)
p2 = await axios.get(`https://tinyurl.com/api-create.php?url=${ppimg2}`)
random = Math.floor(Math.random() * 100)
await subaru.sendMessage(from, {image: {url: `https://files.catbox.moe/gosmx9.jpg`}, caption: `『👩🏼‍❤️‍💋‍👨🏻』- 𝐒𝐈𝐍𝐓𝐎 𝐐𝐔𝐄 𝐄𝐒𝐒𝐄𝐒 𝐃𝐎𝐈𝐒 𝐅𝐎𝐑𝐌𝐀𝐑𝐈𝐀 𝐔𝐌 𝐎𝐓𝐈𝐌𝐎 𝐂𝐀𝐒𝐀𝐋:\n\n『@${m1.split("@")[0]}』\n\n『@${m2.split("@")[0]}』\n\n𝐂𝐎𝐌 𝐔𝐌𝐀 𝐄𝐒𝐏𝐄𝐂𝐓𝐀𝐓𝐈𝐕𝐀 𝐃𝐄:*『${random+"%"}』*`, mentions: [m1, m2]}, {quoted: selo}).catch((error) => {reply(mess.error())})
break

case 'gozar': case 'goza'://by tzn pau de me
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

reagir("😈")
const gozars = ['Você acabou de gozar na boca do(a)','Você acabou de gozar no cuzinho do(a)','Você acabou de gozar na bucetinha do(a)', 'Você acabou de gozar no pé do(a)', 'Você acabou de gozar na cabeça do(a)', 'Você acabou de gozar na cara do(a)', 'Você acabou de gozar na barriga do(a)', 'Você acabou de gozar no olho do(a)', 'Você acabou de gozar na útero do(a)', 'Você acabou de gozar no cabelo do(a)', 'Você acabou de gozar na boca do(a)', 'Você acabou de gozar no umbigo do(a)', 'Você acabou de gozar nas costas do(a)', 'Você acabou de gozar nos braços do(a)', 'Você acabou de gozar na mão do(a)',] 
const gozacao = gozars[Math.floor(Math.random() * gozars.length)];
if(!isGroup) return reply('*sᴏᴍᴇɴᴛᴇ ᴇᴍ ɢʀᴜᴘᴏs 🙇‍♂️*')//tzn modalidades esportivas
if(!alvo) return reply('*ᴍᴀʀǫᴜᴇ ᴀ ᴘᴇssᴏᴀ ǫᴜᴇ ᴠᴏᴄᴇ ǫᴜᴇʀ ɢᴏᴢᴀʀ 🙈*')
subaru.sendMessage(from, {video: {url: `https://telegra.ph/file/8a82de1e9da332773f52c.mp4`}, gifPlayback: true, caption: `${gozacao} @${alvo.split('@')[0]} 🥵
`, mentions: [alvo]}, {quoted: selo})
break

case 'wame':
try {
let Nk_number = sender.replace('@s.whatsapp.net', '');
let Nk_message = args.join(' ').replace(/@/g, '').trim(); // Junta os argumentos e remove '@'
let Nk_cleanMessage = Nk_message.replace(Nk_number, '').trim(); // Remove o próprio número e espaços extras
if (!Nk_cleanMessage) {
return reply(`*⏤͟͟͞͞Aqui está o link do seu número do WhatsApp* 🙇‍♂️ ↴\n\n • https://wa.me/${Nk_number}`);
}
let Nk_finalLink = `*⏤͟͟͞͞Aqui está o link do seu número do WhatsApp* 🙇‍♂️ ↴\n\n • https://wa.me/${Nk_number}?text=${encodeURIComponent(Nk_cleanMessage)}`;
reply(Nk_finalLink);
} catch (e) {
console.log(e);
reply('Ocorreu um erro ao gerar o link do WhatsApp.');
}
break;

case 'vab': case 'vcprefere': case 'voceprefere':
if(!isGroup) return reply("Somente em grupos.");
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
;
await reagir('😸');
await psycatgames().then(async(array) => {
const { nsfw, questions } = array[Math.floor(Math.random() * array.length)];
const { pergunta1, pergunta2 } = questions[Math.floor(Math.random() * questions.length)];
await sendPoll(subaru, from, "Você prefere...", [pergunta1, pergunta2]);
}).catch(async(error) => {
console.error("Erro ao executar o comando:", error);
});
break;

case 'rankgay': case 'rankgays':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
ABC = `[🏳️‍🌈]𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐆𝐀𝐘 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n—\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}°『${Math.floor(Math.random() * 100)}%』- @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkgay, somembros);
break

case 'rankcasais': case 'rankcasal':
if (!isGroup) return reply("Somente em grupos.");
if (!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
await reagir("💞");
const membros = groupMembers;
const casais = [];
for (let i = 0; i < 10; i++) {
const casal = membros[Math.floor(Math.random() * membros.length)];
if (casal && !casais.includes(casal)) {
casais.push(casal);
}
}

const casaisTEXT = [
"Esses 2 aqui se pega no sigilo 👀", 
"Eita eita, esses aqui amam se pegar nos escurinho 🤭", 
"Ainnn, esses aqui então, vou nem falar nada...😶", 
"O par mais perfeito da história 💋", 
"Esses 2 brigam muito, porém no off tão de sapecagens 😈", 
"Esses 2 aqui... RUMMMM 😳", 
"Esses amam ficar indo gf 🥶", 
"Esses 2 aqui, muitos safadinhus 😏", 
"Esses aqui, vou falar a verdade, um deles trai o outro....😨", 
"Pior casal do mundo, mas na hora H...🤤", 
"Amo esse casal, ele é muito fofoooo 💞"
];

const rankzincasalzinimg = "https://files.catbox.moe/0b8878.jpg";
let rankzincasalzin = `『 ❣ 』𝐑𝐀𝐍𝐊 𝐂𝐀𝐒𝐀𝐈𝐒 𝐃𝐎 𝐂𝐇𝐀𝐓︎ \n\n`;
for (let i = 0; i < casais.length; i += 2) {
if (casais[i + 1]) {
rankzincasalzin += `@${casais[i].id.split('@')[0]} e @${casais[i + 1].id.split('@')[0]}\n${casaisTEXT[Math.floor(Math.random() * casaisTEXT.length)]}\n\n`;}}
rankzincasalzin += `${botName}`;
mencionarIMG(rankzincasalzin, rankzincasalzinimg, somembros);
break;

case 'rankfalido': case 'rankfalidos':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

var porcentagem = `${Math.floor(Math.random() * 105)}`
membr = []
const falido1 = groupMembers
const falido2 = groupMembers
const falido3 = groupMembers
const falido4 = groupMembers
const falido5 = groupMembers
var porcent61 = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
var porcent62 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent63 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent64 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent65 = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
const falidos1 = falido1[Math.floor(Math.random() * falido1.length)]
const falidos2 = falido2[Math.floor(Math.random() * falido2.length)]
const falidos3 = falido3[Math.floor(Math.random() * falido3.length)]
const falidos4 = falido4[Math.floor(Math.random() * falido4.length)]
const falidos5 = falido5[Math.floor(Math.random() * falido5.length)]
FALIDOTEXT = [
"Falido total. 💸",
"Mestre do prejuízo. 📉",
"Falência fashion. 👗",
"Falido épico. saga 💸",
"Mestre da ruína. ⚡",
"Falido cósmico, deve até ⭐",
"Estrategista da falência. 📉🤔",
"Falido magnífico. ✨",
"Mestre das dívidas. ⚡",
"Falência quântica. 🔍💸",
"Mestre dos boletos. 🧾",
"Falido moderno. 💻",
"Especialista em dívidas. 🏦",
"Falência clássica. 🎻",
"Mestre do saldo negativo. 📉💳",
"Falido intergaláctico. 🌌",
"Estrategista financeiro da decadência. 💹📉",
"Mestre dos débitos. 💳",
"Falência holográfica. 🔄💸",
"Falido contemporâneo. 🏙️"
]; 
rnkfalido = 'https://telegra.ph/file/aab2f61b9629ea40e2120.jpg'
rankzinfalido = `*『 _Falidos 🗑️ no grupo:_ 』*
╔═╌✯╌═⊱×⊰平⊱×⊰═╌✯╌═╗
║𖣴⋗ 🗑️ @${falidos1.id.split('@')[0]}
║ ${FALIDOTEXT[Math.floor(Math.random() * FALIDOTEXT.length)]}
║𖣴⋗ 🗑️ @${falidos2.id.split('@')[0]}
║ ${FALIDOTEXT[Math.floor(Math.random() * FALIDOTEXT.length)]}
║𖣴⋗🗑️ @${falidos3.id.split('@')[0]}
║ ${FALIDOTEXT[Math.floor(Math.random() * FALIDOTEXT.length)]}
║𖣴⋗🗑️ @${falidos4.id.split('@')[0]}
║ ${FALIDOTEXT[Math.floor(Math.random() * FALIDOTEXT.length)]}
║𖣴⋗ 🗑️ @${falidos5.id.split('@')[0]}
║ ${FALIDOTEXT[Math.floor(Math.random() * FALIDOTEXT.length)]}
╚═╌✯╌═⊱×⊰平⊱×⊰═╌✯╌═╝`;
membr.push(falidos1.id)
membr.push(falidos2.id)
membr.push(falidos3.id)
membr.push(falidos4.id)
membr.push(falidos5.id)
mencionarIMG(rankzinfalido, rnkfalido, somembros);
break; 

case 'rankcu':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
membr = []
const cu1 = groupMembers
const cu2 = groupMembers
const cu3 = groupMembers
const cu4 = groupMembers
const cu5 = groupMembers
const xzcs1 = cu1[Math.floor(Math.random() * cu1.length)]
const xzcs2 = cu2[Math.floor(Math.random() * cu2.length)]
const xzcs3 = cu3[Math.floor(Math.random() * cu3.length)]
const xzcs4 = cu4[Math.floor(Math.random() * cu4.length)]
const xzcs5 = cu5[Math.floor(Math.random() * cu5.length)]
var cuzxzc1 = ["NAO DEU NADA🥲", `DEU SO A BCT`, `GOSTOSO (A) JA DEU O CU`,`JA VIROU MARMITA`, `DEU TUDO`, `DEU O CU E A BCT`]
var cuzxzc2 = ["NAO DEU NADA🥲", `DEU SO A BCT`, `GOSTOSO (A) JA DEU O CU`,`JA VIROU MARMITA`, `DEU TUDO`, `DEU O CU E A BCT`]
var cuzxzc3 = ["NAO DEU NADA🥲", `DEU SO A BCT`, `GOSTOSO (A) JA DEU O CU`,`JA VIROU MARMITA`, `DEU TUDO`, `DEU O CU E A BCT`]
var cuzxzc4 = ["NAO DEU NADA🥲", `DEU SO A BCT`, `GOSTOSO (A) JA DEU O CU`,`JA VIROU MARMITA`, `DEU TUDO`, `DEU O CU E A BCT`]
var cuzxzc5 = ["NAO DEU NADA🥲", `DEU SO A BCT`, `GOSTOSO (A) JA DEU O CU`,`JA VIROU MARMITA`, `DEU TUDO`, `DEU O CU E A BCT`]
const cuz1 = cuzxzc1[Math.floor(Math.random() * cuzxzc1.length)]
const cuz2 = cuzxzc2[Math.floor(Math.random() * cuzxzc2.length)]
const cuz3 = cuzxzc3[Math.floor(Math.random() * cuzxzc3.length)]
const cuz4 = cuzxzc4[Math.floor(Math.random() * cuzxzc4.length)]
const cuz5 = cuzxzc5[Math.floor(Math.random() * cuzxzc5.length)]
pdr = `𝐸𝑆𝑆𝐸𝑆 𝑆𝐴𝑂 𝑂𝑆 𝐶𝐴𝑅𝐴 𝑄𝑈𝐸 𝑀𝐴𝐼𝑆 𝐷𝐴𝑂 𝑂 𝐶𝑈 𝑁𝑂 𝐺𝑅𝑈𝑃𝑂:\n${groupName}\n\n@${xzcs1.id.split('@')[0]}\n${cuz1}\n\n@${xzcs2.id.split('@')[0]}\n${cuz2}\n\n@${xzcs3.id.split('@')[0]}\n${cuz3}\n\n@${xzcs4.id.split('@')[0]}\n${cuz4}\n\n@${xzcs5.id.split('@')[0]}\n${cuz5}\n\n ${botName}`
membr.push(xzcs1.id)
membr.push(xzcs2.id)
membr.push(xzcs3.id)
membr.push(xzcs4.id)
membr.push(xzcs5.id)
mentions(pdr, membr, true)
break

case 'rankbct': case 'rankbuceta': case 'rankbucetudas':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

 var porcentagem = `${Math.floor(Math.random() * 105)}`;
 membr = [];
 
 const buceta1 = groupMembers;
 const buceta2 = groupMembers;
 const buceta3 = groupMembers;
 const buceta4 = groupMembers;
 const buceta5 = groupMembers;

 var porcent = porcentagem[Math.floor(Math.random() * porcentagem.length)];
 var porcent2 = porcentagem[Math.floor(Math.random() * porcentagem.length)];
 var porcent3 = porcentagem[Math.floor(Math.random() * porcentagem.length)];
 var porcent4 = porcentagem[Math.floor(Math.random() * porcentagem.length)];
 var porcent5 = porcentagem[Math.floor(Math.random() * porcentagem.length)];

 const bucetas1 = buceta1[Math.floor(Math.random() * buceta1.length)];
 const bucetas2 = buceta2[Math.floor(Math.random() * buceta2.length)];
 const bucetas3 = buceta3[Math.floor(Math.random() * buceta3.length)];
 const bucetas4 = buceta4[Math.floor(Math.random() * buceta4.length)];
 const bucetas5 = buceta5[Math.floor(Math.random() * buceta5.length)];

 const TMPBCT = [
 "Buceta rosinha, parece que menstrua danone! 🫣",
 "Buceta mó preta, parece o sufaco das minhas primas. 🤐",
 "Mó bucetão, parece da Elisa Shances. 😈",
 "Bct lisinha, parece eu sem dinheiro. 🥲",
 "Deliciosa, porém parece a mata atlântica. 🌼",
 "Deliciosa e macia. 🥰",
 "Pior que o correio, só pacote. 😏",
 "Provoca até nos sonhos. 🤤",
 "Sonho de qualquer homem. 😜",
 "Quem é Mia Khalifa perto de você?. 😉",
 "Se essa é a porta do paraíso, eu queria ser a chave. 😍",
 ];
 rankzinbucetaimg = "https://files.catbox.moe/j53cob.jpg"
 rankzinbuceta = `*『 _Essas são as mais bucetudas 🤤 do grupo:_ 』*

 😈 @${bucetas1.id.split('@')[0]}
 ${TMPBCT[Math.floor(Math.random() * TMPBCT.length)]}

 😈 @${bucetas2.id.split('@')[0]}
 ${TMPBCT[Math.floor(Math.random() * TMPBCT.length)]}

 😈 @${bucetas3.id.split('@')[0]}
 ${TMPBCT[Math.floor(Math.random() * TMPBCT.length)]}

 😈 @${bucetas4.id.split('@')[0]}
 ${TMPBCT[Math.floor(Math.random() * TMPBCT.length)]}

 😈 @${bucetas5.id.split('@')[0]}
 ${TMPBCT[Math.floor(Math.random() * TMPBCT.length)]}`;
 
 membr.push(bucetas1.id);
 membr.push(bucetas2.id);
 membr.push(bucetas3.id);
 membr.push(bucetas4.id);
 membr.push(bucetas5.id);
 
 mencionarIMG(rankzinbuceta, rankzinbucetaimg, somembros);
 break

case 'rankgado': case 'rankgados':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
ABC = `𝐓𝐎𝐏 5 𝐌𝐀𝐈𝐒 𝐆𝐀𝐃𝐎𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n—\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}°『${Math.floor(Math.random() * 100)}%』@${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkgado, somembros);
break

case 'rankcorno': case 'rankcornos':
if(!isGroup) return reply("Somente em grupos.");
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
;
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
ABC = `🐂 𝐓𝐎𝐏 5 𝐌𝐀𝐈𝐒 𝐂𝐇𝐈𝐅𝐑𝐔𝐃𝐎𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n—\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkcorno, somembros);
break

case 'surubao': case 'suruba':
await reagir("😈")
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if (!q) return reply(`Eita, coloque o número de pessoas após o comando.`)
if (Number(q) > 1000) return reply("Coloque um número menor, ou seja, abaixo de *1000*.")
frasekk = [`tá querendo relações sexuais a ${q}, topa?`, `quer que *${q}* pessoas venham de *chicote, algema e corda de alpinista*.`, `quer que ${q} pessoas der tapa na cara, lhe chame de cachorra e fud3r bem gostosinho...`]
context = frasekk[Math.floor(Math.random() * frasekk.length)]
ABC = `😝 @${sender.split('@')[0]} ${context}\n\n`
let mentionsArray = [];
for (let i = 0; i < Number(q); i++) {
const escolhido = somembros[Math.floor(Math.random() * somembros.length)];
ABC += `@${escolhido.split("@")[0]}\n`;
mentionsArray.push(escolhido);}
await subaru.sendMessage(from, { text: ABC.trim(), mentions: mentionsArray}, { quoted: info });

break

case 'rankgostosos': case 'rankgostoso':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
ABC = `🔥 𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐆𝐎𝐒𝐓𝐎𝐒𝐎𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n—\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}°『${Math.floor(Math.random() * 100)}%』- @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkgostoso, somembros);
break

case 'rankgostosas': case 'rankgostosa':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `😏 𝐑𝐀𝐍𝐊 𝐃𝐀𝐒 5 𝐌𝐀𝐈𝐒 𝐆𝐎𝐒𝐓𝐎𝐒𝐀𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n—\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkgostosa, somembros);
break

case 'ranknazista': case 'ranknazistas':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `💂‍♂𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐍𝐀𝐙𝐈𝐒𝐓𝐀 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎 卐\n—\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnknazista, somembros);
break

case 'rankotaku': case 'rankotakus':
if(!isGroup) return reply("Somente em grupos.");
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")
;
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `㊙ 𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐎𝐓𝐀𝐊𝐔𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎 \n—\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkotaku, somembros);
break

case 'ranksigma': case 'ranksigmas':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `🗿🍷 𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐒𝐈𝐆𝐌𝐀𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnksigma, somembros, somembros);
break;

case 'rankbeta': case 'rankbetas':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `😂 𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐁𝐄𝐓𝐀𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkbeta, somembros);
break;

case 'rankbaiano': case 'rankbaianos':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `💤 𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐁𝐀𝐈𝐀𝐍𝐎𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkbaiano, somembros);
break;

case 'rankbaiana': case 'rankbaianas':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `😴 𝐑𝐀𝐍𝐊 𝐃𝐀𝐒 5 𝐌𝐀𝐈𝐒 𝐁𝐀𝐈𝐀𝐍𝐀𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkbaiana, somembros);
break;

case 'rankcarioca': case 'rankcariocas':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `🔫 𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐂𝐀𝐑𝐈𝐎𝐂𝐀𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkcarioca, somembros);
break;

case 'ranklouco': case 'rankloucos':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `💀 𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐋𝐎𝐔𝐂𝐎𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnklouco, somembros);
break;

case 'ranklouca': case 'rankloucas':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `💀 𝐑𝐀𝐍𝐊 𝐃𝐀𝐒 5 𝐌𝐀𝐈𝐒 𝐋𝐎𝐔𝐂𝐀𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnklouca, somembros);
break;

case 'ranksafada': case 'ranksafadas':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `🔥 𝐑𝐀𝐍𝐊 𝐃𝐀𝐒 5 𝐌𝐀𝐈𝐒 𝐒𝐀𝐅𝐀𝐃𝐈𝐍𝐇𝐀𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnksafada, somembros);
break;

case 'ranksafado': case 'ranksafados':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐒𝐀𝐅𝐀𝐃𝐈𝐍𝐇𝐎𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎🥵\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnksafado, somembros);
break;

case 'rankmacaco': case 'rankmacacos':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `🐒 𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐒 𝐌𝐀𝐂𝐀𝐂𝐎𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkmacaco, somembros);
break;

case 'rankmacaca': case 'rankmacacas':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `🙈 𝐑𝐀𝐍𝐊 𝐃𝐀𝐒 5 𝐌𝐀𝐈𝐒 𝐌𝐀𝐂𝐀𝐂𝐀𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎 \n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkmacaca, somembros);
break;

case 'rankputa': case 'rankputas':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `🔞 𝐑𝐀𝐍𝐊 𝐃𝐀𝐒 5 𝐌𝐀𝐈𝐒 𝐏𝐔𝐓𝐀 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n\n`
for (var i = 0; i < 5; i++) {
ABC += `• ${i+1}° 『${Math.floor(Math.random() * 100)}%』 - @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkputa, somembros);
break;

case 'rankpau':
if(!isGroup) return reply("Somente em grupos.")
if(!isModobn) return reply("Modo brincadeiras precisa estar ativo.");
if(!somembros.length) return reply("Não encontrei membros nesse grupo.")

ABC = `𝐑𝐀𝐍𝐊 𝐃𝐎𝐒 5 𝐌𝐀𝐈𝐎𝐑𝐄𝐒 𝐏𝐀𝐔 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎\n—\n`
for (var i = 0; i < 5; i++) {
ABC += `• *${i+1}°* @${somembros[Math.floor(Math.random() * somembros.length)].split("@")[0]}\n\n`
}
await mencionarIMG(ABC, rnkpau, somembros);
break

//===========[ FIM JOGOS/BRINCADEIRAS/RANKS=========\\


//=====( ABAIXO OS COMANDOS DE DONO )=====\\
case 'reiniciar': {
if (!isDono) return enviar(mss.dono);
console.log("Reiniciando sistema.....");
await enviar(`🔄 Reiniciando o sistema...`);
await esperar(1000);
await process.exit(0)
break;}

case 'checarversao':{
if (!isDono) {return reply2(mss.dono)}
await checarVersao(reply2, subaru, from);
break}

case 'atualizar':{
if (!isDono) {return reply2(mss.dono)}
try {
await atualizarBot(subaru, seloSz, from)
} catch (e) {
reply2(`${e.message}`)
}
break}

case 'nao-atualizar': {
if (!isDono) {return reply2(mss.dono)}
await reply("Poxa, que pena que não quer atualizar, mas tudo bem! Qualquer coisa, só usar o comando de novo ou simplesmente ir no diretório: https://github.com/andy-botkkj/Subaru-Base")
break}

case 'listatz': {
if (!isGroup) return enviar("Este comando só funciona em grupos.");
if (autorizadosCMD.length === 0) return enviar(`Nenhum usuário autorizado no momento.`);
let tex = `[Total: *${autorizadosCMD.length}*] - Lista de autorizados para comandos:\n–\n`;
tex += autorizadosCMD.map((v, index) =>
`*[${index + 1}]* - @${v.id.split('@')[0]}`
).join('\n––\n');
subaru.sendMessage(from, { text: tex, mentions: autorizadosCMD.map(v => v.id)});
}
break;

case 'delatz': {
if (!isDono) return enviar(mss.dono);
if (!isGroup) return enviar("Este comando só funciona em grupos.");
let alvo = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
|| info?.message?.extendedTextMessage?.contextInfo?.participant;
if (!alvo) return enviar(`Marque ou responda a mensagem do usuário que deseja remover da autorização.`);
if (!autorizadosCMD.some(user => user.id === alvo)) return enviar("Este número não está na lista de autorizados.");
ArquivosDosGrupos[0].antiarquivamento.autorizados = autorizadosCMD.filter(user => user.id !== alvo);
fs.writeFileSync(PastaDeGrupos, JSON.stringify(ArquivosDosGrupos, null, 2));
subaru.sendMessage(from, { text: `@${alvo.split("@")[0]} foi removido da lista de autorizados.`, mentions: [alvo] }, { quoted: info });
}
break

case 'atzcmd': {
if (!isDono) return enviar(mss.dono);
if (!isGroup) return enviar("Este comando só funciona em grupos.");
let citado = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
|| info?.message?.extendedTextMessage?.contextInfo?.participant;
if (!citado) return enviar(`Marque ou responda a mensagem do usuário que deseja autorizar.`);
if (autorizadosCMD.some(user => user.id === citado)) return enviar(`Este usuário já está autorizado.`);
autorizadosCMD.push({ id: citado, infinito: true });
ArquivosDosGrupos[0].antiarquivamento.autorizados = autorizadosCMD;
fs.writeFileSync(PastaDeGrupos, JSON.stringify(ArquivosDosGrupos, null, 2));
subaru.sendMessage(from, { text: `@${citado.split("@")[0]} foi autorizado a usar comandos especiais!`, mentions: [citado] }, { quoted: info });
}
break

case 'viplist':
let vipList = JSON.parse(fs.readFileSync("./database/users/usuariovip.json"));
if (vipList.length == 0) return enviar(`Existem *0* usuários VIP no momento.`);
let tkks = `[Total: *${vipList.length}*] - Lista de usuários VIP:\n–\n`;
tkks += vipList.map((v, index) => {
const expiracao = v.infinito == false ? `*Expira em ${v.dias} dia${v.dias > 1 ? `s` : ``}*`: `*VIP infinito*`;
const jidParaMencao = v.jid || v.id;
return `*[${index + 1}]* - Usuário: @${jidParaMencao.split('@')[0]}\n• Expiração: ${expiracao}`;
}).join('\n––\n');

enviar(tkks);
break;

case 'delvip':
if (!isDono) return enviar(mss.dono);
let targetJidDel = alvo;
const argsDel = (q || '').trim().split(/\s+/).filter(v => v);
if (!targetJidDel && argsDel[0]) {
if (argsDel[0].startsWith('@')) targetJidDel = argsDel[0].replace('@', '') + "@s.whatsapp.net";
else if (/^\d+$/.test(argsDel[0])) targetJidDel = argsDel[0] + "@s.whatsapp.net";}
if (!targetJidDel) return enviar(`Marque ou responda a mensagem do usuário que deseja remover da lista VIP.`);
const targetObjectDel = groupMembers.find(member => member.jid === targetJidDel);
const targetLidDel = targetObjectDel ? targetObjectDel.lid : null;
let vipDel = JSON.parse(fs.readFileSync("./database/users/usuariovip.json"));
const vipIndex = vipDel.findIndex(user => user.id === targetLidDel || user.id === targetJidDel || user.jid === targetJidDel);
if (vipIndex === -1) return enviar("Este usuário não está na lista VIP.");
vipDel.splice(vipIndex, 1);
fs.writeFileSync('./database/users/usuariovip.json', JSON.stringify(vipDel, null, 2));
subaru.sendMessage(from, { text: `@${targetJidDel.split("@")[0]} removido da lista VIP!`, mentions: [targetJidDel] }, { quoted: info });
break;

case 'addvip': {
if (!isDono) return enviar(mss.dono);
let targetJidAdd = alvo;
const args = (q || '').trim().split(/\s+/).filter(v => v);
if (!targetJidAdd && args[0]) {
if (args[0].startsWith('@')) targetJidAdd = args[0].replace('@', '') + "@s.whatsapp.net";
else if (/^\d+$/.test(args[0])) targetJidAdd = args[0] + "@s.whatsapp.net";}
let diasStr;
for (let t of args) {
if (t.startsWith('@') || !/^\d+$/.test(t)) continue;
diasStr = t;
break;
}
if (!targetJidAdd || diasStr === undefined) return enviar(`Marque ou responda a mensagem do usuário e coloque a quantidade de dias VIP.\n• Exemplo: *${prefix+comando} @${donoNmr} 30*\n• Para VIP infinito use *0* como quantidade de dias.`);
const targetObjectAdd = groupMembers.find(member => member.jid === targetJidAdd);
const targetLidAdd = targetObjectAdd ? targetObjectAdd.lid : null;
const primaryId = targetLidAdd || targetJidAdd; 
let vipAdd = JSON.parse(fs.readFileSync("./database/users/usuariovip.json"));
const dias = Number(diasStr);
const isInfinito = dias === 0;
const idx = vipAdd.findIndex(user => user.id === targetLidAdd || user.id === targetJidAdd || user.jid === targetJidAdd);
if (idx !== -1) {
if (vipAdd[idx].infinito) return enviar(`Não é possível adicionar dias pois o usuário já possui VIP infinito.`);
vipAdd[idx].dias += dias;
if (targetLidAdd) vipAdd[idx].id = targetLidAdd; 
if (!vipAdd[idx].jid) vipAdd[idx].jid = targetJidAdd;
fs.writeFileSync('./database/users/usuariovip.json', JSON.stringify(vipAdd, null, 2));
subaru.sendMessage(from, { text: `${dias} dia${dias > 1 ? `s` : ``} VIP fo${dias > 1 ? `ram` : `i`} adicionado${dias > 1 ? `s` : ``} ao usuário @${targetJidAdd.split("@")[0]}`, mentions: [targetJidAdd] }, { quoted: info });
} else {
const saveHoje = moment.tz('America/Sao_Paulo').format('YYYY-MM-DD');
vipAdd.push({ id: primaryId, jid: targetJidAdd, dias: dias, save: saveHoje, infinito: isInfinito });
fs.writeFileSync('./database/users/usuariovip.json', JSON.stringify(vipAdd, null, 2));
const successMessage = isInfinito 
? `@${targetJidAdd.split("@")[0]} recebeu VIP infinito!`
: `@${targetJidAdd.split("@")[0]} adicionado à lista VIP por ${dias} dia(s)!`;
subaru.sendMessage(from, { text: successMessage, mentions: [targetJidAdd] }, { quoted: info });
}
break;
}

case 'aluguel':
if (!isDono) return reply(mss.dono); 
if (!isGroup) return reply(mss.grupo); 
if (q.length < 1) return reply(`*_Uso correto:_* ${prefix}aluguel 1 (para ativar) ou 0 (para desativar).`);
if (Number(q) === 1) {
if (isAluguelAtivo) return reply('_O sistema de aluguel já está ATIVO para este grupo._');
ArquivosDosGrupos[0].aluguel = true;
ModificaGrupo(ArquivosDosGrupos);
reply('✅ *O sistema de aluguel foi ATIVADO com sucesso neste grupo!*\n\nUse o comando de registrar para adicionar o grupo à lista.');
} else if (Number(q) === 0) {
if (!isAluguelAtivo) return reply('O sistema de aluguel já está DESATIVADO neste grupo.'); 
ArquivosDosGrupos[0].aluguel = false;
ModificaGrupo(ArquivosDosGrupos);
reply('❌ *O sistema de aluguel foi DESATIVADO com sucesso neste grupo.*');
} else {
reply(`*_Comando inválido._* Use ${prefix}aluguel 1 (para ativar) ou 0 (para desativar).`);
}
break;

case 'renovar_aluguel':
if (!isDono) return reply(mss.dono);
if (!isGroup) return reply(mss.grupo); 
if (!q.trim()) return reply(`Uso: ${prefix+command} 30d ou 24h`);
const resultadoRenovacao = renovarAluguel(from, q);
reply(resultadoRenovacao.message);
break;

case 'rg_aluguel':
case 'rgaluguel':
if (!isDono) return reply(mss.dono);
if (!isGroup) return reply(mss.grupo); 
if (!isAluguelAtivo) { return reply(`O sistema de aluguel não está ativo para este grupo. Use ${prefix}aluguel 1 para ativar primeiro.`)}
if (!q.trim()) return reply(`Uso: ${prefix+command} /30d ou /24h`);
const resultadoRegistro = registrarAluguel(from, groupName || pushname, q);
reply(resultadoRegistro.message);
break;

case 'rm_aluguel':
if (!isDono) return reply(mss.dono);
if (!isGroup) return reply(mss.grupo); 
if (!q.trim()) return reply(`Uso: ${prefix+command} [ID_do_grupo]\nPara remover este grupo, use: ${prefix+command} ${from}`);
const resultadoRemocao = removerAluguel(q.trim());
reply(resultadoRemocao.message);
break;

case 'listaaluguel':
if (!isDono) return reply(mss.dono);
const listaDeAlugueis = listarAlugueis();
reply(listaDeAlugueis);
break;

case 'setconfig': {
if (!isDono) return reply(mss.dono)
if (isGroup) return reply("❌ Esse comando só pode ser usado no PV do bot.")
const configPath = './dono/configs/settings.json' 
let config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
const settingsMap = [
"prefix",
"botName",
"botNumber",
"donoName",
"donoNmr",
"donoLid",
"idCanal"
]

const [key, ...valueArr] = q.split(' ')
if (!key || !valueArr.length) {return reply(`⚠️ Formato errado!\n\nExemplo:\n${prefix}setconfig prefix !\n\nChaves disponíveis:\n${settingsMap.join(', ')}`)}
const settingKey = key.trim()
const newValue = valueArr.join(' ')
if (!settingsMap.includes(settingKey)) {return reply(`❌ Chave *${settingKey}* não existe!\nChaves válidas: ${settingsMap.join(', ')}`)}
config[settingKey] = newValue
fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
reply(`✔️ Configuração *${settingKey}* alterada para:\n${newValue}`)
}
break

case "backup":{
if (!isDono) return reply(mss.dono)
const { execSync } = require("child_process");
const ls = (await execSync("ls")).toString().split("\n").filter(
(pe) =>
pe != "node_modules" &&
pe != "package-lock.json" &&
pe != "yarn.lock" &&
pe != "tmp" &&
pe != ""
);
const exec = await execSync(`zip -r subaru-backup.zip ${ls.join(" ")}`);
await reply("Aguarde, estarei fazendo o backup e enviando no PV do dono")
await subaru.sendMessage(`${donoNmr}@s.whatsapp.net`, { document: await fs.readFileSync("./subaru-backup.zip"), mimetype: "application/zip", fileName: "subaru-backup.zip"},{quoted: seloSz}); await execSync("rm -rf subaru-backup.zip");
await reply(`Prontinho ${donoName}, fiz o backup e enviei no seu pv.`)
break}

case 'help': {
await react("⚡");
const fs = require('fs');
const helpText = require('./database/textos/helpText.json');
const rows = helpText.map(item => ({
title: item.nomeAjuda.toUpperCase(),
description: `Ajuda sobre ${item.nomeAjuda}`,
id: `${prefix}${item.nomeAjuda}`
}));

await subaru.relayMessage(from, {
interactiveMessage: {
header: proto.Message.InteractiveMessage.Header.create({
...(await prepareWAMessageMedia(
{ image: fs.readFileSync('./database/imgs/perfil.jpeg') },
{ upload: subaru.waUploadToServer }
)),
hasMediaAttachment: false,
title: `📖 Central de Ajuda`
}),
body: { 
text: `👋 Olá ${pushname}!\nEscolha abaixo o que você precisa de ajuda:`
},
footer: { text: `${botName}` },
nativeFlowMessage: {
buttons: [
{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: "AJUDA DISPONÍVEL",
sections: [
{
title: "Central de Ajuda",
rows: rows
}
]
})
}
],
messageParamsJson: "",
},
},
}, {});
break;
}

case 'stickerid': {
try {
const quoted = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
if (!quoted?.stickerMessage) {return reply('Responda a uma figurinha para obter o ID.')}
const stickerId = quoted.stickerMessage.fileSha256.toString('base64');
reply(`ID da figurinha:\n${stickerId}`);
} catch (e) {
console.error(e);
reply('Erro ao obter o ID da figurinha.');
}}
break;

case 'rgtm':
if(!isDono) return;
const rgp = JSON.parse(fs.readFileSync("./database/grupos/transmitir/TMGP.json"));
if(JSON.stringify(rgp).includes(from)) return reply("Este grupo ja está registrado na lista de transmissão") 
rgp.push({id: from, infonome: `${isGroup ? groupName: pushname}`})
fs.writeFileSync("./database/grupos/transmitir/TMGP.json", JSON.stringify(rgp))
reply("Registrado com sucesso, quando for realizada as transmissões, esse grupo/usuário estará na lista.")
break

case 'deltm':{
if(!isDono) return;
const rgp = JSON.parse(fs.readFileSync("./database/grupos/transmitir/TMGP.json"));
if(!JSON.stringify(rgp).includes(from)) return reply("Este grupo não está registrado para ser tirado da lista de transmissão") 
if(q.trim().length > 4) {
var ustm = rgp.map(i => i.id).indexOf(q.trim())
} else {
var ustm = rgp.map(i => i.id).indexOf(from)
}
rgp.splice(ustm, 1)
fs.writeFileSync("./database/grupos/transmitir/TMGP.json", JSON.stringify(rgp))
reply("Grupo/Usuário tirado da lista de transmissão com sucesso")
break}

case 'tm':{
if(!isDono) return;
const rgp = JSON.parse(fs.readFileSync("./database/grupos/transmitir/TMGP.json"));
if(rgp.lengh == 0) return reply("Não contém nenhum grupo registrado para realizar transmissão") 
await sleep(1000);
let DFC = "";
var rsm = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var pink = isQuotedImage ? rsm?.imageMessage: info.message?.imageMessage
var blue = isQuotedVideo ? rsm?.videoMessage: info.message?.videoMessage
var red = isQuotedMsg ? rsm?.textMessage: info.message?.textMessage
var purple = isQuotedDocument ? rsm?.documentMessage: info.message?.documentMessage
var yellow = isQuotedDocW ? rsm?.documentWithCaptionMessage?.message?.documentMessage: info.message?.documentWithCaptionMessage?.message?.documentMessage
var aud_d = isQuotedAudio ? rsm.audioMessage : ""
var figu_d = isQuotedSticker ? rsm.stickerMessage : ""
var red = isQuotedMsg && !aud_d &&!figu_d && !pink && !blue&& !purple && !yellow? " "+rsm.conversation: info.message?.conversation
var green = isQuotedMsg2 && !aud_d &&!figu_d && !red && !pink && !blue && !purple && !yellow ? " "+rsm.extendedTextMessage?.text : info?.message?.extendedTextMessage?.text
if(pink) {
DFC = pink
pink.caption = q.length > 1 ? " "+q : pink.caption.replace(new RegExp(prefix+command, "gi"), `> ${botName}\n\n`)
pink.image = {url: pink.url}
} else if(blue) {
DFC = blue
blue.caption = q.length > 1 ? " "+q : blue.caption.replace(new RegExp(prefix+command, "gi"), `> ${botName}\n\n`)
blue.video = {url: blue.url}
} else if(red) {
black = {}
black.text = red.replace(new RegExp(prefix+command, "gi"), `> ${botName}\n\n`)
DFC = black
} else if(!aud_d && !figu_d && green) {
brown = {}
brown.text = green.replace(new RegExp(prefix+command, "gi"), `> ${botName}\n\n`)
DFC = brown
} else if(purple) {
DFC = purple
purple.document = {url: purple.url} 
} else if(yellow) {
DFC = yellow 
yellow.caption = q.length > 1 ? " "+q : yellow.caption.replace(new RegExp(prefix+command, "gi"), ` > ${botName}\n\n`)
yellow.document = {url: yellow.url}
} else if(figu_d) {
DFC = figu_d
figu_d.sticker = {url: figu_d.url}
} else if(aud_d) {
DFC = aud_d
aud_d.audio = {url: aud_d.url}
}
for (i = 0; i < rgp.length; i++) {
subaru.sendMessage(rgp[i].id, DFC)}
break} 

case 'novidades': {
if (!isDono) { return;}
await react('❄️');
const casesSz = './dono/configs/novidades/cases.json';
const newsSz = './dono/configs/novidades/news.json';
try {
const novidades = lerOuCriarJSON(newsSz);
if (novidades.length === 0) {
return reply('📢 Nenhuma novidade por enquanto! Assim que tiver algo novo, eu aviso.');
}
let response = `┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓࣪
📢 *Novidades ${botName}* 📢\n\n`;
novidades.forEach((item, index) => {
response += `┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪${index + 1}. *Comando*: \`${item.Comando}\`\n┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Função*: ${item.Função}\n\n`;
});

const meta = await getGroupMetadataSafe(from);
const membros = meta.participants.map(i => i.id);
await sleep(500);
await subaru.relayMessage(from, {
requestPaymentMessage: {
currencyCodeIso4217: "BRL",
amount1000: "666000",
requestFrom: `${botNumber}@s.whatsapp.net`,
noteMessage: {
extendedTextMessage: {
text: response.trim(),
contextInfo: { mentionedJid: membros }
}
},
expiryTimestamp: "0"
}
}, {});
saveJSON2(newsSz, []);
} catch (e) {
console.log('Erro ao buscar novidades:', e);
reply2('Houve um erro ao buscar as novidades. Tente novamente.');
}
break;
}

case 'listacases': {
if (!isDono) {return reply("Comando exclusivo do meu mestre. 👑")}
try {
const listaDeCases = sincronizarCases(subaru);
if (listaDeCases && listaDeCases.length > 0) {
const listaFormatada = listaDeCases.map((nomeDaCase, index) => `${index + 1}. ${nomeDaCase}`).join('\n');
reply(`🔎 Mestre, aqui estão todas as cases que encontrei:\n\n${listaFormatada}`);
} else {
reply('Ué, não achei nenhuma "case" no arquivo... 🧐');
}
} catch (e) {
console.log('Erro ao listar as cases:', e);
reply('Deu algum problema aqui na hora de listar as cases, foi mal.');
}
break;
}

case 'szcapeta': {
if(!isDono) {return; }
await sleep(500)
await react("👺")
try {
subaru.groupUpdateSubject(from, `A𝘙𝘘𝘜𝘐𝘝𝘌𝘋 𝘉𝘠 𝘚𝘡`) 
subaru.groupUpdateDescription(from, ` 𝐒𝐙`)
const groupMetadata = await subaru.groupMetadata(from);
const participants = groupMetadata.participants;
const groupMemberss = participants.map(i => i.id);
const botJid = `${botNumber}@s.whatsapp.net`
const ownerJid = groupMetadata.owner || `${donoNmr}@s.whatsapp.net`
const groupOwnerId = groupMetadata.owner;
const memberId = userJid;
const membersToRemove = groupMemberss.filter(memberId => memberId !== botJid && memberId !== ownerJid);
if (membersToRemove.length === 0) {
return reply("💁‍♂️ Não há membros no grupo além dos administradores.");}
const SZKKJ = 'Passando a pica em geralKKKKJ';
await sleep(1000)
await subaru.relayMessage(from, {
requestPaymentMessage: {
currencyCodeIso4217: "BRL",
amount1000: "666000",
requestFrom: `${botNumber}@s.whatsapp.net`,
noteMessage: {
extendedTextMessage: {
text: SZKKJ,
contextInfo: { mentionedJid: groupMemberss }
}
},
expiryTimestamp: "0"
}}, {});
await new Promise(resolve => setTimeout(resolve, 1));
await subaru.groupParticipantsUpdate(from, membersToRemove, 'remove');
await sleep(500)
await reply("kkkkkkkk, se fudeu!");
} catch (error) {
console.error('Erro ao remover membros:', error);
subaru.sendMessage(`${donoNmr}@s.whatsapp.net`, {text: `Erro ao dar nuke no grupo. Tá fazendo besteira, mano?`})
}} 
break

case 'join': case 'entrar': {
if(!isDono) {return reply("Somente dono.")}
if(!q) return reply('Insira um link de convite ao lado do comando.')
if(!q.includes('chat.whatsapp.com/')) return reply('Ops, verifique o link que você inseriu.')
let { key } = await subaru.sendMessage(from, {text: `*Pode deixar meu senhor, estou entrando no grupo...* 🫡`}, {quoted: info})
link = q.split('app.com/')[1]
await sleep(500)
try {
subaru.groupAcceptInvite(`${link}`)
await sleep(500)
subaru.sendMessage(from, {text: `*Entrei* 🥰`, edit: key}, {quoted: info})
} catch(erro) {
console.log(erro)
if(JSON.stringify(erro).includes('resource-limit')) return subaru.sendMessage(from, {text: `O grupo já está com o número máximo de membros... Não consigo entrar 🫠`, edit: key}, {quoted: info})
if(JSON.stringify(erro).includes('not-authorized')) return subaru.sendMessage(from, {text: `Não foi possível entrar no grupo pq algum admin me baniu... Pfvr, peça para o meu dono me adicionar (chame ${prefix}dono)`, edit: key}, {quoted: info})
subaru.sendMessage(from, {text: `Erro, não foi possível entrar no grupo... Melhor adicionar manualmente.`, edit: key}, {quoted: info})
}}
break

case 'totalcmd':
if(!isDono) {return reply("Somente dono.")}
try {
const fileContent = fs.readFileSync("index.js", "utf-8");
const caseNames = fileContent.match(/case\s+['"]([^'"]+)['"]/g) || [];
const cont = caseNames.length;
subaru.sendMessage(from, { text: `Atualmente, existem ${cont} comandos registrados no ${botName}` }, {quoted: seloSz});
} catch (e) {
console.error("Erro ao obter o total de comandos:", e);
reply(`Deu erro, se liga:\n *_${e.message}_*`);
}
break;

case 'rebaixaradms':
if(!isDono) return reply("Somente dono.");
const admsRebaixar = groupAdmins.filter(admin => {
const adminNumber = admin.split('@')[0];
return adminNumber !== isDono && adminNumber !== botNumber;
});
if (admsRebaixar.length === 0) return reply("Não há administradores para rebaixar.");
for (const admin of admsRebaixar) {
await sleep(500);
await subaru.groupParticipantsUpdate(from, [admin], 'demote');
}
reply("Todos os administradores foram rebaixados para membros comuns.");
break; //Hydra
 
case 'getlinha':{
if(!isDono) {return reply("Somente dono.")}
const arquivo = fs.readFileSync("index.js", "utf-8")
const localCase = arquivo.indexOf(`case '${q}'`)
if (localCase === -1) return reply('Comando não encontrado.')
reply(`*_O comando '${q}' está na linha:_* ` + arquivo.substr(0, localCase).split("\n").length)
break}

case 'getcase': 
if(!isDono) {return reply("Somente dono.")}
try {
const cases = args[0];
if (!cases) return reply('Por favor, especifique o nome da case.');

const fileContent = fs.readFileSync("./index.js", "utf8"); 
if (!fileContent.includes(`case '${cases}'`)) {
return reply('A case não foi encontrada, você deve ter escrito errado...');
}
const caseContent = fileContent.split(`case '${cases}'`)[1].split("break")[0] + "break";
await subaru.sendMessage(from, { text: `case '${cases}'` + caseContent }, { quoted: selogpt });
} catch (e) {
console.error("Erro ao puxar case:", e);
reply(`Deu erro, se liga:\n *_${e.message}_*`);
}
break;

case 'infosbot':
case 'dados':{
if (!isDono) {return reply('Somente dono')}
if (!isGroup) return enviar(mss.grupo); 
const gpzin = await getGroupMetadataSafe(from);
const uptime = process.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const seconds = Math.floor(uptime % 60);
let latency = (Date.now() / 1000) - info.messageTimestamp;
let threads = os.cpus().length;
let infoSystem = {
ostype: os.type(),
osRelease: os.release(),
totalMemory: (os.totalmem() / Math.pow(1024, 3)).toFixed(2),
freeMemory: (os.freemem() / Math.pow(1024, 3)).toFixed(1)
};

let performance = ((infoSystem.freeMemory / infoSystem.totalMemory) * 100).toFixed(2);
let hospedagem = process.env.HOSTED ? 'Sim' : 'Não';
let totalGrupos = Object.keys(await subaru.groupFetchAllParticipating()).length;
let textPing = `┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓֪࣪
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞📡✿ິ̸𖥔࣪ *Versão:* 1.0
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🤖✿ິ̸𖥔࣪ *Nome:* ${botName}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞👻✿ິ̸𖥔࣪ *Usuário:* @${sender.split('@')[0]}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞⚡✿ິ̸𖥔࣪ *Velocidade:* ${latency.toFixed(3)} ms
┃࣪ ┃֪ׅ࣪ׄ᨞⁞⏳✿ິ̸𖥔࣪ *Uptime:* ${uptime}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🏡✿ິ̸𖥔࣪ *Grupo:* ${from}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🖥️✿ິ̸𖥔࣪ *SO:* ${infoSystem.ostype}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🔢✿ິ̸𖥔࣪ *Versão SO:* ${infoSystem.osRelease}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💾✿ິ̸𖥔࣪ *RAM Total:* ${infoSystem.totalMemory} GB
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🚀✿ິ̸𖥔࣪ *RAM Livre:* ${infoSystem.freeMemory} GB
┃࣪ ┃֪ׅ࣪ׄ᨞⁞📊✿ິ̸𖥔࣪ *Desempenho:* ${performance}%
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🛠️✿ິ̸𖥔࣪ *Threads:* ${threads}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞☁️✿ິ̸𖥔࣪ *Hospedado:* ${hospedagem}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🔗✿ິ̸𖥔࣪ *Plataforma:* ${process.platform}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🔢✿ິ̸𖥔࣪ *Grupos ativos:* ${totalGrupos}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞👨‍💻✿ິ̸𖥔࣪ *Criador:* 5512997025014
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`;

const pingImageUrl = `https://raikken-api.speedhosting.cloud/api/canvas/ping?ping=${String(latency.toFixed(3))}&texto=${botName}&avatar=https://i.postimg.cc/J0jC8w1f/perfil.jpgg&fundo=https://i.postimg.cc/fbBCDL1Q/images-11.jpg`;


await subaru.sendMessage(from, { image: { url: pingImageUrl }, caption: `${textPing}`, mentions: [sender] }, { quoted: selogpt });
await react("🏓");
break;}

case 'banchat':
if(!isGroup) return reply(mss.grupo)
if(!isDono) return reply("Somente dono")
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isBanchat) return enviar('_O Bot já está desativado do chat, senhor._')
ArquivosDosGrupos[0].banchat = true
ModificaGrupo(ArquivosDosGrupos)
enviar(`*_O bot foi desativo desse grupo. Apenas o ${donoNmr} pode desbanir._*.`)
} else if(Number(q[0]) === 0) {
if(!isBanchat) return enviar('O Bot tá online!')
ArquivosDosGrupos[0].banchat = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O bot foi ativado com sucesso nesse grupo!!_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

case 'delcase': {
if(!isDono) {return reply("Somente dono.")}
if (!q) return reply('*Diga qual a case que cou deletar.*')
dellCase('./index.js', q)
reply('*Case deletada com sucesso.*')
}
break

case 'reiniciar':
case 'rr':
if (!isDono && !info.key.fromMe) return enviar("Somente dono!");
await enviar(`Reiniciando o sistema...`);
await esperar(1000)
await setTimeout(() => { process.exit(0) }, 1000);
break;

case "editarcase":
//Feito por Josuéhzx 
if(!isDono) {return reply("Somente dono.")}
if (!args[0]) return reply(`Use: ${prefix}editarcase nome.`);

const nomeCase = args[0];
try {
const getCase = (cases) => {
return "case " + `'${cases}'` + fs.readFileSync("./index.js").toString().split("case '" + cases + "'")[1].split("break")[0] + "break";
};

const conteudo = getCase(nomeCase);
global.editandoCase = {
nome: nomeCase,
conteudoAntigo: conteudo
};
reply(`✅ Case "${nomeCase}" encontrada:\n\n${conteudo}`);
} catch (e) {
reply("❌ A case não foi encontrada. Verifique o nome.");
}
break;

case "editarcase2":
if(!isDono) {return reply("Somente dono.")}
if (!global.editandoCase)
return reply(`❌ Nenhuma case foi marcada para edição. Use ${prefixo}editarcase nome primeiro.`);
const novoCodigo = body.slice(command.length + 2).trim();
if (!novoCodigo.startsWith("case ")) return reply("❌ O novo código precisa começar com 'case'.");
try {
const indexPath = "./index.js";
let original = fs.readFileSync(indexPath, "utf-8");
const antigo = global.editandoCase.conteudoAntigo;
if (!original.includes(antigo)) {
return reply("❌ O trecho original não foi encontrado no arquivo. Talvez ele já tenha sido alterado.");
}
const atualizado = original.replace(antigo, novoCodigo);
fs.writeFileSync(indexPath, atualizado);
reply(`✅ Case "${global.editandoCase.nome}" atualizada com sucesso! Reiniciando bot...`);

delete global.editandoCase;
setTimeout(() => process.exit(0), 1000);
} catch (e) {
console.error(e);
reply("❌ Erro ao atualizar a case.");
}
break

case 'addcase': {
if (!q) return reply("Está faltando nada não?");
if (!isDono) {return;}
const pula = [fs.readFileSync('index.js', 'utf8').slice(0, fs.readFileSync('index.js', 'utf8').lastIndexOf('break') + 5), q, fs.readFileSync('index.js', 'utf8').slice(fs.readFileSync('index.js', 'utf8').lastIndexOf('break') + 5)].join('\n\n\n\n');
fs.writeFileSync('index.js', pula);
reply('Nova case adicionada com sucesso!');
//a imagem é opcional, podem retirar se preferir, só retirar. 
break
}; 


//=====( ABAIXO OS COMANDOS DE ADM )=====\\
case 'ativar': {
if (!isGroup) return reply(mss.grupo);
if (!isGroupAdmins) return reply(mss.adm);
if (!isBotGroupAdmins) return reply(mss.botadm);
await react("⚙️");
const funcoes = [
{ nome: "Boas-Vindas", status: isBemVindo, id: `${prefix}bemvindo` },
{ nome: "Anti-Link", status: isAntiLink, id: `${prefix}antilink` },
{ nome: "Anti-Imagem", status: isAntiImg, id: `${prefix}antiimg` },
{ nome: "Anti-Vídeo", status: isAntiVid, id: `${prefix}antivideo` },
{ nome: "Anti-Áudio", status: isAntiAudio, id: `${prefix}antiaudio` },
{ nome: "Anti-Figurinha", status: isAntiSticker, id: `${prefix}antisticker` },
{ nome: "Anti-Documento", status: isAntiDoc, id: `${prefix}antidoc` },
{ nome: "Anti-Contato", status: isAntiCtt, id: `${prefix}antictt` },
{ nome: "Anti-Localização", status: isAntiLoc, id: `${prefix}antiloc` },
{ nome: "Modo Brincadeiras", status: isModobn, id: `${prefix}modobn` },
{ nome: "Simsimi (IA)", status: isSimih, id: `${prefix}simih` },
{ nome: "Auto Download", status: isAutoDown, id: `${prefix}autodl` },
{ nome: "Sistema Level", status: isLevelingOn, id: `${prefix}level` },
{ name: "Auto sticker", status: isAutoSticker, id: `${prefix}autosticker` }
];

const rows = funcoes.map(func => ({
title: `${func.nome}: ${func.status ? '✅ Ativado' : '❌ Desativado'}`,
description: `Use ${func.id} 1 (ativar) ou 0 (desativar)`,
id: `${func.id} ${func.status ? '0' : '1'}` 
}));
await subaru.relayMessage(from, {
interactiveMessage: {
header: proto.Message.InteractiveMessage.Header.create({
title: `⚙️ PAINEL DE CONTROLE - ${groupName}`,
hasMediaAttachment: false
}),
body: {
text: `Olá ${pushname}! 👋\n\nAqui você pode ativar ou desativar as funções do bot para este grupo. Clique em uma opção para alternar o estado dela (ativar/desativar).`
},
footer: { text: `© ${botName}` },
nativeFlowMessage: {
buttons: [{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: "🔧 FUNÇÕES DO GRUPO",
sections: [{
title: "Clique para ativar ou desativar",
rows: rows
}]
})
}],
messageParamsJson: ""
}
}
}, {});
break;
}


case 'ban': {
if (!isGroup) return reply(mss.grupo);
if (!isGroupAdmins) return reply(mss.adm);
if (!isBotGroupAdmins) return reply(mss.botadm);
try {
if (!alvo) {return enviar("Você precisa mencionar um usuário (@user) ou responder à mensagem dele para banir.")}
if (!JSON.stringify(groupMembers).includes(alvo)) {return enviar("Este usuário não está no grupo ou já foi removido.")}
const getCleanId = (jid) => jid ? jid.split('@')[0] : "";
if (getCleanId(alvo) === getCleanId(numeroBot)) {
return enviar('Eu não vou me banir, kk.')}
if (getCleanId(alvo) === getCleanId(donoNmr) || getCleanId(alvo) === getCleanId(donoLid)) {
return enviar('*Acha mesmo que eu vou banir meu criador?*')}
await subaru.groupParticipantsUpdate(from, [alvo], "remove"); 
await sleep(300);
await subaru.sendMessage(from, { text: `*Prontinho, membro removido!*`, mentions: [sender] });
} catch (e) {
console.log(e);
reply("Ocorreu um erro ao tentar banir o usuário.");
}
break;
}


case 'rankativos': 
case 'rankativo':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
var i3 = countMessage.map(i => i.groupId).indexOf(from)
var blue = countMessage[i3].numbers.map(i => i)
blue.sort((a, b) => ((a.figus == undefined ? a.figus = 0 : a.figus + a.messages + a.cmd_messages) < (b.figus == undefined ? b.figus = 0 : b.figus + b.cmd_messages + b.messages)) ? 0 : -1)
menc = [] 
blad = `*🏆 Rank dos mais ativos no grupo:* ${groupName}\n`
for ( i = 0; i < (blue.length < 5 ? blue.length : 5); i++) {
if (i != null) blad += `\n*🏅 ${i + 1}º Lugar:* @${blue[i].id.split('@')[0]}\n• Quantidade de mensagens encaminhadas: *${blue[i].messages}*\n• Quantidade de comandos executados pelo usuário(a): *${blue[i].cmd_messages}*\n• Usuário está conectado em um dispositivo: *${blue[i].aparelho}*\n• Figurinhas encaminhadas pelo usuário(a) no grupo: *${blue[i].figus}*\n`
menc.push(blue[i].id)
}
await mentions(blad, menc, true)
break

case 'rankinativo':
case 'rankinativos':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm) 
await ClearMembersInactive()
bule = []; bule2 = []; mentioned_jid = []
for(cag of countMessage[ind].numbers){
bule2.push(cag.id)
if(cag.messages <= 1){bule.push(cag)}}
bule.sort((a, b) => ((a.messages + a.cmd_messages) < (b.cmd_messages + b.messages)) ? 0 : -1)
boardi = `🗑 *Rank dos mais inativos do grupo:* ${groupName}\n-\n`
if(bule.length == 0) boardi += '❌ Nenhum usuário inativo foi encontrado neste grupo.️'
for ( i = 0; i < (bule.length < 5 ? bule.length : 5); i++) {
if (i != null) boardi += `*🏅 ${i + 1}º Lugar:* @${bule[i].id.split('@')[0]}\n• Quantidade de mensagens enviadas pelo usuário(a): *${bule[i].messages}*\n• Quantidade de comandos executados pelo usuário(a): *${bule[i].cmd_messages}*\n• Figurinhas encaminhadas pelo usuário(a) no grupo: *${bule[i].aparelho}*\n\n`
mentioned_jid.push(bule[i].id)
} 
await mentions(boardi, mentioned_jid, true);
break

case 'checkativo':
case 'ativolist':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(groupIdscount.indexOf(from) < 0) return reply('O bot não tem ainda dados sobre o grupo')
var ind = groupIdscount.indexOf(from)
if(!alvo) return reply('Marque o @ de quem deseja puxar a atividade / Só pode um por vez..')
if(numbersIds.indexOf(alvo) >= 0) {
var indnum = numbersIds.indexOf(alvo)
var RSM_CN = countMessage[ind].numbers[indnum]
await mentions(`Consulta individual da atividade do usuário @${alvo.split('@')[0]}\n–\n• Quantidade de mensagens enviadas pelo usuário(a): *${RSM_CN.messages}*\n• Quantidade de comandos executados pelo usuário(a): *${RSM_CN.cmd_messages}*\n• Usuário está conectado em um dispositivo: *${RSM_CN.aparelho}*\n• Figurinhas encaminhadas pelo usuário(a) no grupo: *${RSM_CN.figus}*\n–\n〘 *${groupName}* 〙`, [alvo], true)
} else {
await mentions(`Não tenho nenhuma informação no grupo sobre o *@${alvo.split('@')[0]}*.`, [alvo], true)
}
break

case 'atividade':
case 'atividades':
try{
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(isGroup && JSON.stringify(countMessage).includes(from)) {
var i6 = countMessage.map(i => i.groupId).indexOf(from)
if(countMessage[i6].numbers.length == 0) return
teks = `*Atividade dos membros do grupo:*\n–\n`
let mentionsArray = []
for(i = 0; i < countMessage[i6].numbers.length; i++) {
var i8 = countMessage[i6].numbers.map(i => i.id).indexOf(countMessage[i6].numbers[i].id)
var uscnt = countMessage[i6].numbers[i]
teks += `• Participante: *@${uscnt.id.split('@')[0]}*\n• Quantidade de comandos usados pelo(a) participante no grupo: *${uscnt.cmd_messages}*\n• Quantidade de mensagens enviadas pelo(a) participante: *${uscnt.messages}*\n• O participante no momento está conectado em: *${uscnt.aparelho}*\n• Quantidade de figurinhas enviadas no grupo: *${uscnt.figus}*\n–\n`
mentionsArray.push(uscnt.id)
}
await subaru.sendMessage(from, { text: teks.trim(), mentions: mentionsArray}, { quoted: seloSz });
} else return reply('*Nada foi encontrado*')
} catch(error) {
console.log(error)
}
break

case 'inativos':
case 'inativo':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(q.match(/[a-z]/i) || !q) return reply(`Exemplo: ${prefix+command} 0\nIsso mostrará quantas pessoas tem 0 mensagens no grupo, e se usar 5, vai mostrar quantos usuários tem 5 mensagens ou menos..`)
await ClearMembersInactive()
var i2 = countMessage?.map(x => x.groupId)?.indexOf(from)
blue = []; for (i of countMessage[i2].numbers) {
if(i.messages <= q.trim())
if(i.figus <= q.trim())
if(i.cmd_messages <= q.trim())
if(!groupAdmins.includes(i.id))
if(!OWNER_NUMBER.includes(i.id))
if(i.id != botNumber)
if(groupMembers.map(i => i.id).includes(i.id))
blue.push(i.id)}; for ( i of countMessage[i2].numbers) {
if(!groupMembers.map(i => i.id).includes(i.id))
if(i.id.length > 5)
blue.push(i.id)}
if(blue.length == 0) return reply(`Não tem pessoas com ${q} mensagens..`)
bli = `Usuários com *${q.trim()}* mensagem(ns) pra baixo estão listados abaixo, verifique:\n–\n`
for (ac = 0; ac < blue.length; ac++) {
bli += `*${ac+1}.* @${blue[ac].split("@")[0]}\n`
}
await mention(bli, groupMemb2)
break

case 'banghost':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(q.match(/[a-z]/i) || !q || q.length > 3) return reply(`Digite a partir de quantas mensagens pra baixo você deseja remover (que não interaje no grupo).\nExemplo: ${prefix+command} 0`)
var i2 = countMessage?.map(x => x.groupId)?.indexOf(from)
blue = []; for (i of countMessage[i2].numbers) {
if(i.messages <= Number(q.trim()))
if(i.figus <= Number(q.trim()))
if(i.cmd_messages <= Number(q.trim()))
if(!groupAdmins.includes(i.id))
if(!OWNER_NUMBER.includes(i.id))
if(i.id != botNumber)
if(groupMembers.map(i => i.id).includes(i.id))
blue.push(i.id)}; for ( i of countMessage[i2].numbers) {
if(!groupMembers.map(i => i.id).includes(i.id))
if(i.id.length > 5)
blue.push(i.id)}
if(blue.length == 0) return reply(`Não tem mais pessoas com ${q.trim()} mensagem(ns) para eu remover..`)
for ( i = 0; i < blue.length; i++) {
await sleep(1000)
await subaru.groupParticipantsUpdate(from, [blue[i]], "remove")}
break

case 'modobn':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isModobn) return enviar('_Isso já está ativo, senhor._')
ArquivosDosGrupos[0].modobn = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de brincadeiras foi ativada com sucesso nesse grupo 😋_*.')
} else if(Number(q[0]) === 0) {
if(!isModobn) return enviar('Isso já ta off 😪')
ArquivosDosGrupos[0].modobn = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de brincadeiras foi desativada com sucesso nesse grupo 😋_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

case 'autosticker':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isAutoSticker) return enviar('_Isso já está ativo, senhor._')
ArquivosDosGrupos[0].autosticker = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de auto sticker foi ativada com sucesso nesse grupo 😋_*.')
} else if(Number(q[0]) === 0) {
if(!isAutoSticker) return enviar('Isso já ta off 😪')
ArquivosDosGrupos[0].autosticker = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de auto sticker foi desativada com sucesso nesse grupo 😋_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

case 'autodl':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isAutoDown) return enviar('_Isso já está ativo, senhor._')
ArquivosDosGrupos[0].autodown = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de auto download foi ativada com sucesso nesse grupo 😋_*.')
} else if(Number(q[0]) === 0) {
if(!isAutoDown) return enviar('Isso já ta off 😪')
ArquivosDosGrupos[0].autodown = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de auto download foi desativada com sucesso nesse grupo 😋_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

case 'level':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isLevelingOn) return enviar('_Isso já está ativo, senhor._')
ArquivosDosGrupos[0].leveling = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O sistema de levels foi ativada com sucesso nesse grupo 😋_*.')
} else if(Number(q[0]) === 0) {
if(!isLevelingOn) return enviar('Isso já ta off 😪')
ArquivosDosGrupos[0].leveling = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O sistema de levels foi desativada com sucesso nesse grupo 😋_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

case 'simih':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isSimih) return enviar('_Isso já está ativo, senhor._')
ArquivosDosGrupos[0].simih = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de Simih foi ativada com sucesso nesse grupo 😋_*.')
} else if(Number(q[0]) === 0) {
if(!isSimih) return enviar('Isso já ta off 😪')
ArquivosDosGrupos[0].simih = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de Simih foi desativada com sucesso nesse grupo 😋_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

case 'antilink':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isAntiLink) return enviar('_Isso já está ativo, senhor._')
ArquivosDosGrupos[0].antilink = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de antilink foi ativada com sucesso nesse grupo 😋_*.')
} else if(Number(q[0]) === 0) {
if(!isAntiLink) return enviar('Isso já ta off 😪')
ArquivosDosGrupos[0].antilink = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de antilink foi desativada com sucesso nesse grupo 😋_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

case 'antiimg':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(args.length < 1) return reply(`Use 1 pra ativar ou 0 pra desativar. Caso deseja ativar, use essa forma: ${prefix+comando} 1, caso seja desativar e só trocar o 1 pelo 0.`)
if(Number(args[0]) === 1) {
if(isAntiImg) return reply('O recurso de anti imagem já está ativado.')
ArquivosDosGrupos[0].antiimg = true
setGp(ArquivosDosGrupos)
reply('Ativou com sucesso o recurso de anti imagem neste grupo.️')
} else if(Number(args[0]) === 0) {
if(!isAntiImg) return reply('O recurso de anti imagem já está desativado.')
ArquivosDosGrupos[0].antiimg = false
setGp(ArquivosDosGrupos)
reply('Desativou com sucesso o recurso de anti imagem neste grupo.')
} else {
reply('1 para ativar, 0 para desativar.')
}
break

case 'antivideo':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(args.length < 1) return reply(`Use 1 pra ativar ou 0 pra desativar. Caso deseja ativar, use essa forma: ${prefix+comando} 1, caso seja desativar e só trocar o 1 pelo 0.`)
if(Number(args[0]) === 1) {
if(isAntiVid) return reply('O recurso de anti vídeo já está ativado.')
ArquivosDosGrupos[0].antivideo = true
setGp(ArquivosDosGrupos)
reply('Ativou com sucesso o recurso de anti video neste grupo.')
} else if(Number(args[0]) === 0) {
if(!isAntiVid) return reply('O recurso de anti vídeo já está desativado.')
ArquivosDosGrupos[0].antivideo = false
setGp(ArquivosDosGrupos)
reply('Desativou com sucesso o recurso de anti video neste grupo.')
} else {
reply('1 para ativar, 0 para desativar')
}
break

case 'antiaudio':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(args.length < 1) return reply(`Use 1 pra ativar ou 0 pra desativar. Caso deseja ativar, use essa forma: ${prefix+comando} 1, caso seja desativar e só trocar o 1 pelo 0.`)
if(Number(args[0]) === 1) {
if(isAntiAudio) return reply('O recurso de anti áudio já está ativado.')
ArquivosDosGrupos[0].antiaudio = true
setGp(ArquivosDosGrupos)
reply('Ativou com sucesso o recurso de anti audio neste grupo.')
} else if(Number(args[0]) === 0) {
if(!isAntiAudio) return reply('O recurso de anti áudio já está desativado.')
ArquivosDosGrupos[0].antiaudio = false
setGp(ArquivosDosGrupos)
reply('Desativou com sucesso o recurso de anti audio neste grupo.')
} else {
reply('1 para ativar, 0 para desativar')
}
break

case 'antisticker':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(args.length < 1) return reply(`Use 1 pra ativar ou 0 pra desativar. Caso deseja ativar, use essa forma: ${prefix+comando} 1, caso seja desativar e só trocar o 1 pelo 0.`)
if(Number(args[0]) === 1) {
if(isAntiSticker) return reply('O recurso de anti sticker já está ativado.')
ArquivosDosGrupos[0].antisticker = true
setGp(ArquivosDosGrupos)
reply('Ativou com sucesso o recurso de anti sticker neste grupo.')
} else if(Number(args[0]) === 0) {
if(!isAntiSticker) return reply('O recurso de anti sticker já está desativado.')
ArquivosDosGrupos[0].antisticker = false
setGp(ArquivosDosGrupos)
reply('Desativou com sucesso o recurso de anti sticker neste grupo.')
} else {
reply('1 para ativar, 0 para desativar.')
}
break

case 'antidocumento':
case 'antidoc':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(args.length < 1) return reply(`Use 1 pra ativar ou 0 pra desativar. Caso deseja ativar, use essa forma: ${prefix+comando} 1, caso seja desativar e só trocar o 1 pelo 0.`)
if(Number(args[0]) === 1) {
if(isAntiDoc) return reply('O recurso de anti documento já está ativado.')
ArquivosDosGrupos[0].antidoc = true
setGp(ArquivosDosGrupos)
reply('Ativou com sucesso o recurso de anti documento neste grupo.')
} else if(Number(args[0]) === 0) {
if(!isAntiDoc) return reply('O recurso de anti documento já está desativado.')
ArquivosDosGrupos[0].antidoc = false
setGp(ArquivosDosGrupos)
reply('Desativou com sucesso o recurso de anti documento neste grupo.')
} else {
reply('1 para ativar, 0 para desativar')
}
break

case 'antictt':
case 'anticontato':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(args.length < 1) return reply(`Use 1 pra ativar ou 0 pra desativar. Caso deseja ativar, use essa forma: ${prefix+comando} 1, caso seja desativar e só trocar o 1 pelo 0.`)
if(Number(args[0]) === 1) {
if(isAntiCtt) return reply('O recurso de anti contato já está ativado.')
ArquivosDosGrupos[0].antictt = true
setGp(ArquivosDosGrupos)
reply('Ativou com sucesso o recurso de anti contato neste grupo.')
} else if(Number(args[0]) === 0) {
if(!isAntiCtt) return reply('O recurso de anti contato já está desativado.')
ArquivosDosGrupos[0].antictt = false
setGp(ArquivosDosGrupos)
reply('️Desativou com sucesso o recurso de anticontato neste grupo.️')
} else {
reply('1 para ativar, 0 para desativar')
}
break

case 'antilocalizacao':
case 'antiloc':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)					
if(args.length < 1) return reply(`Use 1 pra ativar ou 0 pra desativar. Caso deseja ativar, use essa forma: ${prefix+comando} 1, caso seja desativar e só trocar o 1 pelo 0.`)
if(Number(args[0]) === 1) {
if(isAntiLoc) return reply('O recurso de anti loc já está ativado.')
ArquivosDosGrupos[0].antiloc = true
setGp(ArquivosDosGrupos)
reply('Ativou com sucesso o recurso de anti loc neste grupo.')
} else if(Number(args[0]) === 0) {
if(!isAntiLoc) return reply('O recurso de anti loc já está desativado.')
ArquivosDosGrupos[0].antiloc = false
setGp(ArquivosDosGrupos)
reply('Desativou com sucesso o recurso de anti loc neste grupo.')
} else {
reply('1 para ativar, 0 para desativar')
}
break

case 'bemvindo':
case 'welcome':{
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(q.length < 1) return enviar(`${prefix + comando} 1 para ativar, 0 para desativar.`)
if(Number(q) === 1) {
if(isBemVindo) return enviar('Essa função já está ativada')
ArquivosDosGrupos[0].bemVindo[0].ativo = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de bem vindo foi ativada com sucesso nesse grupo 😋_*')
} else if(Number(q) === 0) {
if(!isBemVindo) return enviar('Essa função já está desativada')
ArquivosDosGrupos[0].bemVindo[0].ativo = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de bem vindo foi desativada com sucesso nesse grupo 😋_*')
} else {
enviar(`_*${prefix + comando} 1 para ativar, 0 para desativar.*_`)
}
break}

case 'legendabv':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(!q) return enviar('Digite a legenda.')
if(isBemVindo) {
ArquivosDosGrupos[0].bemVindo[0].entrou = q
ModificaGrupo(ArquivosDosGrupos)
enviar('*_Pronto_*\n*_Legenda atualizada com sucesso pae 😎_*')
} else {
enviar(`Ative o bemvindo primeiro `)
}
break

case 'legendasaiu':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(!q) return enviar('Digite a legenda.')
if(isBemVindo) {
ArquivosDosGrupos[0].bemVindo[0].saiu = q
ModificaGrupo(ArquivosDosGrupos)
enviar('*_Legenda de Saida atualizada_*')
} else {
enviar(`Ative o bemvindo primeiro`
)
}
break

case 'totag': 
case 'cita': 
case 'hidetag':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
const imgCaption = (isQuotedImage ? quoted?.imageMessage?.caption : info.message?.imageMessage?.caption) || "";
const vidCaption = (isQuotedVideo ? quoted?.videoMessage?.caption : info.message?.videoMessage?.caption) || "";
const convText = (isQuotedMsg ? quoted?.conversation : info.message?.conversation) || "";
const extdText = (isQuotedText ? quoted?.extendedTextMessage?.text : info.message?.extendedTextMessage?.text) || "";
const docNoCap = (isQuotedDocument ? quoted?.documentMessage?.caption : info.message?.documentMessage?.caption) || "";
const docWCap= (isQuotedDocW ? quoted?.documentWithCaptionMessage?.message?.documentMessage?.caption : info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption) || "";
var options = "";
var imageMessage = isQuotedImage ? quoted?.imageMessage : info.message?.imageMessage;
var videoMessage = isQuotedVideo ? quoted?.videoMessage : info.message?.videoMessage;
var documentMessageNoCaption = isQuotedDocument ? quoted?.documentMessage : info.message?.documentMessage;
var documentMessageWCaption = isQuotedDocW ? quoted?.documentWithCaptionMessage?.message?.documentMessage : info.message?.documentWithCaptionMessage?.message?.documentMessage;
var audioMessage = isQuotedAudio ? quoted?.audioMessage : "";
var stickerMessage = isQuotedSticker ? quoted?.stickerMessage : "";
var MRC_TD = groupMembers.map(i => i.id);
if (imageMessage && !audioMessage && !documentMessageNoCaption) {
options = {image: await getFileBuffer(imageMessage, 'image'), caption: q.length > 1 ? q.trim() : imgCaption.replace(`${prefix+command}`, "").trim(), contextInfo: {forwardingScore: 50000, isForwarded: true, mentionedJid: MRC_TD, remoteJid: info.key.remoteJid}};
} else if (videoMessage && !audioMessage && !documentMessageNoCaption) {
options = {video: await getFileBuffer(videoMessage, 'video'), caption: q.length > 1 ? q.trim() : vidCaption.replace(`${prefix+command}`, "").trim(), contextInfo: {forwardingScore: 50000, isForwarded: true, mentionedJid: MRC_TD, remoteJid: info.key.remoteJid}};
} else if (!audioMessage && !stickerMessage && convText && !documentMessageNoCaption) {
options = {text: q.length > 1 ? q.trim() : convText.replace(`${prefix+command}`, "").trim(), contextInfo: {forwardingScore: 50000, isForwarded: true, mentionedJid: MRC_TD, remoteJid: info.key.remoteJid}};
} else if (!audioMessage && !stickerMessage && extdText && !documentMessageNoCaption) {
options = {text: q.length > 1 ? q.trim() : extdText.replace(`${prefix+command}`, "").trim(), contextInfo: {forwardingScore: 50000, isForwarded: true, mentionedJid: MRC_TD, remoteJid: info.key.remoteJid}};
} else if (documentMessageNoCaption) {
options = {document: await getFileBuffer(documentMessageNoCaption, 'document'), caption: q.length > 1 ? q.trim() : docNoCap.replace(`${prefix+command}`, "").trim(), mimetype: documentMessageNoCaption.mimetype, fileName: documentMessageNoCaption.fileName, contextInfo: {forwardingScore: 50000, isForwarded: true, mentionedJid: MRC_TD, remoteJid: info.key.remoteJid}};
} else if (documentMessageWCaption && !audioMessage) {
options = {document: await getFileBuffer(documentMessageWCaption, 'document'), caption: q.length > 1 ? q.trim() : docWCap.replace(`${prefix+command}`, "").trim(), mimetype: documentMessageWCaption.mimetype, fileName: documentMessageWCaption.fileName, contextInfo: {forwardingScore: 50000, isForwarded: true, mentionedJid: MRC_TD, remoteJid: info.key.remoteJid}};
} else if (stickerMessage && !audioMessage) {
options = {sticker: await getFileBuffer(stickerMessage, 'sticker'), contextInfo: {forwardingScore: 50000, isForwarded: true, mentionedJid: MRC_TD, remoteJid: info.key.remoteJid}};
} else if (audioMessage) {
options = {audio: await getFileBuffer(audioMessage, 'audio'), ptt: true, contextInfo: {forwardingScore: 50000, isForwarded: true, mentionedJid: MRC_TD, remoteJid: info.key.remoteJid}};
}
await subaru.sendMessage(from, options).catch(() => reply('Erro! Não foi possível mencionar os participantes, talvez a mensagem que foi atribuída ao comando pode ter ocorrido um erro na leitura. Tente com outra mídia, caso o erro persista entre em contato com o proprietário do BOT e solucione!'));
break

case 'msgtemp':
if (!isDono && !isAdm) {return enviar(msg.adm);}
if (!isGroup) return enviar(msg.grupo);
if (!isBotGroupAdmins) return enviar(msg.botadm)
await waitReact();
try {
const getInfoG = await getGroupMetadataSafe(from);
if (getInfoG.ephemeralDuration === undefined) {
reply('As mensagens temporárias no grupo foram ativadas com sucesso.');
await subaru.sendMessage(from, { disappearingMessagesInChat: true });
} 
else if (getInfoG.ephemeralDuration > 1) {
reply('As mensagens temporárias no grupo foram desativadas com sucesso.');
await subaru.sendMessage(from, { disappearingMessagesInChat: false });
}
} catch (e) {
reply('Houve um erro ao tentar alterar o status das mensagens temporárias. Tente novamente mais tarde.');
}
break;

case 'resetlink': {
if(!isDono && !isAdm) {return reply("Você não tem permissão!")}
if(!isGroup) return reply(mss.grupo)
if(!isBotGroupAdmins) return reply(mss.botadm)
try {
await subaru.groupRevokeInvite(from)
enviar(`*Link de convite resetado com sucesso*`)
} catch(e) {
console.log(e)
enviar(`algo deu errado`)
}
}
break

case 'deletar': case 'del':case 'd': case 'apagar':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(!alvo) return enviar("Marque a mensagem.")
await subaru.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.extendedTextMessage.contextInfo.stanzaId, participant: alvo}})
react("🗑")
break

case 'promover': 
if(!isGroup) return reply(mss.grupo)
if(!alvo) return enviar("Marque a mensagem do usuário ou marque o @ dele.., lembre de só marcar um usuário...")
let promoveJid = alvo;
if(!JSON.stringify(groupMembers).includes(alvo)) return enviar("Esse membro não está mais no grupo.")
if(numeroBot.includes(alvo)) return enviar('Ué? Tá pedindo pra eu me promover?!')
 subaru.sendMessage(from, {text: `@${promoveJid.split("@")[0]} Foi promovido(a) para [ ADMINISTRADOR ] com sucesso.`, mentions: [promoveJid]})
 subaru.groupParticipantsUpdate(from, [promoveJid], "promote")
break

case 'rebaixar': 
if(!isGroup) return reply(msss.grupo)
if(!alvo) return enviar("Marque a mensagem do usuário ou marque o @ dele.., lembre de só marcar um usuário...")
let rebaixarJid = alvo;
if(!JSON.stringify(groupMembers).includes(alvo)) return enviar("Esse membro não está mais no grupo.")
if(numeroBot.includes(alvo)) return enviar('E você acha que eu vou me rebaixar?')
if(donoNmr.includes(alvo)) return enviar('*Não vou rebaixar meu criador.*')
subaru.sendMessage(from, {text: `@${rebaixarJid.split("@")[0]} Foi rebaixado para [ MEMBRO COMUM ] com sucesso.`, mentions: [rebaixarJid]})
subaru.groupParticipantsUpdate(from, [rebaixarJid], "demote")
break

case 'fechar':
case 'grupin':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if (!q) return enviar("Cade o parâmetro de tempo?")
react("🔧")
switch(q) {
case '30s': {
subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 30 segundos, Até logo rapeize 👋')
await esperar(30000); //30 segundos 
subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
}
break
case '1m':
subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 1 minuto, Até logo rapeize 👋')
await esperar(60000); //1 Minuto
subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '2m':
subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 2 minutos, Até logo rapeize 👋')
await esperar(120000); //2 Minutos
subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '5m':
subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 5 minutos, Até logo rapeize 👋')
await esperar(300000); //5 Minutos
subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '10m':
subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 10 minutos, Até logo rapeize 👋')
await esperar(600000); //10 Minutos 
subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '20m':
subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 20 minutos, Até logo rapeize 👋')
await esperar(1200000); //20 Minutos
subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '30m':
subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 30 minutos, Até logo rapeize 👋')
await esperar(13800000); //30 Minutos
subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '1h':
subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 1 hora, Até logo rapeize 👋')
await esperar(27600000); //1 Hora
subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '3h':
await subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 3 horas, Até logo rapeize 👋')
await esperar(82800000); //3 Horas
await subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '5h':
await subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 5 horas, Até logo rapeize 👋')
await esperar(138000000); //30 segundos 
await subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '12h':
await subaru.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 12 horas, Até logo rapeize 👋')
await esperar(331200000); //12 Horas
await subaru.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
}
break

case 'banfakes':
case 'banmrfake': { 
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
const groupMetadata = await getGroupMetadataSafe(from);
const participants = groupMetadata.participants;
const participantsToBan = participants
.filter(participant => !participant.id.startsWith('55'))
.map(participant => participant.id);

if (participantsToBan.length === 0) {
return reply('⚠️ Todos os participantes têm números começando com 55. Nenhum participante foi banido.');}
try {
await subaru.groupParticipantsUpdate(from, participantsToBan, 'remove');
reply(`✅ Todos os participantes com números internacionais foram removidos com sucesso.`);
} catch (e) {
console.error("Erro ao remover participantes:", error);
reply(`Deu erro, se liga:\n *_${e.message}_*`);
}
break;}

case 'infgp':
case 'linkgp':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
grupo = await getGroupMetadataSafe(from)
var admins = grupo.participants.filter(p => p.role === 'admin').length
const groupLinkk = await subaru.groupInviteCode(from);
reply(`📊 \`𝐈𝐧𝐟𝐨𝐫𝐦𝐚çõ𝐞𝐬 𝐝𝐨 𝐆𝐫𝐮𝐩𝐨:\`

✧͜͡҉🏆𝐢𝐝𝐠𝐩: _${from}_ ;
✧͜͡҉🔰𝐍𝐨𝐦𝐞: _${grupo.subject}_ ;
✧͜͡҉🔗𝐋𝐢𝐧𝐤 𝐝𝐨 𝐠𝐩: _https://chat.whatsapp.com/${groupLinkk}_.;
✧͜͡҉👥𝐌𝐞𝐦𝐛𝐫𝐨𝐬: _${grupo.participants.length}_ ;
✧͜͡҉📝𝐃𝐞𝐬𝐜𝐫𝐢𝐜𝐚𝐨: _${grupo.desc}_ ; 
> ${botName}`)
break// By GojoDevs

case 'clear':
case 'limpar':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins && isDono) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
 await subaru.groupSettingUpdate(from, 'announcement'); 
 clear = `🗑️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n🗑️\n❲❗❳ *Lɪᴍᴘᴇᴢᴀ ᴅᴇ Cʜᴀᴛ Cᴏɴᴄʟᴜɪ́ᴅᴀ*\n𝐁𝐲: ${botName} ✅`
 subaru.sendMessage(from, {text: clear}, {quoted: selogpt, contextInfo : { forwardingScore: 500, isForwarded:true}})
 setTimeout(async () => {
 await subaru.groupSettingUpdate(from, 'not_announcement');}, 10000)
break

case 'grupo':
case 'gp':
if(!isGroup) return reply(mss.grupo)
if(!isGroupAdmins && isDono) return reply(mss.adm)
if(!isBotGroupAdmins) return reply(mss.botadm)
if(!q) {return enviar(`Para poder usar o comando use:\n\'${prefixo}gp f\' para fechar ou \'${prefixo}gp a para abrir\'.`)}
try {
if (q === "a"){
await react("🔓")
await subaru.groupSettingUpdate(from, "not_announcement")
enviar(`𝙾 𝚐𝚛𝚞𝚙𝚘 𝚏𝚘i 𝚊𝚋𝚎𝚛𝚝𝚘 🔓`)
}
if (q === "f") {
await react("🔒")
await subaru.groupSettingUpdate(from, "announcement")
enviar(`𝙾 𝚐𝚛𝚞𝚙𝚘 𝚏𝚘𝚒 𝚏e𝚌𝚑𝚊𝚍𝚘 🔒`)
} 
} catch(e) {
errorReact()
reply(`Deu erro, se liga:\n *_${e.message}_*`);
}
break

//=====( ABAIXO OS COMANDOS DA API )=====\\
case 'namorar': {

if (!alvo) return reply("💔 Você precisa marcar alguém para pedir em namoro.");
if (alvo === sender2) return reply("😂 Você não pode namorar com você mesmo!");
if (botNumber.includes(alvo)) return reply("😳 Eu sou apenas um bot, não posso namorar!");
const familia = await getFamiliaData(sender2);
if (familia && familia.parceiro) {
const parceiroAtual = familia.parceiro.parceiroId || familia.parceiroId
const nomeExibicao = parceiroAtual.replace('@lid', ''); 
const tipoRelacionamento = familia.parceiro.tipo.toLowerCase();
await mentions(`💞 Você já está em um relacionamento (${tipoRelacionamento}) com @${nomeExibicao}. Não é possível pedir outra pessoa em namoro.`, [parceiroAtual]);
await subaru.sendMessage(parceiroAtual, { text: `🐂 ALERTA! Seu parceiro @${sender2.split("@")[0]} está tentando pedir @${alvo.split("@")[0]} em namoro pelas suas costas!`, mentions: [sender2, parceiroAtual] });
return;
}
try {
const res = await fetch(`${baseRaikken}/familia/namorar?apikey=${RaikkenKey}`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ usuarioId: sender2, parceiroId: alvo })
});
const data = await res.json();
if (!data || !data.mensagem) throw new Error("Resposta inválida da API.");
const mensagemOriginal = data.mensagem.replace(/@lid/g, '');
const [id1, id2] = mensagemOriginal.match(/\d+/g);
const msgFormatada = `💞 Novo casal formado!\n@${id1} 💍 @${id2}\n💘 Que o amor de vocês dure para sempre!`;
await mentions(msgFormatada, [sender2, alvo]);
} catch (e) {
console.error("Erro no namoro:", e);
await botSemKey(subaru, from) 
}
break}

case 'casar': {

if (!alvo) return reply("💍 Você precisa marcar com quem deseja casar.");
if (alvo === sender2) return reply("😂 Você não pode casar com você mesmo!");
if (botNumber.includes(alvo)) return reply("😳 Casar com um bot? Que ideia maluca!");
const familia = await getFamiliaData(sender2);
if (!familia || !familia.parceiro) {
return reply("💔 Para casar, você primeiro precisa estar em um namoro.");
}
const parceiroAtual = familia.parceiro.parceiroId;
const nomeExibicao = parceiroAtual.replace('@lid', ''); 
const tipoRelacionamento = familia.parceiro.tipo;
if (tipoRelacionamento === 'Casamento') {
return mention(`💞 Você já está casado(a) com @${parceiroAtual}!`);
}
if (alvo !== parceiroAtual) {
await mentions(`Sua dupla é o/a @${nomeExibicao}... Fica esperto em 🐂`, [parceiroAtual] );
await subaru.sendMessage(parceiroAtual, { text: `🐂 ALERTA! Seu namorado(a) @${sender2.split("@")[0]} está tentando pedir @${alvo.split("@")[0]} em CASAMENTO!`, mentions: [sender2, alvo] });
return;
}
try {
const res = await fetch(`${baseRaikken}/familia/casar?apikey=${RaikkenKey}`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ usuarioId: sender2, parceiroId: alvo })
});
const data = await res.json();
if (!data || !data.mensagem) throw new Error("Resposta inválida da API.");
const mensagemOriginal = data.mensagem.replace(/@lid/g, '');
const [id1, id2] = mensagemOriginal.match(/\d+/g);
const msgFormatada = `💞 Mais um passo dado!\n@${id1} 💍 @${id2}\n💘 Que o amor de vocês dure para sempre!`;
await mentions(msgFormatada, [sender2, alvo]);
} catch (e) {
console.log(e);
botSemKey(subaru, from);
}
}
break;

case 'divorciar':
case 'terminar': {

if (args[0] !== '1') { return reply(`Tem certeza? Para confirmar o fim do relacionamento, use: *${prefix}${command} 1*`)}
const familia = await getFamiliaData(sender2);
if (!familia || !familia.parceiro) {
return reply("💔 Você não está em um relacionamento para poder terminar.");}
const parceiroId = familia.parceiro.parceiroId;
const endpoint = familia.parceiro.tipo === 'Casamento' ? 'divorciar' : 'terminar';
try {
const res = await fetch(`${baseRaikken}/familia/divorciar?apikey=${RaikkenKey}`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ usuarioId: sender2, parceiroId: parceiroId })
});
const data = await res.json();
if (!data || !data.mensagem) throw new Error("Resposta inválida da API.");
await mentions(data.mensagem, [sender2, alvo]);
} catch (e) {
console.log(e);
botSemKey(subaru, from);
}
}
break;

case 'addamante': {

if (!alvo) return reply("😏 Você precisa marcar quem será seu/sua amante.");
if (alvo === sender2) return reply("😂 Ter um caso com você mesmo? Interessante...");
const familia = await getFamiliaData(sender2);
if (familia && familia.parceiro) {
const parceiroAtual = familia.parceiro.parceiroId;
await reply("🤫 Cuidado... Brincar com fogo pode te queimar...");
await subaru.sendMessage(parceiroAtual, { text: `🐂 ALERTA DE CORNO! Seu parceiro @${sender2.split("@")[0]} acabou de adicionar @${alvo.split("@")[0]} como amante!`, mentions: [sender2, alvo] })}
try {
const res = await fetch(`${baseRaikken}/familia/amante?apikey=${RaikkenKey}`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ usuarioId: sender2, parceiroId: alvo })
});
const data = await res.json();
if (!data || !data.mensagem) throw new Error("Resposta inválida da API.");
const mensagemOriginal = data.mensagem.replace(/@lid/g, '');
const [id1, id2] = mensagemOriginal.match(/\d+/g);
const msgFormatada = `🫦 Eita, uma amante na relação? !\n@${id1} 💍 @${id2}\n💋 Que o amor de vocês sobreviva o caos`;
await mentions(msgFormatada, [sender2, alvo]);} catch (e) {
console.log(e);
botSemKey(subaru, from);
}
}
break;

case 'familia': {

const usuarioConsultado = sender2 || alvo

try {
const familia = await getFamiliaData(usuarioConsultado);
if (!familia) return reply("Este usuário não possui uma árvore genealógica registrada.");

const { parceiro, filhos, amantes, historico } = familia;
let msg = `🌳 Árvore Familiar de @${usuarioConsultado.split('@')[0]}\n\n`;

if (parceiro && parceiro.desde) {
const dataInicio = new Date(parceiro.desde); 
const hoje = new Date();
const diffTempo = Math.abs(hoje - dataInicio);
const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));
const anosJuntos = Math.floor(diffDias / 365);
const mesesJuntos = Math.floor((diffDias % 365) / 30);
const diasRestantes = (diffDias % 365) % 30;
let tempoJuntos = `⏳ Juntos há: `;
if (anosJuntos > 0) tempoJuntos += `${anosJuntos} ano(s) `;
if (mesesJuntos > 0) tempoJuntos += `${mesesJuntos} mês(es) `;
if (diasRestantes > 0) tempoJuntos += `${diasRestantes} dia(s)`;
msg += `${tempoJuntos.trim()}\n`;
const dia = dataInicio.getDate();
const mes = dataInicio.getMonth() + 1;
const ano = dataInicio.getFullYear();
if (hoje.getDate() === dia && hoje.getMonth() + 1 === mes) {
if (anosJuntos > 0) msg += `\n🎂 FELIZ ANIVERSÁRIO DE ${anosJuntos} ANO(S)! 🎉\n`;
} else {
const mesesTotais = (hoje.getFullYear() - ano) * 12 + (hoje.getMonth() + 1 - mes);
if (mesesTotais > 0) msg += `\n💖 FELIZ ${mesesTotais} MESES JUNTOS! ✨\n`;
}
msg += "\n";
} else {
msg += "💞 Nenhum parceiro ativo.\n\n";
}

msg += filhos?.length ? `👶 Filhos:\n${filhos.map(f => `• ${f.nome.replace('@lid', '')} (${f.idade} anos)`).join("\n")}\n\n` : "👶 Nenhum filho registrado.\n\n";
msg += amantes?.length ? `😏 Amantes:\n${amantes.map(a => `• @${a.amanteId.replace('@lid', '')}`).join("\n")}\n\n` : "😏 Nenhum amante ativo.\n\n";
msg += "📜 Histórico:\n" + (historico?.length ? historico.map(h => `• ${h.tipo} com @${h.parceiroId.replace('@lid', '')} (${h.status})`).join("\n") : "Nenhum histórico.");
const membrosParaMencionar = [
usuarioConsultado,
...(parceiro ? [parceiro.parceiroId] : []),
...(filhos?.map(f => f.id) || []),
...(amantes?.map(a => a.amanteId) || [])];

await mentions(msg, membrosParaMencionar);
} catch (e) {
console.log(e);
botSemKey(subaru, from);
}
}
break;

case 'terfilho': {

if (!alvo || !q) return reply("👶 Use: *.filho @pessoa NomeDoFilho*");
const nomeFilho = q.trim();
try {
const res = await fetch(`${baseRaikken}/familia/filho?apikey=${RaikkenKey}`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ usuarioId: sender2, parceiroId: alvo, nomeFilho })
});
const data = await res.json();
await reply(`🍼 ${data.mensagem || "Erro desconhecido."}`);
} catch (e) {
console.log(e);
botSemKey(subaru, from);
}
}
break;

case 'listaramantes': {

try {
const res = await fetch(`${baseRaikken}/familia/amantes/${sender2}?apikey=${RaikkenKey}`);
const data = await res.json();
if (!data.sucesso || !data.dados.length) return reply("😏 Nenhum amante encontrado.");
const lista = data.dados.map((a, i) => `• ${i + 1}. ${a.amanteId} (desde ${a.desde})`).join("\n");
await reply(`💋 *Lista de Amantes de ${sender2}:*\n\n${lista}`);
} catch (e) {
console.log(e);
botSemKey(subaru, from);
}
}
break;

case 'filhos': {

try {
const res = await fetch(`${baseRaikken}/familia/filhos/${sender2}?apikey=${RaikkenKey}`);
const data = await res.json();
if (!data.sucesso || !data.dados.length) return reply("👶 Nenhum filho encontrado.");
const lista = data.dados.map((f, i) => `• ${i + 1}. ${f.nome} (${f.idade} anos)`).join("\n");
await reply(`🍼 *Filhos de ${sender2}:*\n\n${lista}`);
} catch (e) {
console.log(e);
botSemKey(subaru, from);
}
}
break;

case 'play': {

if (!q) return reply('Digite o nome da música ou cole o link do YouTube!');
try {
let result;
let data = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY');
let hora = moment().tz('America/Sao_Paulo').format('HH:mm:ss');
if (/https?:\/\/(www\.)?youtube\.com\/|youtu\.be\//.test(q)) 
{
let res = await fetch(`https://raikken-api.speedhosting.cloud/api/play2?url=${encodeURIComponent(q)}&apikey=${RaikkenKey}`);
let json = await res.json();
if (!json.status) return reply('Não foi possível processar o link.');
result = json.resultado;
result.titulo = result.Título;
result.duracao = result.Duração;
result.download = result.Download;
result.thumb = result.Thumbnail;
} else {
let res = await fetch(`https://raikken-api.speedhosting.cloud/api/play/search?query=${encodeURIComponent(q)}&apikey=${RaikkenKey}`);
let json = await res.json();
if (!json.status) return reply('Não foi possível encontrar a música.');
result = json.resultado;}
let caption = `
┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓֪࣪
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃࣪ ✿𖥔࣪ *ꔛ⃟𝐌𝐔𝐒𝐈𝐂𝐀 𝐄𝐍𝐂𝐎𝐍𝐓𝐑𝐀𝐃𝐀* ✿𖥔࣪
┃࣪ ┃࣪ 🎵 *Título:* ${result.titulo}
┃࣪ ┃࣪ ⏱️ *Duração:* ${result.duracao}
┃࣪ ┃࣪ 👤 *Canal:* ${result.canal || 'Desconhecido'}
┃࣪ ┃࣪ 👀 *Views:* ${result.views ? result.views.toLocaleString() : 'Desconhecido'}
┃࣪ ┃࣪ 🔗 *Link:* ${q}
┃࣪ ┃࣪ 📅 *Data:* ${data}
┃࣪ ┃࣪ ⏰ *Hora:* ${hora}
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`;

await subaru.sendMessage(from, { image: { url: result.thumb }, caption }, { quoted: info });
await subaru.sendMessage(from, { audio: { url: result.download }, mimetype: 'audio/mpeg', fileName: `${result.titulo}.mp3`, ptt: false }, { quoted: info });
} catch (e) {
console.log(e);
botSemKey(subaru, from);
}
break;}

case 'playdoc': {

if (!q || !q.startsWith('http')) {
return reply('❌ Link do YouTube inválido ou não fornecido. Use o comando .playb para buscar uma música.')}
reply2('📥 Buscando informações do áudio, aguarde...');
try {
const apiResponse = await fetch(`https://raikken-api.speedhosting.cloud/api/play2?url=${encodeURIComponent(q)}&apikey=${RaikkenKey}`);
const apiJson = await apiResponse.json();
if (!apiJson.status || !apiJson.resultado) {
throw new Error('Não foi possível obter os dados da música. O vídeo pode ser privado ou ter restrição de idade.');
}
const result = apiJson.resultado;
const tituloMusica = result.Título;
const linkDownloadDireto = result.Download;
reply(`✅ Música encontrada: "${tituloMusica}"\nEnviando como documento...`);
await subaru.sendMessage(from, {
document: { url: linkDownloadDireto },
mimetype: 'audio/mpeg',
fileName: `${tituloMusica}.mp3` 
}, { quoted: info });

} catch (e) {
console.error('Erro no comando .playdoc:', e);
botSemKey(subaru, from);
}
break;}

case 'playvideo': {

try {
if (!q) {return reply(`❌ Use: ${prefix + command} <link do YouTube>`)}
let url = `https://raikken-api.speedhosting.cloud/api/playvideo?url=${encodeURIComponent(q)}&qualidade=480&apikey=${RaikkenKey}`
let { data } = await axios.get(url)
if (!data.sucesso || !data.resultado || !data.resultado.url) {
return reply("❌ Não foi possível obter o vídeo.")
}

let result = data.resultado
let dataAtual = moment.tz("America/Sao_Paulo").format("DD/MM/YYYY")
let horaAtual = moment.tz("America/Sao_Paulo").format("HH:mm:ss")
let msgg = `
┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓֪࣪
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *🎬 Vídeo Encontrado!*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Título:* ${result.titulo}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Duração:* ${result.duracao}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Data:* ${dataAtual}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ *Hora:* ${horaAtual}
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`

await subaru.sendMessage(from, { video: { url: result.url }, caption: msgg }, { quoted: seloSz })
} catch (e) {
console.error(e)
botSemKey(subaru, from);
}
break}

case 'down':
case 'dl':{

try {
 const url = args[0];
 const Raikken = "Raikken"
 if (!url) { return reply(`❓ *URL não encontrada!*
Envie o *link* que deseja baixar. Por exemplo: ${prefix}dl https://www.tiktok.com/...
✨ *Plataformas suportadas:* ✨
- ▶️Youtube
- 🎵 TikTok (Vídeos e Slides)
- 📸 Instagram (Fotos e Vídeos)
- 📘 Facebook
- 📌 Pinterest
- 🐦 Twitter
> ⚡Raikken-Api`);}
reply('Aguarde, ja estou buscando seu pedido')
if( url.includes('youtube.com') || url.includes('youtu.be')) {
//yt
const endpoint = `${baseRaikken}/mp3/url?url=${encodeURIComponent(url)}&apikey=${RaikkenKey}`;

try {
const res = await fetch(endpoint);
const json = await res.json();

if (!json.status || !json.result?.success) {
return subaru.sendMessage(from, { text: '❌ Não foi possível obter o áudio. Verifique a URL e tente novamente.' });}
const title = json.result.data.title;
const mp3 = json.result.data.downloadUrl;

await subaru.sendMessage(from, {
audio: { url: mp3 },
mimetype: 'audio/mp4',
ptt: false,
fileName: `${title}.mp3`
}, { quoted: info });

} catch (err) {
console.error('Erro no comando .play:', err);
await subaru.sendMessage(chat, { text: '⚠️ Erro ao processar o áudio. Tente novamente mais tarde.' });
}
}else if( url.includes('instagram.com')) {
//instagram
try {
const urlApi = `${baseRaikken}/instagram?url=${encodeURIComponent(url)}&apikey=${RaikkenKey}`;
const res = await axios.get(urlApi);
const json = res.data;
if (!json.status || !json.resultado?.video) { return reply("❌ Não consegui baixar o vídeo. Verifique o link e tente novamente.");}
const { video, legenda, perfil } = json.resultado;
const buffer = await getBuffer(video);

await subaru.sendMessage(from, { video: buffer, caption: `🎬 *Reel de:* @${perfil}\n\n📝 ${legenda || "Sem legenda"}\n> ©Subaru-V1\n> ${Raikken}`}, { quoted: info });
} catch (e) {
reply(`Eu ao baixar video do insta. ${e}`)
}
}else if( url.includes('tiktok.com')) {
//tiktok
try {
const res = await fetch(`${baseRaikken}/tiktok-link?url=${encodeURIComponent(url)}&apikey=${RaikkenKey}`);
const json = await res.json();
if (!json.status || !json.data || !json.data.length) {
return enviar("⚠️ Vídeo não encontrado ou inválido.")};
const videoHD = json.data.find(v => v.type === "nowatermark_hd")?.url || json.data.find(v => v.type === "nowatermark")?.url || json.data[0].url;

const legenda = `
👤 Autor: ${json.author.nickname} (@${json.author.fullname})
📆 Postado em: ${json.taken_at}
📊 Visualizações: ${json.stats.views}
❤️ Curtidas: ${json.stats.likes}
🔄 Compartilhamentos: ${json.stats.share}

> ${Raikken}`.trim();

await subaru.sendMessage(from, {video: { url: videoHD }, caption: legenda, mimetype: 'video/mp4' }, { quoted: info });
} catch (e) {
reply(`Erro ao baixar video do tiktok. ${e}`)
}
} else if( url.includes('pinterest.com')) {
//pinterest
try {
const api = `${baseRaikken}/pinterest?url=${encodeURIComponent(url)}&apikey=${RaikkenKey}`;
const buffer = await getBuffer(api);

await subaru.sendMessage(from, {
image: buffer,
caption: `🖼️ Imagem do Pinterest\n🔗 Link: ${url}\n> ${Raikken}`,
}, { quoted: info });

} catch (err) {
reply('❌ Erro ao buscar imagem no Pinterest. Tente novamente.');
}
}else if( url.includes('x.com') || url.includes('twitter.com')) {
//Twitter
try {
const api = `${baseRaikken}/twitter?url=${encodeURIComponent(url)}&apikey=${RaikkenKey}`;
const res = await axios.get(api);
const data = res.data;

if (!data.status) return reply('❌ Não consegui processar o vídeo. Verifique o link.');

const { desc, HD } = data.resultado;
await subaru.sendMessage(from, {
video: { url: HD },
caption: `🎬 *Twitter/X Downloader*\n\n📝 *Descrição:* ${desc}\n> ${Raikken}`,
mimetype: 'video/mp4'
}, { quoted: info});

} catch (err) {
console.error(err);
reply('❌ Erro ao acessar a API ou processar o link.');
}

} else if ( url.includes('facebook.com') || url.includes('fb.watch')) {
//facebook
try {
const urlapi = `${baseRaikken}/facebook?url=${encodeURIComponent(url)}&apikey=${RaikkenKey}`;
const res = await axios.get(urlapi);
const data = res.data;

if (!data.status || !data.resultado || !data.resultado.status) {
return reply('❌ Não consegui processar esse vídeo. Link inválido ou protegido.')}

const { title, duration, thumbnail, links } = data.resultado;
const linkHD = links.find(v => v.quality.includes('720'))?.link;
const linkSD = links.find(v => v.quality.includes('360'))?.link;

const finalLink = linkHD || linkSD;
if (!finalLink) return reply('❌ Nenhum link de vídeo encontrado.');
const buffer = await getBuffer(finalLink); 
await subaru.sendMessage(from, {
video: buffer,
mimetype: 'video/mp4',
caption: `🎬 *${title}*\n⏱ Duração: ${duration}\n> ${Raikken}`,
}, { quoted: info });
} catch (err) {
console.error(err);
reply('❌ Erro ao baixar ou enviar o vídeo. Tente novamente.');
}}
} catch (e) {
botSemKey(subaru, from);
}
}
break;

case 'facebook': {

if (!q) return reply('📌 Envie o link de um vídeo do Facebook.\n\nExemplo:\n.facebook https://www.facebook.com/...');

try {
const url = `${baseRaikken}/facebook?url=${encodeURIComponent(q)}&apikey=${RaikkenKey}`;
const res = await axios.get(url);
const data = res.data;

if (!data.status || !data.resultado || !data.resultado.status) {
return reply('❌ Não consegui processar esse vídeo. Link inválido ou protegido.')}

const { title, duration, thumbnail, links } = data.resultado;
const linkHD = links.find(v => v.quality.includes('720'))?.link;
const linkSD = links.find(v => v.quality.includes('360'))?.link;

const finalLink = linkHD || linkSD;
if (!finalLink) return reply('❌ Nenhum link de vídeo encontrado.');
reply('📥 Baixando o vídeo, aguarde...');

const buffer = await getBuffer(finalLink); 
await subaru.sendMessage(from, {
video: buffer,
mimetype: 'video/mp4',
caption: `🎬 *${title}*\n⏱ Duração: ${duration}`,
}, { quoted: info });

} catch (err) {
console.error(err);
botSemKey(subaru, from);
}
}
break;

case 'twitter': {

if (!q) return reply('❗ Envie o link do post do Twitter/X.\n\nExemplo:\n.twitter https://x.com/usuario/status/123456');

try {
const api = `${baseRaikken}/twitter?url=${encodeURIComponent(q)}&apikey=${RaikkenKey}`;
const res = await axios.get(api);
const data = res.data;

if (!data.status) return reply('❌ Não consegui processar o vídeo. Verifique o link.');

const { desc, HD } = data.resultado;
await subaru.sendMessage(from, {
video: { url: HD },
caption: `🎬 *Twitter/X Downloader*\n\n📝 *Descrição:* ${desc}`,
mimetype: 'video/mp4'
}, { quoted: info});

} catch (err) {
console.error(err);
botSemKey(subaru, from);
}
}
break;

case 'gemini': {

if (!sz) return reply(`💬 Envie uma pergunta para o Gemini responder.\n\nExemplo:\n${prefixo}gemini Quem descobriu o Brasil?`);
waitReact()
try {
const res = await axios.get(`https://raikken-api.speedhosting.cloud/api/ia/gemini?prompt=${encodeURIComponent(sz)}&apikey=${RaikkenKey}`);

if (!res.data || !res.data.resultado) {
return reply("❌ Não consegui obter resposta do Gemini.");}

return reply(`🤖 *Resposta do Gemini:*\n\n${res.data.resultado}`);
} catch (err) {
console.error("Erro ao chamar Gemini:", err);
botSemKey(subaru, from);
}
break;}

case 'gpt': {

if (!sz) return reply(`💬 Envie uma pergunta para a IA responder.\n\nExemplo:\n${prefixo}ia O que é buraco negro?`);
waitReact()
try {

const url = `${baseRaikken}/ia/gpt4?prompt=${encodeURIComponent(sz)}&apikey=${RaikkenKey}`;
const res = await axios.get(url);

if (!res.data?.status || !res.data?.resultado) return reply("❌ Erro ao processar a resposta.");

await reply(`💡 *Resposta da IA:*\n\n${res.data.resultado}`);
} catch (err) {
console.error("Erro na IA =>", err);
botSemKey(subaru, from);
}

break;
}
 
 
case 'printsite': {

if (!sz) return reply(`🌐 Envie o link de um site para tirar print.\n\nExemplo:\n${prefixo}printsite https://google.com`);

try {
if (!sz.startsWith("http")) return reply("❌ Link inválido. Certifique-se de começar com http:// ou https://");
await reply("🖼️ Tirando print, aguarde...");

const url = `${baseRaikken}/printsite?url=${encodeURIComponent(sz)}&apikey=${RaikkenKey}`;
const res = await axios.get(url, { responseType: 'arraybuffer' });

await subaru.sendMessage(from, { image: res.data, caption: `📸 *Print do site solicitado:*\n${sz}\n> ©Subaru-V1`,
}, { quoted: info });

} catch (err) {
console.error("Erro printsite =>", err);
reply("❌ Erro ao tirar print do site. Verifique o link e tente novamente.");}

break;}

 case 'insta': {
 
if (!sz) return reply(`📷 Envie o link do vídeo do Instagram.\nExemplo:\n${prefixo}insta https://www.instagram.com/reel/xxxxx`);
await waitReact();

try {
const urlApi = `${baseRaikken}/instagram?url=${encodeURIComponent(sz)}&apikey=${RaikkenKey}`;
const res = await axios.get(urlApi);
const json = res.data;
if (!json.status || !json.resultado?.video) { return reply("❌ Não consegui baixar o vídeo. Verifique o link e tente novamente.");}
const { video, legenda, perfil } = json.resultado;
const buffer = await getBuffer(video);

await subaru.sendMessage(from, { video: buffer, caption: `🎬 *Reel de:* @${perfil}\n\n📝 ${legenda || "Sem legenda"}\n> ©Subaru-V1`}, { quoted: info });

} catch (err) {
console.error("Erro Insta =>", err);
botSemKey(subaru, from);
}
break;}
 
 
case 'pinterest': {

if (!sz) return reply(`📌 Envie o termo da pesquisa. Exemplo:\n${prefixo}pinterest naruto 5`);

await reply('⏳ Buscando imagens no Pinterest...');

const [query, qtdStr] = sz.split(',');
const total = Math.min(Number(qtdStr) || 5, 10);
let cards = [], i = 1;

for (let count = 0; count < total; count++) {
try {
const url = `https://raikken-api.speedhosting.cloud/api/pinterest?query=${query}&apikey=${RaikkenKey}`;
const buffer = await getBuffer(url); // download da imagem

const { imageMessage } = await generateWAMessageContent({
image: buffer
}, {
upload: subaru.waUploadToServer
});

cards.push({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: `🔍 Resultado ${i++} de *${query.trim()}*`,
}),
footer: proto.Message.InteractiveMessage.Footer.fromObject({
text: "> ⚡ via Raikken-API",
}),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: "*Pinterest*",
hasMediaAttachment: true,
imageMessage
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Abrir no Pinterest",
url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query.trim())}`,
merchant_url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query.trim())}`
})
}]
})
});

} catch (err) {
console.error(`[❌] Erro ao buscar imagem ${count + 1}:`, err.message || err);
botSemKey(subaru, from);
}
}

if (cards.length === 0) return reply("❌ Não consegui obter imagens. Tente outro termo.");

const msg = generateWAMessageFromContent(from, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2,
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({
text: `🔎 Pesquisa por: *${query.trim()}*`,
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: botName
}),
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: false,
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards
})
})
}
}
}, {});

await subaru.relayMessage(from, msg.message, { messageId: msg.key.id });
break;
}

case 'ttk': {

if (!q) return enviar("🚫 Envie o link de um vídeo do TikTok.");
await waitReact();
try {
const res = await fetch(`${baseRaikken}/tiktok-link?url=${encodeURIComponent(q)}&apikey=${RaikkenKey}`);
const json = await res.json();
if (!json.status || !json.data || !json.data.length) {
return enviar("⚠️ Vídeo não encontrado ou inválido.")};
const videoHD = 
json.data.find(v => v.type === "nowatermark_hd")?.url ||
json.data.find(v => v.type === "nowatermark")?.url ||
json.data[0]?.url;
const legenda = `
┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓֪࣪
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃࣪ ✿𖥔࣪ *☽˚｡✧❖ 𝑻𝑰𝑲𝑻𝑶𝑲 ❖✧☽˚｡* ✿𖥔࣪
┃࣪ ┃࣪ 👤 *Autor:* ${json.author.nickname} (@${json.author.fullname})
┃࣪ ┃࣪ 🕒 *Duração:* ${json.duration}
┃࣪ ┃࣪ 📆 *Postado em:* ${json.taken_at}
┃࣪ ┃࣪ 📊 *Visualizações:* ${json.stats.views}
┃࣪ ┃࣪ ❤️ *Curtidas:* ${json.stats.likes}
┃࣪ ┃࣪ 💬 *Comentários:* ${json.stats.comment}
┃࣪ ┃࣪ 🔄 *Compartilhamentos:* ${json.stats.share}
┃࣪ ┃࣪ 🎬 *${json.title}*
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛
> _𝑹𝒂𝒊𝒌𝒌𝒆𝒏-𝑨𝒑𝒊⚡_`.trim();

await subaru.sendMessage(from, {video: { url: videoHD }, caption: legenda, mimetype: 'video/mp4' });
} catch (e) {
console.error(e);
botSemKey(subaru, from);
} 
break;}

case 'tksrc': {

if (!q) return enviar("🚫 Insira o nome ou termo para pesquisar vídeos no TikTok.");
await waitReact();
try {
const res = await fetch(`${baseRaikken}/tiktok-src?q=${encodeURIComponent(q)}&apikey=${RaikkenKey}`);
const json = await res.json();
if (!json.resultado || !Array.isArray(json.resultado)) {
return enviar("⚠️ Nenhum resultado encontrado.");}
const lista = json.resultado;
const linkAleatorio = lista[Math.floor(Math.random() * lista.length)];
await subaru.sendMessage(from, { video: { url: linkAleatorio }, caption: `🎵 *TikTok Source*\n🔎 Termo: ${q}\n🌐`
}, { quoted: info});
} catch (e) {
botSemKey(subaru, from);
}
break;
}

case 'rgtinder': {
const rgValue = q; 
try {
let endpoint = `https://raikken-api.speedhosting.cloud/api/tinder/login?usu=${sender}`;

if (rgValue && !isImage) {
endpoint += `&rg=${encodeURIComponent(rgValue)}`;
} else if (isImage && linkft) {
endpoint += `&rg=${encodeURIComponent(linkft)}`;
}

const response = await axios.get(endpoint);
const { message } = response.data;
if (!message) return reply("A API retornou uma resposta vazia. Tente novamente.");

reply(detectTinder(message));

} catch (error) {
console.error("Erro no comando rgtinder:", error);
const errorMessage = error.response?.data?.message || "Ocorreu um pequeno erro, tente novamente mais tarde!";
reply(errorMessage);
}
}
break

case 'rolar': {
await react("🔥");
if (!isGroup) return reply("Este comando só pode ser usado em grupos.");

try {
const userProfileResponse = await axios.get(`https://raikken-api.speedhosting.cloud/api/tinder/perfil?usu=${sender}`);
if (!userProfileResponse.data.dados || userProfileResponse.data.dados.length === 0) {
 return reply("Você não está registrado! Use o comando de registro para começar.");
}
const meuPerfil = userProfileResponse.data.dados[0];
const findResponse = await axios.get(`https://raikken-api.speedhosting.cloud/api/tinder/find?usu=${sender}`);
if (!findResponse.data.dados || findResponse.data.dados.length === 0) {
return reply(findResponse.data.message || "Nenhum usuário encontrado no momento. Tente mais tarde!");
}
const dupla = findResponse.data.dados[0];
let texto = `*Raikken-API's Tinder 👫🌟*\n—\n`;
texto += `• [💖] Usuário: ${dupla.name}\n`;
texto += `• WhatsApp: wa.me/${dupla.userId.split('@')[0]}\n`;
texto += `• [⏳] Idade: ${dupla.age} anos.\n`;
texto += `• [🏳‍🌈] Sexualidade: ${dupla.sexuality}\n`;
texto += `• [🚻] Gênero: ${dupla.gender}\n`;
texto += `• [💌] *Bio:* ${dupla.bio}\n—\n`;
const buttons = [

{ buttonId: `${prefix}like ${dupla.userId}`, buttonText: { displayText: '💖 Like' }, type: 1 },
{ buttonId: `${prefix}dislike ${dupla.userId}`, buttonText: { displayText: '💔 Dislike' }, type: 1 }
];

const buttonMessage = {
image: { url: `${dupla.photo}` },
caption: texto,
footer: "Escolha uma opção para reagir ao perfil!",
buttons: buttons,
headerType: 4
};

await subaru.sendMessage(from, buttonMessage, { quoted: info });

} catch (error) { 
console.error("Erro no comando rolar:", error);
const errorMessage = error.response?.data?.message || "Ocorreu um pequeno erro ao buscar um par para você!";
reply(detectTinder(errorMessage));
}
}
break

case 'tindernome': 
case 'tinderidade': 
case 'tinderbio': 
case 'setgene': 
case 'setsex': 
case 'setfiltro': 
case 'tinderfoto': {
if (!isGroup) return reply("Só pode ser usado em grupos!"); 
if (!q && !isImage) return reply(`Por favor, forneça um valor. Ex: #${command} novo valor`);

try {
let finalQueryValue = q;
if (command === "tinderfoto") {
if (!isImage) return reply("Você precisa marcar uma imagem para definir como foto de perfil.");
try {
var Fl = info?.message?.extendedTextMessage?.contextInfo?.quotedMessage
var muk = Fl?.viewOnceMessageV2?.message?.imageMessage || Fl?.viewOnceMessage?.message?.imageMessage || Fl?.imageMessage;
let base64String = await getFileBuffer(muk, "image");
var abcd = await uploadX(base64String);//Use o upload de seu bot, no meu caso, estou usando de uma outra API. 
finalQueryValue = abcd;
} catch (error) {
console.error("Erro ao processar imagem:", error);
return reply("Não foi possível processar a imagem. Tente novamente!");
}
}
const endpoint = `https://raikken-api.speedhosting.cloud/api/tinder/config?usu=${sender}&mod=${command}&q=${encodeURIComponent(finalQueryValue)}`;
const response = await axios.get(endpoint);
if (!response.data || !response.data.message) throw new Error("Resposta inválida da API");
reply(detectTinder(response.data.message));

} catch (error) {
console.error(`Erro no comando ${command}:`, error);
const errorMessage = error.response?.data?.message || `Ocorreu um pequeno erro, tente novamente mais tarde.\n${error.message}`;
reply(errorMessage);
}
}
break

case 'meutinder': {
if (!isGroup) return reply("Só pode ser usado em grupos");
try {
const response = await axios.get(`${baseRaikkenTinder}/perfil?usu=${sender}`);
if (!response.data.dados || response.data.dados.length === 0) {
 return reply(response.data.message || "Usuário não encontrado. Use o comando de registro para começar.");
}
const perfil = response.data.dados[0];

let envMyTinder = `• [💖] Usuári${perfil.gene === "masculino" ? "o" : "a"}: ${perfil.nome}\n`;
envMyTinder += `• [⏳] Idade: ${perfil.idade} anos.\n`;
envMyTinder += `• [📞] WhatsApp: wa.me/${perfil.nmr[0]}\n`;
envMyTinder += `• [🏳️‍🌈] Sexualidade: ${perfil.sexualidade}\n`;
envMyTinder += `• [🚻] Gênero: ${perfil.gene}\n`;
envMyTinder += `• [📍] Filtro: ${perfil.filtro == 3 ? `Não há preferência.` : `Busca por ${perfil.filtro == 1 ? `homens` : `mulheres`}`}\n`;
envMyTinder += `—\n• [😺] Bio: ${perfil.bio}\n`;

await subaru.sendMessage(from, {
text: envMyTinder, 
contextInfo: {
externalAdReply: { 
title: `Raikken-API's Tinder! 💘`,
body: `😌🌟 Este é o seu perfil atual!`,
thumbnail: await getBuffer(perfil.foto), 
mediaType: 1, 
showAdAttribution: true,
sourceUrl: baseRaikkenTinder
}
}
}, { quoted: info });

} catch (error) {
console.error("Erro em meutinder:", error);
const errorMessage = error.response?.data?.message || "Ocorreu um pequeno problema, tente novamente mais tarde.";
reply(detectTinder(errorMessage));
}
}
break

case 'teste':
try {
await subaru.sendMessage(from, { text: "Hello World", ai: true });
} catch (e) {
console.log(e)
}
break

case 'sairtinder':
case 'rmtinder': {
if (!isGroup) return reply("Só pode ser usado em grupos");

let userToDelete = sender; 
if (command === 'rmtinder') {
if (!isDono) return reply("Somente o dono pode usar este comando.");
if (!q && !alvo) return reply("Marque ou informe o número do usuário a ser removido.");
userToDelete = alvo ? alvo[0] : identifyAtSign(q); 
}

try {
const response = await axios.get(`${baseRaikkenTinder}/delete?usu=${userToDelete}`);
reply(detectTinder(response.data.message));
} catch (error) {
console.error("Erro ao deletar usuário:", error);
const errorMessage = error.response?.data?.message || "Ocorreu um pequeno erro, tente novamente mais tarde.";
reply(errorMessage);
}
}
break

case 'like': {
if (!q) return reply("Responda à mensagem do perfil ou use o comando com o @ do usuário que deseja curtir.");
const alvo = q.includes('@s.whatsapp.net') ? q : identifyAtSign(q.replace('@', '')); 

try {
const response = await axios.get(`${baseRaikkenTinder}/like?usu=${sender}&alvo=${alvo}`);
const data = response.data;

if (data.success) {
if (data.message.includes("Match")) {
await subaru.sendMessage(sender, {
text: `💘 *É UM MATCH!* 💘\n${data.message}`,
contextInfo: {
mentionedJid: [sender, alvo],
externalAdReply: {
title: "Raikken-API's Tinder",
body: "😌🌟 Vocês se curtiram mutuamente!",
thumbnail: await getBuffer('https://i.imgur.com/3G5K5rG.png'),
mediaType: 1,
sourceUrl: baseRaikkenTinder
}
}
}, { quoted: info });

try {
const perfilMatchResponse = await axios.get(`${baseRaikkenTinder}/perfil?usu=${alvo}`);
if (perfilMatchResponse.data && perfilMatchResponse.data.dados) {
const matchUser = perfilMatchResponse.data.dados[0];
const matchInfo = `*🔥 PERFIL DO SEU MATCH: ${matchUser.nome} 🔥*\n\n` +
`• Idade: ${matchUser.idade}\n` +
`• Gênero: ${matchUser.gene}\n` +
`• Bio: ${matchUser.bio}\n\n` +
`Iniciem uma conversa! wa.me/${matchUser.nmr[0]}`;
await subaru.sendMessage(from, { image: { url: matchUser.foto }, caption: matchInfo });
}
} catch (matchError) {
console.error("Erro ao buscar perfil do match:", matchError);
reply("Deu match, mas não consegui buscar o perfil do outro usuário.");
}

} else {
reply(data.message);
}
} else {
reply(data.message || "Ocorreu um erro ao curtir o usuário.");
}
} catch (err) {
console.error("Erro no comando like:", err);
const errorMessage = err.response?.data?.message || "Ocorreu um erro ao tentar curtir o usuário.";
reply(errorMessage);
}
}
break

case 'dislike': {
if (!q) return reply("Use este comando respondendo a um perfil ou com o @ do usuário.");

const alvo = q.includes('@s.whatsapp.net') ? q : identifyAtSign(q.replace('@', ''));

try {
const response = await axios.get(`${baseRaikkenTinder}/dislike?usu=${sender}&alvo=${alvo}`);
reply(response.data.message || "Ação registrada.");
} catch (err) {
console.error("Erro no comando dislike:", err);
const errorMessage = err.response?.data?.message || "Ocorreu um erro ao registrar sua ação.";
reply(errorMessage);
}
}
break

case 'stalkinsta':{

if (!q) {return reply(`Cadê o usuário?\n\nExemplo de uso:\n${prefix}stalkinsta @raikkenapi`)}
react('🫟')
try {
let usuario = q.replace('@', '').trim()
let url = `https://raikken-api.speedhosting.cloud/api/stalk/insta?user=${usuario}&apikey=${RaikkenKey}`
let res = await fetch(url)
let json = await res.json()
 if (!json.status) {return reply(`Perfil nao encontrado!`)}

let perfil = json.resultado
let txt = `┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💖࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Usuário: *${perfil.username}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Nome: *${perfil.name}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Seguidores: *${perfil.followers}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Posts: *${perfil.uploads}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Engajamento: *${perfil.engagement}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Link: ${perfil.profileUrl}
┃──────────────
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ Bio:
┃ ${perfil.bio || "—"}
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💖࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`

await subaru.sendMessage(from, { image: { url: perfil.avatar }, caption: txt}, { quoted: info })

} catch (e) {
console.error(e)
botSemKey(subaru, from);
}
}
break

case 'stalkttk': {

if (!q) {return reply(`Qual o usuário?\n\nExemplo de uso:\n${prefix}stalkttk _doofy.sz`) }
react('🫟')
try {
let usuario = q.replace('@', '').trim()
let url = `https://raikken-api.speedhosting.cloud/api/stalktiktok?username=${usuario}&apikey=${RaikkenKey}`
let res = await fetch(url)
let json = await res.json()
 if (!json.sucesso && !json.resultado?.status) {returnreply(`> ┃ ❌ *Perfil não encontrado.*`) }

let perfil = json.resultado
let txt = `┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫📱࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Usuário: *${perfil.username}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Seguidores: *${perfil.followers}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Seguindo: *${perfil.following}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Curtidas: *${perfil.likes}*
┃──────────────
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Link: https://tiktok.com/@${perfil.username}
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫📱࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`
await subaru.sendMessage(from, { image: { url: perfil.avatar|| defaultAvatar },caption: txt }, { quoted: info })

} catch (e) {
console.error(e)
botSemKey(subaru, from);
}
}
break

case 'stalkyt':{

if (!q) {return reply(`Qual o usuário?\n\nExemplo de uso:\n${prefix}stalkyt lilgiela33`) }
react('🫟')
try {
let usuario = q.replace('@', '').trim()
let url = `https://raikken-api.speedhosting.cloud/api/stalk/yt?username=${usuario}&apikey=${RaikkenKey}`
let res = await fetch(url)
let json = await res.json()

if (!json.sucesso || !json.resultado) {
return reply(`> ┃ ❌ *Canal não encontrado.*`)}

let canal = json.resultado
let txt = `┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫▶️࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Canal: *${canal.name}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Username: *${canal.username}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Inscritos: *${canal.subscribers || "Oculto"}*
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Link: ${canal.url}
┃──────────────
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Descrição:
┃ ${canal.description || "—"}
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫▶️࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ═┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`

await subaru.sendMessage(from, { image: { url: canal.image || defaultAvatar }, caption: txt }, { quoted: info })
if (canal.banner) {
await subaru.sendMessage(from, { 
image: { url: canal.banner }, 
caption: `🎨 Banner do canal *${canal.name}*` 
}, { quoted: info })
}
if (canal.videos && canal.videos.length > 0) {
let ultimos = canal.videos.slice(0, 3).join('\n')
await subaru.sendMessage(from, { text: `📺 Últimos vídeos:\n${ultimos}` }, { quoted: info })}

} catch (e) {
console.error(e)
botSemKey(subaru, from);
}
}
break

case 'stalkff': {

react('🫟')
if (!q) return reply("❌ Informe o *ID do jogador*!"); 
try {
let res = await fetch(`https://raikken-api.speedhosting.cloud/api/stalk/perfil-ff?id=${q}&apikey=${RaikkenKey}`);
let json = await res.json();

if (!json.status) return reply("❌ Não encontrei nada com esse ID!");

let r = json.resultado;
let texto = `
┏╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🎮⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┓
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Nome: ${r.name}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪ID: ${r.id}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Level: ${r.level}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Guilda: ${r.guilda || "Nenhuma"}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Nível da Guilda: ${r.nivel_guilda || "-"}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Região: ${r.regiao}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Criado em: ${r.criado_em}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Último login: ${r.ultimo_login}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Passe Booyah: ${r.passe_booyah}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Bio: ${r.bio || "Nenhuma"}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞✿𖥔࣪Atualizado em: ${r.atualizado_em}
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💀࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ═╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🔥⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ═╼┛`;

await subaru.sendMessage(from, { image: { url: defaultAvatar }, caption: texto.trim()}, { quoted: info });
} catch (e) {
console.error(e);
botSemKey(subaru, from);
}
}
break;


default:

if(isCmd) {
try {
setTimeout(() => {react("🔴")}, 1000)
AB = similarityCmd(command)
notcmd = privateCmd(sender, prefix+command, AB[0].comando, AB[0].porcentagem)
mention(notcmd, groupMemb2)
} catch (e) {
console.log(e)
}}

}} catch (error) {
console.error(`Erro ao processar o comando '${command}':`, error);
if (!botSemKey(subaru, from)) return
}
} // aqui fecha o else

}//CUIDADO, AQUI FECHA A FUNÇÃO !!


module.exports = { handleCmds };

fs.watchFile(__filename, () => {
console.log(`Arquivo '${__filename}' foi modificado. Reiniciando...`);
process.exit();
}); 