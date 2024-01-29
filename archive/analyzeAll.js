/** @param {NS} ns */

export async function main(ns) {

    const targetsTxt = ns.read('serverScripts.txt')
  
    const targets = targetsTxt.split('\r\n')
    for (const target of targets) {
      let currentMoney = Math.round(ns.getServerMoneyAvailable(target), 0)
      let maxMoney = ns.getServerMaxMoney(target)
      let currentSecurity = Math.round(ns.getServerSecurityLevel(target) * 100) / 100
      if (maxMoney > 0) {
        ns.tprint(`${target} server has : ${shortenNumber(currentMoney)}/${shortenNumber(maxMoney)}\$ (${(Math.round((currentMoney / maxMoney) * 100, 2))}%) and ${currentSecurity}(${ns.getServerMinSecurityLevel(target)}) server security`)
      }
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