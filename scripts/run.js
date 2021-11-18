const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  console.log("Contract deployd by:", owner.address);
  // hre = hardhat runtime environment
  // commands starting with hre = hardhat objectect containing all that
  // hardhat exposes when running a task
  
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await waveContract.deployed();
  console.log('Contract address:', waveContract.address);
  console.log("Contract deployed by:", owner.address);
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log("contract balance:", hre.ethers.utils.formatEther(contractBalance));

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("This is wave # 1"); // owner wave
  await waveTxn.wait(); 

  waveTxn = await waveContract.wave("This is wave # 2");
  await waveTxn.wait();

  console.log('---- Done waving ----');
  
  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);   
  contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log("Final account balance:", hre.ethers.utils.formatEther(contractBalance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1); 
  }
};

runMain();