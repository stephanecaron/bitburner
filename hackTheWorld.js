import { findHackableServers } from 'scripts/findHackableServers.js'
import { executeScripts } from 'scripts/executeScripts.js'
/** @param {NS} ns */

export async function main(ns) {
  while (true) {
    let serversList = await findHackableServers(ns)
    if (serversList.length != 0) {
      for (const hostname of serversList) {
        if (ns.fileExists('BruteSSH.exe', 'home')) {
          ns.brutessh(hostname)
        }
        if (ns.fileExists('FTPCrack.exe', 'home')) {
          ns.ftpcrack(hostname)
        }
        if (ns.fileExists('relaySMTP.exe', 'home')) {
          ns.relaysmtp(hostname)
        }
        if (ns.fileExists('HTTPWorm.exe', 'home')) {
          ns.httpworm(hostname)
        }
        if (ns.fileExists('SQLInject.exe', 'home')) {
          ns.sqlinject(hostname)
        }
        ns.nuke(hostname)
        await executeScripts(ns, hostname)
        ns.tprint(`Hacked: ${hostname}`)
      }
    }
    await ns.sleep(10000)
  }
}