const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Multicall2', function () {
  beforeEach(async function () {
    this.signers = await ethers.getSigners()
    this.deployer = this.signers[0]
    this.account1 = this.signers[1]
    this.contract = await ethers.getContractFactory('Multicall2')
    this.multicall = await this.contract.deploy()
  })

  it('should be deployed', async function () {
    expect(await this.multicall.deployed(), true)
  })

  describe('check getEthBalance func', function () {
    it('returns eth balance', async function () {
      const balanceETH = await ethers.provider.getBalance(this.account1.address)
      const balanceETHfromContract = await this.multicall.getEthBalance(
        this.account1.address
      )
      expect(balanceETH).to.be.eq(balanceETHfromContract)
    })
  })

  describe('check current block number', function () {
    it('returns block number', async function () {
      const blockNumber = await ethers.provider.getBlockNumber()
      const blockNumberfromContract = await this.multicall.getBlockNumber()
      expect(blockNumber).to.be.eq(blockNumberfromContract)
    })

    describe('check current block parameters', function () {
      beforeEach(async function () {
        const currentBlock = await ethers.provider.getBlockNumber()
        this.block = await ethers.provider.getBlock(currentBlock)
      })

      it('returns block timestamp', async function () {
        const blockTimestampfromContract =
          await this.multicall.getCurrentBlockTimestamp()
        expect(this.block.timestamp).to.be.eq(blockTimestampfromContract)
      })

      it('returns block gas limit', async function () {
        const blockGaslimitfromContract =
          await this.multicall.getCurrentBlockGasLimit()
        expect(this.block.gasLimit).to.be.eq(blockGaslimitfromContract)
      })

      it('returns last block hash', async function () {
        const lastBlockHashfromContract =
          await this.multicall.getLastBlockHash()
        expect(this.block.parentHash).to.be.eq(lastBlockHashfromContract)
      })

      it('returns block coinbase', async function () {
        const blockCoinbasefromContract =
          await this.multicall.getCurrentBlockCoinbase()
        expect(this.block.miner).to.be.eq(blockCoinbasefromContract)
      })
    })
  })
})
