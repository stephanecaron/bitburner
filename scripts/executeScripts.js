/** @param {NS} ns */
export async function executeScripts(ns, hostname) {
    let configs = ns.read('configs.txt')
    let configsArray = configs.split('\r\n')
    let maxThreads = configsArray.find(config => config.includes('maxThreads:'))?.split(':')[1]?.trim();
    let moneyFarm = configsArray.find(config => config.includes('moneyFarm:'))?.split(':')[1]?.trim().split(',');
    let hackingScript = configsArray.find(config => config.includes('hackingScript:'))?.split(':')[1]?.trim();
  
    ns.scp('configs.txt', hostname, 'home')
    ns.scp(hackingScript, hostname, 'home')
    let ram = ns.getServerMaxRam(hostname)-ns.getServerUsedRam(hostname)
    let cost = ns.getScriptRam(hackingScript)
    let possibleThreads = Math.floor(ram / cost)
    let fullInstances = Math.floor(possibleThreads / maxThreads)
    let leftOverInstance = possibleThreads - (fullInstances * maxThreads)
    for (let i = 0; i < fullInstances; i++) {
      ns.exec(hackingScript, hostname, maxThreads);
    }
    if (leftOverInstance != 0) {
      ns.exec(hackingScript, hostname, leftOverInstance)
    }
  }