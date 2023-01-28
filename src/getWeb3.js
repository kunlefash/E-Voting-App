import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Waiting for the page to load before it runs the code inside the function
    window.addEventListener("load", async () => {
      /* Checking if the browser has web3 injected. If it does, it will use that. If not, it will
      fallback to localhost. */
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        /* Creating a new instance of web3 and then resolving it. */
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;
