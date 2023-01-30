import Web3 from "web3";

const getWeb3 = () => new Promise((resolve, reject) => {
  window.addEventListener("load", async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    } else if (window.web3) {
      resolve(window.web3);
      console.log("Injected web3 detected.");
    } else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      resolve(web3);
    }
  });
});

export default getWeb3;