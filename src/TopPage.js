import React, { Component } from 'react'; 

import getBlockchain from './ethereum.js';  
import UserInfo from './UserInfo.js'; 
import Stake from './Stake.js'; 
import Purchase from './Purchase.js'; 
import "./css/style.css";  
 
class TopPage extends Component { 

   componentDidMount = async() => {

        await this.loadBlockChainData(); 
           
        // this.timerData();  
   } 
 
   loadBlockChainData = async () => {

       let { contractAddress, contractInstance, currentAcc  } = await getBlockchain();    
       this.setState({contractInstance})
       this.setState({currentAcc})
       this.setState({contractAddress})  

       let timenow = await contractInstance.getNow( );
       let userInfo = await contractInstance.purchases(this.state.currentAcc);
        console.log(timenow)
        this.setState({token_amt: Number(userInfo[1]/10**18) })
        this.setState({ether_amt: Number(userInfo[2]/10**18).toFixed(4)})
        this.setState({time: Number(userInfo[3] )}) 
        this.setState({bought:  userInfo[4]  }) 
        this.setState({now: Number(timenow)}) 

        this.setState({diff: 900 + this.state.time - this.state.now})
        if(this.state.diff < 0){
            this.setState({diff:0})
        }
        console.log(this.state.bought)
        console.log(this.state.ether_amt)
        console.log(this.state.diff)
        
       this.setState({loading : false})
    }
 
   constructor(props) {
    super(props)

    this.state = {
         symbol :'',
         loading: true 
        } 
    }

   render() {                   
    const backStyle = {
        backgroundColor:"black", backgroundAttachment: "fixed", fontFamily: "MyFont", height: "auto", width: "100%", margin: "0", backgroundPosition: "center", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundSize: "cover"
    };
    return (
        <div style={backStyle }>
            <div style={{ textAlign: "center" , marginTop:"30px" }}> </div>
            {
                this.state.bought === false  ?
                <Purchase 
                    diff= {this.state.diff}
                />: null
            } 
           
             
            <UserInfo 
                currentAcc={this.state.currentAcc}
                token_amt={this.state.token_amt}
                ether_amt={this.state.ether_amt} 
                diff={this.state.diff} 
                />
            <div style={{ paddingBottom: "520px" }}></div>
        </div>
        // <div style={backStyle } >
        //         <div style={{ textAlign: "center" , marginTop:"30px" }}> </div>
                
        //         <Purchase />
        //         <UserInfo />
                
                
        //         <div style={{ paddingBottom: "20px" }}></div>

        //         <div style={{ paddingBottom: "510px" }}></div> 
        //     </div>
    )}

}
export default TopPage;