import {findAllServers} from 'scripts/findAllServers.js'
/** @param {NS} ns */
export async function main(ns) {
  let serversList = await findAllServers(ns)
  for (const server of serversList){
    await ns.singularity.installBackdoor(server)
    ns.tprint(`backdoor installed on ${server}`)
  }
}