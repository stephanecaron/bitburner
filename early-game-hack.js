/** @param {NS} ns */
export async function main(ns) {
    let configs = ns.read('configs.txt')
    let configsArray = configs.split('\r\n')
    let moneyFarm = configsArray.find(config => config.includes('moneyFarm:'))?.split(':')[1]?.trim().split(',');
  
    let target = moneyFarm[Math.floor(Math.random() * moneyFarm.length)]
  
    const moneyThresh = ns.getServerMaxMoney(target);
  
    const securityThresh = ns.getServerMinSecurityLevel(target);
  
    while (true) {
      if (ns.getServerSecurityLevel(target) > securityThresh) {
        await ns.weaken(target);
      } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
        await ns.grow(target);
      } else {
        await ns.hack(target);
      }
    }
  }