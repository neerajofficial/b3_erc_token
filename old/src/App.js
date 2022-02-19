import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json';

import './styles.css';

const greetingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
	const [greeting, setGreetingValue] = useState('');
	const [userAccount, setUserAccount] = useState('');
	const [amount, setAmount] = useState(0);

	const requestAccount = async () => {
		await window.ethereum.request({ method: 'eth_requestAccounts' });
	}

	const getBalance = async () => {
		if (typeof window.ethereum !== 'undefined') {
			const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
			const balance = await contract.balanceOf(account);
			console.log("Balance: ", balance.toString());
		}
	}

	const sendCoins = async () => {
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
			const transaction = await contract.transfer(userAccount, amount);
			await transaction.wait();
			console.log(`${amount} coins successfully sent to ${userAccount}`);
		}
	}
 
	const fetchGreeting = async () => {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(greetingAddress, Greeter.abi, provider);
			try {
				const data = await contract.greet();
				console.log('data: ',data);
			}  catch (error) {
				console.log("Error: ",error);
			}
		}
	}

	const setGreeting = async () => {
		if (!greeting) return;
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(greetingAddress, Greeter.abi, signer);
			const transaction = await contract.setGreeting(greeting);
			setGreetingValue('');
			await transaction.wait();
			fetchGreeting();
		}
	}

	return (
		<div className="app">
			<button onClick={fetchGreeting}>
				Fetch Greeting
			</button>
			<button onClick={setGreeting}>
				Set Greeting
			</button>
			<input 
				type="text" 
				value={greeting}
				onChange={e => setGreetingValue(e.target.value)}
				placeholder="Set greeting"
			/>

			<br />

			<button onClick={getBalance}>Get Balance</button>
			<button onClick={sendCoins}>Send Coins</button>
			<input 
				type="text" 
				value={userAccount}
				onChange={e => setUserAccount(e.target.value)}
				placeholder="Account address"
			/>
			<input 
				type="text" 
				value={amount}
				onChange={e => setAmount(e.target.value)}
				placeholder="Amount"
			/>
		</div>
	)
}

export default App;