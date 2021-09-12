import React, { useRef, useState } from 'react';
import Button from './button';

const CreatePool = ({ createPool, setCreating }) => {
  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  return (
    <div className='bg-gray-100 rounded-xl p-10 w-full max-w-3xl space-y-5 mb-10'>
      <div className=''>
        <label
          htmlFor='poolName'
          className='block text-sm font-medium text-gray-700'
        >
          Pool Name:
        </label>
        <div className='mt-1'>
          <input
            onChange={(e) => {
              setInputName(e.target.value);
            }}
            ref={nameRef}
            type='text'
            name='poolName'
            id='poolName'
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          />
        </div>
      </div>
      <div className=''>
        <label
          htmlFor='price'
          className='block text-sm font-medium text-gray-700'
        >
          Price per ticket:
        </label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <span className='text-gray-500 sm:text-sm'>$</span>
          </div>
          <input
            onChange={(e) => {
              setInputPrice(e.target.value);
            }}
            ref={priceRef}
            type='number'
            name='price'
            id='ticketPrice'
            className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md'
            placeholder='0.00'
            aria-describedby='price-currency'
          />
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <span className='text-gray-500 sm:text-sm' id='price-currency'>
              ETH
            </span>
          </div>
        </div>
      </div>

      <div className='flex w-full justify-between space-x-5'>
        <div className='flex-1'>
          <Button
            text='Add a new pool'
            onClick={() => {
              createPool(inputName, inputPrice * 1000000);
              nameRef.current.value = '';
              priceRef.current.value = '';
            }}
          ></Button>
        </div>
        <div className='flex-1'>
          <Button text='Cancel' onClick={() => setCreating(false)}></Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePool;
