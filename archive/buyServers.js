export async function main(ns) {
    const ram = ns.args[0];
    const maxThreads = ns.args[1];
    if (!ram || ram == 0) {
      ns.tprint('you need to input rams bitch')
      ns.exit()
    }
    if (!(ram & (ram - 1)) === 0 && ram !== 0) {
      ns.tprint('the number is not power of 2')
      ns.exit()
    }
    if (!maxThreads) {
      ns.tprint('give me a max thread')
      ns.exit()
    }
    let i = ns.getPurchasedServers().length;
  
    while (i < ns.getPurchasedServerLimit()) {
      if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
        let deployedThreads = 0
        let hostname = ns.purchaseServer("pserv-" + i, ram);
        let scriptName = 'early-hack-template.js'
        let cost = ns.getScriptRam(scriptName)
        let possibleInstances = Math.floor(ram / cost)
        ns.scp("early-hack-template.js", hostname);
        ns.scp('serversMoney.txt', hostname);
        while (deployedThreads < possibleInstances) {
          ns.exec(scriptName, hostname, Math.min(possibleInstances, maxThreads))
          deployedThreads += Math.min(possibleInstances, maxThreads)
        }
        ns.write('serverScripts.txt', `\r\n${hostname}`);
        ++i;
        ns.tprint(`bought ${hostname} and updated serverScripts.txt`);
      }
      await ns.sleep(1000);
    }
    ns.exit()
  }