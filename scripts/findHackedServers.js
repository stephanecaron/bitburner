import {findAllServers} from 'scripts/findAllServers.js'
/** @param {NS} ns */
export async function findHackedServers(ns) {
  let hackedServers = []
  const serversList = await findAllServers(ns)
  for (const server of serversList) {
    if (ns.hasRootAccess(server) && ns.getServerMaxRam(server) != 0 && server != 'home') {
      hackedServers.push(server)
    }
  }
  return hackedServers
}