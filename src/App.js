import { useEffect, useState } from 'react';
import web3 from './web3';
import lottery from './lottery';

const App = (props) => {
	const [manager, setManager] = useState('');
	const [players, setPlayers] = useState([]);
	const [balance, setBalance] = useState('');
	const [etherValue, setEtherValue] = useState('');
	const [message, setMessage] = useState('');

	const fetchData = async () => {
		try {
			const manager = await lottery.methods.manager().call();
			const players = await lottery.methods.getPlayers().call();
			const balance = await web3.eth.getBalance(lottery.options.address);
			setManager(manager);
			setPlayers(players);
			setBalance(balance);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	const enterHandler = async (e) => {
		e.preventDefault();
		setMessage('Waiting on transaction success...');
		
		try {
			const accounts = await web3.eth.getAccounts();
			
			await lottery.methods.enter().send({
				from: accounts[0],
				value: web3.utils.toWei(etherValue, 'ether')
			});
			setMessage('You have been entered!');

		} catch (error) {
			setMessage('Something went wrong...');
		}
	}

	const pickWinnerHandler = async () => {
		setMessage('Waiting on transaction success...');
		try {
			const accounts = await web3.eth.getAccounts();
			
			await lottery.methods.pickWinner().send({
				from: accounts[0]
			});
			setMessage('A winner has beem picked!');

		} catch (error) {
			setMessage('Something went wrong...');
		}
	}

	return (
		<div>
			<h2>Lottery Contract</h2>
			<p>
				This contract is managed by {manager}.
				There are currently {players.length} people entered, competing to win {web3.utils.fromWei(balance, 'ether')} ether!
			</p>
			<hr />
			<form onSubmit={enterHandler}>
				<h4>Want to try your luck?</h4>
				<div>
					<label htmlFor="etherValue">Amount of ether to enter</label>
					<input name="etherValue" id="etherValue" value={etherValue} onChange={e => setEtherValue(e.target.value)} />
				</div>
				<button>Enter</button>
			</form>
			<hr />
			<h4>Ready to pick a winner?</h4>
			<button onClick={pickWinnerHandler}>Pick a winner!</button>
			<hr />
			<h1>{message}</h1>
		</div>
	)
}

export default App