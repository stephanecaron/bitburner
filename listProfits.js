import { findHackedServers } from 'scripts/findHackedServers.js'
/** @param {NS} ns */

export async function main(ns) {
    let serversList = await findHackedServers(ns)
  
    for (const target of serversList) {
      let maxMoney = ns.getServerMaxMoney(target)
      if (maxMoney == 0) {
        continue;
      }
      let growth = ns.getServerGrowth(target)
      if (growth < 5) {
        continue;
      }
      let currentMoney = Math.round(ns.getServerMoneyAvailable(target), 0)
      let currentSecurity = Math.round(ns.getServerSecurityLevel(target) * 100) / 100
      ns.tprint(` ${shortenNumber(maxMoney)}\$ (${ns.getServerMinSecurityLevel(target)}) Security ${growth} Growth ${target}`)
    }
  }
  
  function shortenNumber(number) {
    const suffixes = ["", "K", "M", "B", "T"];
  
    let suffixIndex = 0;
    while (number >= 1000 && suffixIndex < suffixes.length - 1) {
      number /= 1000;
      suffixIndex++;
    }
  
    const formattedNumber = number.toLocaleString(undefined, { maximumFractionDigits: 1 });
  
    return formattedNumber + suffixes[suffixIndex];
  }