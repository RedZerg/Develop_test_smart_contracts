//run with DdayDeployer.js <unified contract file>
//e.g: node scripts/crowdsale_deployer.js Unified.sol

//libs
const ABI = require('ethereumjs-abi');
const SOLC = require('solc');
const FS = require("fs");
const Eth = require('web3-eth');
const MD5 = require('md5');
const writeFile = require('node-fs-writefile-promise');
const mkdirp = require('mkdirp');
const remove = require('remove');


//compiler related:
const CONTRACT_NAME = "IPSCrowdsale";
const OUTPUT_FOLDER = "output"

//general:
const DAY = 86400;
const OWNER = "0xc8bd47A280882075735e9fF405B60a523B2D9735";

//SirinCrowdsale constructor params:
const startTime         = 1525471200; //(Tue, 04 May 2018 12:00:00 GMT)
const endTime           = startTime + 14 * DAY;
const wallet            = "0x900d7c33D10fB139f9f32254f261eE07955e4F05";
const walletFounder     = "0x900d7c33D10fB139f9f32254f261eE07955e4F05";
const walletOEM         = "0x900d7c33D10fB139f9f32254f261eE07955e4F05";
const walletBounties    = "0x900d7c33D10fB139f9f32254f261eE07955e4F05";
const walletReserve     = "0x900d7c33D10fB139f9f32254f261eE07955e4F05";


var eth = new Eth(Eth.givenProvider || 'http://127.0.0.1:8545');
var IPSCrowdsaleCompiled;

processContract(process.argv[2])
    .then(deployContract());

/*
*/
async function processContract(contractFilePAth) {

    console.log("\nProcessing " + "\n----------\n" + CONTRACT_NAME + " (" + contractFilePAth + ")\n");

    var copmiled = SOLC.compile(FS.readFileSync(contractFilePAth, 'utf8'), 1)
    IPSCrowdsaleCompiled = copmiled.contracts[":" + CONTRACT_NAME];
    var bytecode = IPSCrowdsaleCompiled.bytecode
    var abi = IPSCrowdsaleCompiled.interface;
    var ctorParamsEncoded = getCtorParams();
    var binMd5 = MD5(bytecode.toString('hex'));

    if (FS.existsSync(OUTPUT_FOLDER)) {
        remove.removeSync(OUTPUT_FOLDER);
    }

    mkdirp(OUTPUT_FOLDER)

    console.log("Generate files to folder: " + OUTPUT_FOLDER);

    printToFile(OUTPUT_FOLDER + "/" + CONTRACT_NAME + "_bin.BIN", bytecode.toString('hex'));
    printToFile(OUTPUT_FOLDER + "/" + CONTRACT_NAME + "_ctor_params.txt", ctorParamsEncoded.toString('hex'));
    printToFile(OUTPUT_FOLDER + "/" + CONTRACT_NAME + "_abi.ABI", abi);
    printToFile(OUTPUT_FOLDER + "/" + CONTRACT_NAME + "_md5.txt", binMd5);

    console.log("\nConstructor parameters:");
    console.log("-----------------------");
    console.log("startTime:           " + startTime + " (" + new Date(startTime * 1000).toGMTString() + ")");
    console.log("startTime:           " + endTime + " (" + new Date(endTime * 1000).toGMTString() + ")");
    console.log("ETH wallet:          " + wallet);
    console.log("10% walletFounder:   " + walletFounder);
    console.log("10% walletOEM:       " + walletOEM);
    console.log("5%  walletBounties:  " + walletBounties);
    console.log("35% walletReserve:   " + walletReserve);

}

function deployContract() {
    console.log("\nDeploying " + "\n---------\n" + CONTRACT_NAME + "\n");
    console.log("Please verify the transaction on your wallet")
    new eth.Contract(JSON.parse(IPSCrowdsaleCompiled.interface), null, {
        data: '0x' + IPSCrowdsaleCompiled.bytecode
    })
        .deploy({
            arguments: [startTime, endTime, wallet, walletFounder, walletOEM, walletBounties, walletReserve]
        }).send({
        from: OWNER,
        gas: 6700000,
        gasPrice: '99990000000'
    })
        .then(function (newContractInstance) {
            console.log("\nDeployed " + "\n---------\n" + CONTRACT_NAME)
            console.log(newContractInstance.options.address) // instance with the new contract address
        });
}

/*
*/
function printToFile(fileName, input) {
    writeFile(fileName, input);
    console.log(fileName);
}

/*
*/
function getCtorParams() {
    let parameterTypes = ["uint256", "uint256", "address", "address", "address", "address", "address"];
    let parameterValues = [startTime + "", endTime + "", wallet, walletFounder, walletOEM, walletBounties, walletReserve];
    let ctorParamsEncoded = ABI.rawEncode(parameterTypes, parameterValues);
    return ctorParamsEncoded;
}
