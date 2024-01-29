import { findAllServers } from 'scripts/findAllServers.js'
/** @param {NS} ns */
export async function findHackableServers(ns) {
  let availableServers = []
  let currentHackingSkill = ns.getHackingLevel()
  let currentPortCapacity = 0
  if (ns.fileExists('BruteSSH.exe', 'home')) {
    currentPortCapacity += 1
  }
  if (ns.fileExists('FTPCrack.exe', 'home')) {
    currentPortCapacity += 1
  }
  if (ns.fileExists('relaySMTP.exe', 'home')) {
    currentPortCapacity += 1
  }
  if (ns.fileExists('HTTPWorm.exe', 'home')) {
    currentPortCapacity += 1
  }
  if (ns.fileExists('SQLInject.exe', 'home')) {
    currentPortCapacity += 1
  }
  const serversArray = await findAllServers(ns)
  for (const server of serversArray) {
    let hostname = ns.getServer(server)['hostname']
    let root = ns.getServer(server)['hasAdminRights']
    let numOpenPortsRequired = ns.getServer(server)['numOpenPortsRequired']
    let requiredHackingSkill = ns.getServer(server)['requiredHackingSkill']
    if (numOpenPortsRequired <= currentPortCapacity
      && !root
      && requiredHackingSkill <= currentHackingSkill) {
      availableServers.push(hostname)
    }
  }
  return availableServers
}