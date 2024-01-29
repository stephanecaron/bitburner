/** 
 * @param {object} ns - Namespace object 
 */

export async function scanServers(ns) {
    let scanned = new Set(['home']);
  
    let currentScan = [];
    let newServers = true;
  
    while (newServers) {
      newServers = false;
  
      for (let server of Array.from(scanned)) {
        currentScan = ns.scan(server);
        currentScan.forEach((newServer) => {
          if (!scanned.has(newServer)) {
            scanned.add(newServer);
            newServers = true;
          }
        });
      }
    }
  
    return(Array.from(scanned));
  }