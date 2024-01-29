import {executeScripts} from 'scripts/executeScripts.js'
/** @param {NS} ns */
export async function main(ns) {

  const ram = ns.args[0];
  if (!ram || ram == 0) {
    ns.tprint('you need to enter ram # after buy')
    ns.exit();
  }

  let i = ns.getPurchasedServers().length;

  while (i < ns.getPurchasedServerLimit()) {
    if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {

      let hostname = ns.purchaseServer("pserv-" + i, ram);
      await executeScripts(ns, hostname)
      ++i;
      ns.tprint(`bought ${hostname} for ${ns.getPurchasedServerCost(ram)}`)
    }
    await ns.sleep(1000);
  }
}