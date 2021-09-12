![Screenshot 2021-09-12 at 3.38.48 PM.png](https://i.imgur.com/EfMIY4d.png)

# **Lottery Smart Contract**

A Lottery based game that allows players to create and participate in prize pools

This project is to demonstrate the basic functions of solidity smart contract and how to interact with them in the frontend using web3.js.

## **How to use**

1. Clone the project

    `git clone https://github.com/francochau/lottery-smart-contract`

    `cd lottery-smart-contract`

2. Install truffle

    `npm install -g truffle`

3. Run the development console.
`truffle develop`

    When you load Truffle Develop, you will see the following:

    ```
    Truffle Develop started at http://localhost:9545/

    Accounts:
    (0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
    ...

    Private Keys:
    (0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
    ...

    Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
    ```

    You can add one of the accounts to your web3 wallet to interact with the application

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.

    `compile`
    `migrate`

5. In the `client` directory, we run the React app. Smart contract changes must be manually recompiled and migrated.

    // in another terminal (i.e. not in the truffle develop prompt)
    `cd client`

    `npm install`
    `npm run start`

6. To build the application for production, use the build script. A production build will be in the `client/build` folder.

    // ensure you are inside the client directory when running this
    `npm run build`