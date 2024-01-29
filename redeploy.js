import { findHackedServers } from 'scripts/findHackedServers.js'
import { executeScripts } from 'scripts/executeScripts.js'
/** @param {NS} ns */
export async function main(ns) {
  if (ns.args[0] && ns.args.length == 1) {
    let server = ns.args[0]
    if (server == 'home') {
        let configs = ns.read('configs.txt')
        let configsArray = configs.split('\r\n')
        let hackingScript = configsArray.find(config => config.includes('hackingScript:'))?.split(':')[1]?.trim();
        ns.scriptKill(hackingScript,'home')
    } else {
      ns.killall(server)
    }
    await executeScripts(ns, server)
    ns.exit()
  }
  let serversList = await findHackedServers(ns)
  for (const server of serversList) {
    ns.killall(server)
    await executeScripts(ns, server)
  }
}