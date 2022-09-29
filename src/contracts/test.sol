// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "./mindpay.sol";  

contract test {
     
    MindPay public mpay;

    struct Purchase {
        address user;
        uint token_value;
        uint ether_value;
        uint timestamp; 
        bool bought;
        bool staked;
    }

    struct Stake { 
        uint token_value; 
        uint staketime; 
    }

    mapping (address=>Purchase) public purchases;
    mapping (address=>Stake) public stakes;
    
    uint public constant PERIOD = 15*60 ;  
    uint public tokenPrice = 1000 * 10**18;  
    uint public reserve = 0;  
    uint public totalStaked = 0;  
    uint public totalPurchased = 0;  
    address payable liquidity = payable(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2); 

    event NewPurchase(address indexed _addr, uint token_amount, uint ether_amount, uint time); 
    event LiquidityAdded(address indexed _addr, uint ether_amount, uint time);

    constructor ( MindPay _mpay )  
    { mpay = _mpay; }

    receive() external payable {
        purchase();
    }
    
    function purchase() public payable returns (bool){
         
        uint _tempMindVal ;
        uint _tempEthVal = msg.value;

        _tempMindVal = _tempEthVal*tokenPrice/(1 ether);

        if(_tempEthVal >=  1 ether && _tempEthVal < 5 ether) {
            _tempMindVal = 11*_tempMindVal/10; // bonus of 10 percent
        } else if(_tempEthVal >= 5 ether) {
            _tempMindVal = 12*_tempMindVal/10; // bonus of 20 percent
        }

        Purchase storage _user = purchases[msg.sender];
        require(_user.token_value == 0, "only one purchase allowed");
        _user.user = msg.sender;
        _user.timestamp = block.timestamp;
        _user.token_value = _tempMindVal;
        _user.ether_value = _tempEthVal;
        _user.bought = true;

        totalPurchased += _tempMindVal;
        emit NewPurchase(msg.sender, _tempMindVal, _tempEthVal, block.timestamp);
        
        reserve += 9*_tempEthVal/10;

        liquidity.transfer(_tempEthVal/10);  // send 10 percent to liquidity
        emit LiquidityAdded(msg.sender, _tempEthVal/10, block.timestamp);
        return true;
    }
    
    function cancel() public returns(bool) {
        Purchase storage _user = purchases[msg.sender];
        require(block.timestamp > (_user.timestamp + PERIOD), "please wait" );
        require(_user.staked == false, "already staked" );
        _user.timestamp = 0;

        // burn mpay
        mpay.burn(_user.token_value);
        _user.token_value = 0;

        // transfer 90% of ether to caller 
        payable(msg.sender).transfer(9*_user.ether_value/10);
        _user.ether_value = 0; 
        _user.bought = false;  

        reserve -= 9*_user.ether_value/10;
        return true;
    }

    function stake() public returns (bool){
        Purchase storage _user = purchases[msg.sender];
        require(block.timestamp > (_user.timestamp + PERIOD), "please wait" );
           
        _user.staked = true;   
        // transfer 90% of ether to liquidity
        liquidity.transfer(9*_user.ether_value/10);
        _user.ether_value = 0;

        Stake storage _stake = stakes[msg.sender];

        _stake.staketime = block.timestamp;
        _stake.token_value = _user.token_value;

        totalStaked += _user.token_value; 
        return true;
    } 

    function getBalances() external view returns(uint _reserve, uint _mpayBal, uint _totalStaked, uint _totalPurchasedMPay){
        return (reserve, mpay.balanceOf(address(this)), totalStaked, totalPurchased);
    }   
}