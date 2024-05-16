
const hre = require("hardhat");

async function main() {
    console.log('1')
    const Flight = await hre.ethers.getContractFactory("Flight");
    console.log('2')
    const flight = await Flight.deploy();
    console.log('3')
    await flight.waitForDeployment();
    console.log('4')
    const deploymentAddressFlight = await flight.getAddress();

    console.log("Flight deployed at", `${deploymentAddressFlight}`)

    const Ticket = await hre.ethers.getContractFactory("Ticket");
    const ticket = await Ticket.deploy(deploymentAddressFlight);
    await ticket.waitForDeployment();

    const deploymentAddressTicket = await ticket.getAddress();

    console.log("Ticket Transfer deployed at", `${deploymentAddressTicket}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });