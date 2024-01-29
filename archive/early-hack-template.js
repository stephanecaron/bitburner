/** @param {NS} ns */

export async function main(ns) {
    const targetsTxt = ns.read('serversMoney.txt')
  
    const targets = targetsTxt.split('\r\n')
  
    while (true) {
      let target = targets[Math.floor(Math.random() * targets.length)]
      const moneyThresh = ns.getServerMaxMoney(target);
      const securityThresh = ns.getServerMinSecurityLevel(target);
      if (ns.getServerSecurityLevel(target) > securityThresh) {
        await ns.weaken(target);
      } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
        await ns.grow(target);
      } else {
        await ns.hack(target);
      }
    }
  }
  