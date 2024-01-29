import { findHackedServers } from 'scripts/findHackedServers.js'
import { executeScripts } from 'scripts/executeScripts.js'
/** @param {NS} ns */
export async function main(ns) {
  let serversList = await findHackedServers(ns)
  for (const server of serversList) {
    ns.killall(server)
    await executeScripts(ns,server)
  }
}