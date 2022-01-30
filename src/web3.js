import Web3 from 'web3';

window.ethereum.request({ method: "eth_requestAccounts" });
const web3 = new Web3(window.ethereum);

export default web3;

// ----------------------
// import Web3 from 'web3';
// import { useEffect } from 'react';

	// async function loadBlockchainData(){
	// 	const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
	// 	const network = await web3.eth.net.getNetworkType();
	// 	console.log(network);
	// }
	// useEffect(() => {
	// 	loadBlockchainData();
	// }, []);


	// const connectWalletHandler = async () => {
	// 	const { ethereum } = window;
	// 	if (!ethereum) {
	// 		alert('Please install Metamask');
	// 	}
	// 	try {
				// const accounts = await ethereum.request({ method: "eth_requestAccounts" });
				// console.log("Found an account! Address: ", accounts[0]);
	// 	} catch (error) {
	// 	console.log(error);
	// }
	// }


// import web3 from './web3';
// console.log(web3.version);
// web3.eth.getAccounts().then(console.log);
