import React, { useEffect, useState } from 'react';
import web3 from './web3';
import Lottery from './Lottery';

function App() {
  const [balance, setBalance] = useState('');
  const [manager, setManager] = useState('');
  const [message, setMessage] = useState('');
  const [players, setPlayers] = useState([]);
  const [value, setValue] = useState('');

  web3.eth.getAccounts().then(console.log);

  useEffect(() => {
    const fetchData = async () => {
      const balance = await web3.eth.getBalance(Lottery.options.address);
      const manager = await Lottery.methods.manager().call();
      const players = await Lottery.methods.getPlayers().call();
      setBalance(balance);
      setManager(manager);
      setPlayers(players);
    };
    fetchData();
  }, []);

  const handleClick = async () => {
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting on transaction success...');
    await Lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage('A winner has been picked.');
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting on transaction success...');
    await Lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether'),
    });
    setMessage('You have been entered.');
  };

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}.
        There are currently {players.length} people entered
        competing to win {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />
      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={handleChange} />
        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={handleClick}>Pick a winner!</button>
      <hr />
      <h1>{message}</h1>
    </div>
  );
}

export default App;
