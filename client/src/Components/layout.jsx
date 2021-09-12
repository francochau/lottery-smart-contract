import React from 'react';

const Layout = ({ children, balance, account }) => {
  const navigation = [
    { name: 'Solutions', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Docs', href: '#' },
    { name: 'Company', href: '#' },
  ];
  return (
    <div className="min-h-screen bg-gray-800">
      <header className='bg-indigo-600'>
        <nav
          className='mx-auto px-4 sm:px-6 lg:px-24 text-white flex items-center justify-between'
          aria-label='Top'
        >
                  <div className="flex py-6 text-2xl font-bold">ETH Lottery</div>
                  <div className="flex flex-col max-w-sm border border-white p-2 px-4 rounded-xl">
                  <div className="truncate w-32">{account}</div>
                  <div>{Number.parseFloat(balance).toFixed(5)} ETH</div>
                  </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Layout;
