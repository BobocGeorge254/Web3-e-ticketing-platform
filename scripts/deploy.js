const hre = require("hardhat");

async function main() {
    const Ticket = await hre.ethers.getContractFactory("ticket");
    const ticket = await Ticket.deploy();
    await ticket.waitForDeployment();

    let deploymentAddress = await ticket.getAddress();

    console.log("Ticket deployed at", `${deploymentAddress}`)

    const TicketTransfer = await hre.ethers.getContractFactory("TicketTransfer");
    const ticketTransfer = await TicketTransfer.deploy(deploymentAddress);
    await ticketTransfer.waitForDeployment();

    deploymentAddress = await ticketTransfer.getAddress();

    console.log("Ticket Transfer deployed at", `${deploymentAddress}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });