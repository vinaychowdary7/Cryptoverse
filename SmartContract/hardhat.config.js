require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/z8L_45zKibMSNGF6MdqnECa71JSYeEYk',
      accounts: ['bbd4dccde273a9dba07b98b407d0acb3ff2362a664de8234a6c4770c994ebc99']
    }
  }
};
//https://eth-sepolia.g.alchemy.com/v2/G04qr-0J9Gj2OdETrysdF0H04c7XaRkD