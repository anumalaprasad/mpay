import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers'; 

const tokenAddress = "0x1fD716f2F998205a261FAAB5F16E0418D0Ff56f8"; 
const contractAddress = "0x5132cE9957D7433a46C287E4fEaD2084BaB102Eb";

const tokenABI = require('./abi/token.json'); 
const contractABI = require('./abi/test.json');

const getBlockchain = () =>
  new Promise( async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if(provider) {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const currentAcc = accounts[0] ;
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      
      const tokenInstance = new Contract(
          tokenAddress,
          tokenABI,
          signer
        );
      
      const contractInstance = new Contract(
          contractAddress,
          contractABI,
          signer
      );
      resolve({tokenAddress, tokenInstance, contractInstance, contractAddress, currentAcc, provider});
      return;
    }
    reject('Install/Use Web3 provider like Metamask or Trust Wallet ');
  });

export default getBlockchain;
