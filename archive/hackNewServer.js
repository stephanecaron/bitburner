/** @param {NS} ns */

export async function main(ns) {
    let hostname = ns.args[0]
    if (ns.fileExists('BruteSSH.exe', "home")) {
      ns.brutessh(hostname);
    }
    if (ns.fileExists('FTPCrack.exe', "home")) {
      ns.ftpcrack(hostname);
    }
    if (ns.fileExists('relaySMTP.exe','home')) {
      ns.relaysmtp(hostname);
    }
    if (ns.fileExists('HTTPWorm.exe','home')) {
      ns.httpworm(hostname)
    }
    
    ns.nuke(hostname)
    let scriptName = 'early-hack-template.js'
    let cost = ns.getScriptRam(scriptName)
    let ram = ns.getServerMaxRam(hostname)
    let possibleInstances = Math.floor(ram / cost)
    ns.scp("early-hack-template.js", hostname);
    ns.scp('serversMoney.txt', hostname);
    ns.exec(scriptName, hostname, possibleInstances);
    ns.write('serverScripts.txt', `\r\n${hostname}`);
    ns.tprint(`hacked ${hostname} and updated serverScripts.txt`);
  }