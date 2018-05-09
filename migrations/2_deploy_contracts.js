var IPSCrowdsale = artifacts.require("./Crowdsale/IPSCrowdsale.sol");

module.exports = function(deployer) {

    const MIN = 60;
    const HOUR = 60 * MIN;
    const DAY =  24 * HOUR;

    //TODO: CHANGE ADDRESS BEFORE PUBLISH!

    const FOUNDER_WALLET_ADDRESS = "0x2c86c211050Bd215bc9DddBd19DccDDf21D99577";

    const DEVELOPERS_ADDRESS = "0xEa217171eD50854128715F2A824E01041F93F582";

    const BOUNTIES_ADDRESS = "0x542A8Dbf64900DD8035d9ea4D5DF3095E6299a7e";

    const IPS_LABS_RESERVE_ADDRESS = "0x18463A0513317800BcECaaae85fA78E5305bfd60";

    //const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 60 * 2;
    //const endTime = startTime + DAY * 14;
    const startTime         = 1525627800; //(Tue, 25 May 2018 12:00:00 GMT)
    const endTime           = startTime + 14 * DAY;
    const rate = new web3.BigNumber(1000)
    const wallet = web3.eth.accounts[0]

    // deployer.deploy(IPSCrowdsale,
    //                startTime,
    //                endTime,
    //                wallet,
    //                FOUNDER_WALLET_ADDRESS,
    //                DEVELOPERS_ADDRESS,
    //                BOUNTIES_ADDRESS,
    //                IPS_Data_RESERVE_ADDRESS)
};
