/** @param {NS} ns */
export async function main(ns) {
    let server = ns.args[0]
    let currentServer = server
    let path = []
    while (currentServer != 'home') {
      path.push(currentServer)
      currentServer = ns.scan(currentServer)[0]
      await ns.sleep(1000)
    }
    ns.tprint(path.reverse().join(' -> \n'))
  }