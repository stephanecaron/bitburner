import {findAllServers} from 'scripts/findAllServers.js'
/** @param {NS} ns */
export async function main(ns) {
  let serversList = await findAllServers(ns)
  for (const server of serversList){
    let serverFiles = ns.ls(server)
    for (const file of serverFiles) {
      if (file.includes('.cct')) {
        ns.tprint(`server : ${server} has a contract ${file}`)
        let path = []
        let currentServer = server
        let antiInfinite = 0
        while (currentServer != 'home' && antiInfinite < 100) {
          path.push(currentServer)
          currentServer = ns.scan(currentServer)[0]
          antiInfinite++
        }
        ns.tprint(`server path is ${path.reverse().join('/')}`)
        ns.tprint('-------------------------------')
      }
    }
  }
}