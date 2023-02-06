module.exports = async function({ getNamedAccounts, deployments }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
  
    token = await deploy('Multicall2', {
      from: deployer,
      log: true,
      skipIfAlreadyDeployed: true
    })
  
    console.log('Multicall2 address:', token.address)
  }
  
  module.exports.tags = ['Multicall2']