# IPS FinTech Crowdsale Contracts

Please see below IPS Labs smart contracts' for the [IPS Crowdsale].



IPS(Token) is an ERC-20 compliant cryptocurrency built on top of the [Ethereum][ethereum] blockchain.

## Overview
IPS  - IPS token is created with the purpose of issuing crypto shares which will pay out money to ETH, every four months from the creation of a banking platform, in the amount of 20% of the company's earned money.
All 100% of the token is a 20% stake.

## Contracts

Please see the [contracts/](contracts) directory.

## The Crowdsale Specification
*	IPS(Token) token is ERC-20 compliant.
*	IPS(Token) Token is [Bancor][bancor] compliant.
*	Token allocation:
	* 40% of the total number of IPS(Token) tokens will be allocated to contributors during the token sale.
	* 10% of the total number of IPS(Token) tokens will be allocated to the team.
	* 10% of the total number of IPS(Token) tokens will be allocated to professional fees and bounties.
	* 40% of the total number of IPS(Token) tokens will be allocated to IPS , to be used for future strategic plans and to develop the IPS Bank platform ecosystem.

## IPS(Token) PRICING PROGRAM

* Duration from token Crowdsale event start	| IPS(Token) / ETH |
* :---: | :---: *
* First 24 hours | 500 *
* 2nd day - 450 *
* 3rd day - 425 *
* 4th day - 400 *
* 5th day - 385 *
* 6th day - 370 *
* 7th day - 355 *
* 8th day - 340 *
* 9th day - 325 *
* 10th day - 310 *
* 11th day - 300 *
* 12th day - 290 *
* 13th day - 280 *
* 14th day - 270 *

#### Add options Refund Route - IPS(Token) tokens with guarantee

Investors can choose to buy IPS tokens with guarantee.

refund route rates are 50% of the regular rate (starting from 500 IPSs for 1 ETH at the first day and ending at 250 IPSs for 1 ETH at the last day of the crowd sale).

IPS(Token) tokens and the ETH funds are deposited to a RefundVault contract owned by the IPSCrowdsale contract.

Investors bought IPSs on the refund route can get refund of their ETH or claim their IPS(Token) tokens only after the crowd sale ends.

Refund ETH period is limited to 60 days after the crowd sale ends. IPS(Token) token claim is not limited in time.

Any of the actions (refund ETH and IPS(Token) token claim) can be executed by the investor directly on the RefundVault contract.

Any of the actions (refund ETH and IPS(Token) token claim) can be done on parts of the amount.

* In case of refund ETH, the proportional amount of IPS(Token) tokens will be burned.
* In case of IPS(Token) token claim, the proportional amount of ETH will be transferred to IPS ETH Wallet.
* In Case of partial action the remaining ETH and IPS(Token) tokens will be available to more refund or claim actions according to the refund period and updated amounts.


## Base Develop

* Contracts are written in [Solidity][solidity] and tested using [Truffle][truffle] and [testrpc][testrpc].

* Our smart contract is based on [Open Zeppelin][openzeppelin] smart contracts [openzeppelin_v1.3.0].


## Audit


  
## Code



#### Functions Crowdsale

**Functions getRate**
```cs
function getRate() public view returns (uint256)
```
Returns the rate in IPS(Token) per 1 ETH according to the time of the tx and the IPS(Token) pricing program.

**Functions getTotalFundsRaised**
```cs
function getTotalFundsRaised() public view returns (uint256)
```
Returns the total funds collected in wei(ETH and none ETH).

**Functions addUpdateGrantee**
```cs
function addUpdateGrantee(address _grantee, uint256 _value) external onlyOwner onlyWhileSale
```
Adds/Updates address and token allocation for token grants.

Granted tokens are allocated to non-ether, presale, buyers.

**Functions isActive**
```cs
function isActive() public view returns (bool)
```
Return true if the crowdsale is active, hence users can buy tokens

**Functions deleteGrantee**
```cs
function deleteGrantee(address _grantee) external onlyOwner onlyWhileSale
```
Deletes entries from the grants list.

**Functions setFiatRaisedConvertedToWei**
```cs
function setFiatRaisedConvertedToWei(uint256 _fiatRaisedConvertedToWei) external onlyOwner onlyWhileSale
```
Sets funds collected outside the crowdsale in wei.
funds are converted to wei using the market conversion rate of USD\ETH on the day on the purchase.

**Functions claimTokenOwnership**
```cs
function claimTokenOwnership() external onlyOwner
```
Accepts new ownership on behalf of the IPSCrowdsale contract. This can be used, by the token sale contract itself to claim back ownership of the IPsSmartToken contract.

**Functions claimRefundVaultOwnership**
```cs
function claimRefundVaultOwnership() external onlyOwner
```
Accepts new ownership on behalf of the IPSCrowdsale contract. This can be used, by the token sale contract itself to claim back ownership of the refundVault contract.

**Functions buyTokensWithGuarantee**
```cs
function buyTokensWithGuarantee() public payable
```
Buy tokes with guarantee, these tokens and the ETH are saved in refundVault, so investor can refund them up to 60 days after the crowdsale ends.

#### Events

**GrantAdded**
```cs
event GrantAdded(address indexed _grantee, uint256 _amount);
```

**GrantUpdated**
```cs
event GrantUpdated(address indexed _grantee, uint256 _oldAmount, uint256 _newAmount);
```

**TokenPurchaseWithGuarantee**
```cs
event TokenPurchaseWithGuarantee(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);
```


**GrantDeleted**
```cs
event GrantDeleted(address indexed _grantee, uint256 _hadAmount);
```



#### About guarantee (RefundVault) 

**deposit**
```cs
function deposit(address investor, uint256 tokensAmount) onlyOwner public payable
```
Adds Investor tokens and ETH to the vault.

**close**
```cs
function close() onlyOwner public
```
Closes the refunds, all ETH is transfered to IPS ETH wallet.
After this function is called investors cannot refund their ETH anymore but can claim their tokens.

**enableRefunds**
```cs
function enableRefunds() onlyOwner public
```
Start the refunding. Should be called after the crowdsale.

**refundETH**
```cs
function refundETH(uint256 ETHToRefundAmountWei) isInRefundTimeFrame isRefundingState public
```
Refund ETH back to the investor in return of proportional amount of IPS(Token) back to IPS wallet.

**claimTokens**
```cs
function claimTokens(address investor, uint256 tokensToClaim) isRefundingOrCloseState public
```
Transfer tokens from the vault to the investor while transferring proportional amount of ETH to IPS ETH wallet.

Can be triggered by the investor only.

**claimAllTokens**
```cs
function claimAllTokens() public
```
Investors can claim all remaining tokens from the vault.

#### Events (RefundVault)

**Active**
```cs
event Active();
```


**Deposit**
```cs
event Deposit(address indexed beneficiary, uint256 etherWeiAmount, uint256 tokenWeiAmount);
```    

**Closed**
```cs
event Closed();
```


**RefundsEnabled**
```cs
event RefundsEnabled();
```


**RefundedETH**
```cs
event RefundedETH(address indexed beneficiary, uint256 weiAmount);
```


**TokensClaimed**
```cs
event TokensClaimed(address indexed beneficiary, uint256 weiAmount);
```

#### IPSVestingTrustee Functions

Vesting trustee contract for IPS  token.

**grant**
```cs
function grant(address _to, uint256 _value, uint256 _start, uint256 _cliff, uint256 _end, bool _revokable)
    public onlyOwner 
```
Grant tokens to a specified address.

**revoke**
```cs
function revoke(address _holder) public onlyOwner
```
Revoke the grant of tokens of a specifed address.

**vestedTokens**
```cs
 function vestedTokens(address _holder, uint256 _time) public constant returns (uint256)
```
Calculate the total amount of vested tokens of a holder at a given time.

**unlockVestedTokens**
```cs
 function unlockVestedTokens() public 
```
Unlock vested tokens and transfer them to their holder.

#### IPSVestingTrustee Events


**NewGrant**
```cs
event NewGrant(address indexed _from, address indexed _to, uint256 _value);
```


**UnlockGrant**
```cs
event UnlockGrant(address indexed _holder, uint256 _value);
```


**RevokeGrant**
```cs
event RevokeGrant(address indexed _holder, uint256 _refund);
```

### Dependencies

```bash
# Install Truffle and testrpc packages globally:
$ npm install -g truffle ethereumjs-testrpc

# Install local node dependencies:
$ npm install
```

### Test

```bash
$ ./scripts/test.sh
```


### Code Coverage

```bash
$ ./scripts/coverage.sh
```





## License

Apache License v2.0


[ethereum]: https://www.ethereum.org/
[solidity]: https://solidity.readthedocs.io/en/develop/
[truffle]: http://truffleframework.com/
[testrpc]: https://github.com/ethereumjs/testrpc
[bancor]: https://github.com/bancorprotocol/contracts
[openzeppelin]: https://openzeppelin.org
[openzeppelin_v1.3.0]: https://github.com/OpenZeppelin/zeppelin-solidity/releases/tag/v1.3.0
[mattdf]: http://github.com/mattdf
[decnus]: http://github.com/decanus
[leonid]: https://www.linkedin.com/in/leonidb/
[bokk]: https://github.com/bokkypoobah/
