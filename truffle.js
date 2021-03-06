require('babel-register');
require('babel-polyfill');

module.exports = {
    networks: {
        development: {
            host: 'localhost',
            port: 8545,
            network_id: '*', // Match any network id
            gas: 4712388,
            gas: 0xfffffffffff,
            gasPrice: 0x01,
        }
    }
};
