import React, { Component, useEffect, useState } from 'react';
import LotteryContract from './contracts/Lottery.json';
import getWeb3 from './getWeb3';
import Web3 from 'web3';
import { Drizzle } from '@drizzle/store';

import './App.css';
import Layout from './Components/layout';
import Button from './Components/button';
import CreatePool from './Components/createPool';

const App = () => {
  const [balance, setBalance] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [lotteryCount, setLotteryCount] = useState(0);
  const [lotteryPools, setLotteryPools] = useState([]);
  const [participantList, setParticipantList] = useState([]);
  const [isCreating, setCreating] = useState(false);

  async function loadWeb3() {
    // Modern dapp browsers
    if (window.ethereum) {
      window.web3 = new Web3(
        // new Web3.providers.HttpProvider('http://localhost:7545')
        window.ethereum
      );
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
      // legacy dapp browsers
    } else if (window.web3) {
      window.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:7545').enable()
      );
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
    loadBlockChainData();
  }

  const loadBlockChainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const balance = accounts ? await web3.eth.getBalance(accounts[0]) : '0';
    setBalance(Web3.utils.fromWei(balance, 'ether'));

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = LotteryContract.networks[networkId];
    const instance = new web3.eth.Contract(
      LotteryContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    setContract(instance);

    const count = await instance.methods.lotteryCount().call();
    setLotteryCount(count);
    var pools = [];
    var participants = {};
    for (var index = 1; index <= count; index++) {
      const pool = await instance.methods.lotteryPools(index).call();
      const participant = await instance.methods.getParticipants(index).call();
      pools = [...pools, pool];
      participants = { ...participants, [pool.id]: participant };
    }
    setParticipantList(participants);
    setLotteryPools(pools);
  };

  const createPool = async (inputName, inputPrice) => {
    const result = await contract.methods
      .createPool(inputName, inputPrice)
      .send({ from: account })
      .once('receipt', (receipt) => {
        console.log(receipt);
        loadBlockChainData();
      });
  };
  const participatePool = async (poolId, price) => {
    const result = await contract.methods
      .participate(poolId)
      .send({ from: account, value: price })
      .once('receipt', (receipt) => {
        console.log(receipt);
        loadBlockChainData();
      });
  };

  const endPool = async (poolId) => {
    const result = await contract.methods
      .endPool(poolId)
      .send({ from: account })
      .once('receipt', (receipt) => {
        console.log(receipt);
        loadBlockChainData();
      });
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  if (!window.web3 || !contract) {
    return (
      <Layout>
        <div className='text-center text-white'>
          <div>Loading Web3, accounts, and contract...</div>
          <div>Please start Ganache and connect to web3 wallet</div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout balance={balance} account={account}>
      <div className='flex flex-col space-y-10 py-10 items-center'>
        <div className='max-w-7xl w-full flex flex-col justify-center items-center px-5 space-y-10'>
          <div className='flex flex-col lg:flex-row justify-between items-center lg:space-x-10 space-y-5 lg:space-y-0 w-full max-w-3xl'>
            <div className='text-center text-2xl font-bold text-white'>
              Total Lottery Pools: {lotteryCount}
            </div>
            <div
              onClick={() => {
                setCreating(true);
              }}
            >
              <Button
                color='bg-indigo-500 text-white'
                text='Create Lottery Pool'
              />
            </div>
          </div>
          {isCreating && (
            <CreatePool createPool={createPool} setCreating={setCreating} />
          )}
          {lotteryPools?.map((pool) => (
            <div
              className='bg-indigo-600 text-gray-200 w-full max-w-3xl p-10 flex flex-col space-y-10 mb-10 rounded-xl relative'
              key={pool.id}
            >
              <div className='flex'>
                {' '}
                <div className='text-center text-lg font-bold flex-grow'>
                  {pool.name}
                </div>
                <div
                  className={`rounded-full ${
                    pool.alive ? 'bg-green-400' : 'bg-gray-400'
                  } w-5 h-5 absolute top-5 right-5`}
                />
              </div>
              <div className='flex justify-between flex-col lg:flex-row space-y-5 lg:space-y-0'>
                <div className='flex flex-col items-center'>
                  <p className='font-semibold'>Entries</p>
                  <p>{participantList[pool.id].length}</p>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='font-semibold'>Price per lottery ticket </p>
                  <p>{Web3.utils.fromWei(pool.price)} ETH</p>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='font-semibold'>Pool Size </p>
                  <p>
                    {Web3.utils.fromWei(
                      (pool.price * participantList[pool.id].length).toString(),
                      'ether'
                    )}{' '}
                    ETH
                  </p>
                </div>
              </div>
              {pool.alive ? (
                <div className='flex justify-center mt-5 flex-col lg:flex-row lg:space-x-5 space-y-5 lg:space-y-0'>
                  <div className='flex-grow'>
                    <Button
                      text='Participate'
                      onClick={() => {
                        participatePool(pool.id, pool.price);
                      }}
                    ></Button>
                  </div>

                  {account.toLowerCase() == pool.owner.toLowerCase() && (
                    <div className='flex-grow'>
                      <Button
                        text='End Pool'
                        onClick={() => {
                          endPool(pool.id);
                        }}
                      ></Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className='text-center'>
                  <p className='font-semibold'>Pool Ended</p>
                  <p className='font-semibold'>Congratulation! winner: </p>
                  <p className='font-semibold truncate w-full'>{pool.winner}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default App;
