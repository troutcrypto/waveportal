const main = async () => {
  // get signer via hre.ethers
  // get balance of deployer
  // then create contract factory
  // to instantiate contract need to deploy the contract factory
  //  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account: ", deployer.address);
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // to deploy a contract with $$, need to set value in deploy
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.001'),
  });
  await waveContract.deployed();
  console.log("WavePortal address: ", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log("Contract init balance:", hre.ethers.utils.formatEther(contractBalance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); 
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();