/** @param {NS} ns */
export async function main(ns) {
    let configs = ns.read('configs.txt')
    let configsArray = configs.split('\r\n')
    let maxThreads = configsArray.find(config => config.includes('maxThreads:'))?.split(':')[1]?.trim();
    let moneyFarm = configsArray.find(config => config.includes('moneyFarm:'))?.split(':')[1]?.trim().split(',');
    let hackingScript = configsArray.find(config => config.includes('hackingScript:'))?.split(':')[1]?.trim();
  }