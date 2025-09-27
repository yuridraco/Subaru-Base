// =================================================================
//                    ARQUIVO DE EXPORTAÇÃO                   
// =================================================================

// -------------------( MÓDULOS NODE E NPM )-------------------
const os = require("os");
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const crypto = require('crypto');
const axios = require('axios');
const fetch = require('node-fetch');
const moment = require('moment-timezone');
const FormData = require("form-data");
const cheerio = require('cheerio');
//const cfonts = require('cfonts')
const util = require('util');

// -------------------( MÓDULOS DO PROJETO )-------------------
const { loadJSON,  saveJSON } = require('./functions.js')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../database/figurinhas/exif');
const { imageToWebp2, videoToWebp2, writeExifImg2, writeExifVid2 } = require('../database/figurinhas/exif2');

// -------------------( CONSTS E CONFIGURAÇÕES )-------------------
const timeZone = 'America/Sao_Paulo';
function agora() {
  return moment().tz(timeZone);
}

const mss = {
    espere: "⏳ Por favor, aguarde...",
    botadm: "🤖 Preciso ser administrador do grupo para fazer isso!",
    grupo: "❗ Este comando só pode ser usado em grupos!",
    adm: "👑 Este comando é exclusivo para administradores do grupo.",
    dono: "💀Esse comando é exclusivo para o meu dono.",
    apiErro: "😶‍🌫️ Por algum motivo, a Raikken-Api não retornou dados. Tente novamente, ou avise um adm de lá.",
    api: "⚡ Enquanto esperamos, que tal dar uma olhada na Raikken? Da uma olhadinha: https://raikken-api.speedhosting.cloud/ "
};

const sendPoll = (nagatoro, id, name = '', values = [], selectableCount = 1) => { 
return nagatoro.sendMessage(id, {poll: {name, values, selectableCount}, messageContextInfo: { messageSecret: randomBytes(32)}}, {id, options: {userJid: nagatoro?.user?.id}}).catch(() => {
return console.log(console.error);
});}

const getMembros = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == null) admins.push(i.id)
}
return admins
}

function getAdmins(members) {
  return members.filter(m => m.admin !== null).map(m => m.id)
}

 
// =====================EXPORTS =====================\\
module.exports = {
  os,
  fs,
  path,
  exec,
  spawn,
  crypto,
  axios,
  fetch,
  FormData,
  cheerio,
  moment,
  agora,
  mss,
  sendPoll,
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
  imageToWebp2,
  videoToWebp2,
  writeExifImg2,
  writeExifVid2,
  getMembros,
  getAdmins,
  util,
  loadJSON,  
  saveJSON
};
