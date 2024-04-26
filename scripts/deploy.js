const hre = require("hardhat")

async function main() {
    const Ticket = await hre.ethers.getContractFactory("ticket");
    const ticket = await Ticket.deploy();

    await ticket.waitForDeployment();

    const deploymentAddress = await ticket.getAddress();

    console.log("Deployed at", `${deploymentAddress}`)
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
})