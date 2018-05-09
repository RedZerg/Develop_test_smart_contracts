pragma solidity ^0.4.23;


import './bancor/LimitedTransferBancorSmartToken.sol';


/**
  A Token which is 'Bancor' compatible and can mint new tokens and pause token-transfer functionality
*/
contract IPSSmartToken is LimitedTransferBancorSmartToken {

    // =================================================================================================================
    //                                         Members
    // =================================================================================================================

    string public name = "IPS.FinTech";

    string public symbol = "IPS";

    uint8 public decimals = 2;

    // =================================================================================================================
    //                                         Constructor
    // =================================================================================================================

    function IPSSmartToken() public {
        //Apart of 'Bancor' computability - triggered when a smart token is deployed
        NewSmartToken(address(this));
    }
}
