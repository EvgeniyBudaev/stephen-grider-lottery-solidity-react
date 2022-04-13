import web3 from './web3';

const address = '0x49c10ba7CA4D1E9787BCd45DeFD23e672D8A4B6d';

const abi = [
    {
        constant: true,
        inputs: [],
        name: 'manager',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
    }
];

export default new web3.eth.Contract(abi, address);
