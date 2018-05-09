const IPSSmartToken = artifacts.require('../contracts/IPSSmartToken.sol');
const utils = require('./helpers/Utils');

contract('IPSSmartToken', (accounts) => {
    let token;
    let owner = accounts[0];

    beforeEach(async () => {
        token = await IPSSmartToken.new();
    });

    describe('construction', async () => {
        it('should be ownable', async () => {
            assert.equal(await token.owner(), owner);
        });

        it('should return correct name after construction', async () => {
            assert.equal(await token.name(), "IPS.FinTech");
        });

        it('should return correct symbol after construction', async () => {
            assert.equal(await token.symbol(), 'IPS');
        });

        it('should return correct decimal points after construction', async () => {
            assert.equal(await token.decimals(), 2);
        });

        it('should be initialized as not transferable', async () => {
            assert.equal(await token.transfersEnabled(), false);
        });

        it('should throw when attempting to transfer by default', async () => {
            let token = await IPSSmartToken.new();
            await token.issue(accounts[0], 1000);
            let balance = await token.balanceOf.call(accounts[0]);
            assert.equal(balance, 1000);

            try {
                await token.transfer(accounts[1], 100);
                assert(false, "didn't throw");
            } catch (error) {
                return utils.ensureException(error);
            }
        });
    });
});