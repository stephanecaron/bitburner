/** @param {NS} ns */
export async function main(ns) {
    let maxThreads = ns.args[0]
    if (!maxThreads || maxThreads == 0) {
      ns.tprint('bro you need to provide me a maxThread')
      ns.exit()
    }
    let scriptName = 'early-hack-template.js'
    const targetsTxt = ns.read('serverScripts.txt')
  
    const targets = targetsTxt.split('\r\n')
  
    const cost = ns.getScriptRam(scriptName)
  
    for (const target of targets) {
      let deployedThreads = 0
      ns.scriptKill(scriptName, target)
      let currentMemory = ns.getServerMaxRam(target) - ns.getServerUsedRam(target)
      let possibleInstances = Math.floor(currentMemory / cost)
      ns.scp('serversMoney.txt', target)
      ns.scp(scriptName, target)
      while (deployedThreads < possibleInstances) {
        ns.exec(scriptName, target, Math.min(possibleInstances, maxThreads))
        deployedThreads += Math.min(possibleInstances, maxThreads)
      }
    }
  
    ns.scriptKill(scriptName, 'home')
    let localMemory = ns.getServerMaxRam('home') - ns.getServerUsedRam('home') - 10
    let localDeployedThreads = 0
    let localPossibleInstances = Math.floor(localMemory / cost)
    while (localDeployedThreads < localPossibleInstances) {
      ns.exec(scriptName, 'home', Math.min(localPossibleInstances, maxThreads))
      localDeployedThreads += Math.min(localPossibleInstances, maxThreads)
    }
  }