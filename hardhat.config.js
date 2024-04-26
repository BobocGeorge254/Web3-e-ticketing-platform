require("@nomicfoundation/hardhat-toolbox");

const API_URL = "https://eth-sepolia.g.alchemy.com/v2/noZvHo33LSE5vpUKSSIQsguKTCbwq0FL"
const PRIVATE_KEY = "ba7dc0b8a4a3a0c1f1961ec7a8936545786b8c5d704a4b67023dd00642c61f6f"

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  },
}