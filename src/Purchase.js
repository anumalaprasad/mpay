import React, { Component } from 'react'
import getBlockchain from './ethereum.js'; 
import {utils} from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

toast.configure(); 

export class Purchase extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0 
        }
        
        this.purchase = this.purchase.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
         
    }
    changeHandler(e){
        this.setState({count: e.target.value})
        if(e.target.value >= 5){
            this.setState({tokenRec: e.target.value*1000*1.2 })
        } else if(e.target.value >= 1){
            this.setState({tokenRec: e.target.value*1000*1.1 })
        } else {
            this.setState({tokenRec: e.target.value*1000*1.0 })
        }
    }
    async purchase( amount) {
        const { currentAcc, contractInstance } = await getBlockchain();
        console.log( amount ); 
        if (amount >= 0) {
             
            // let amt = Number(amount).toFixed(3);
            // console.log( utils.parseEther(amt) );
            // amt = amt + "000000000000000000";
            // console.log( amt ); 

            await contractInstance
                .purchase({
                    from: currentAcc,
                    value: utils.parseEther(amount)
                })
                .then(res => toast.success( 'Purchase  processing, Please wait do not refresh', { position: toast.POSITION.TOP_RIGHT, autoClose: 20000 }) 
                ).then(res => {
                    setInterval(() => {
                        window.location.reload();
                    }, 20000);
                }).catch(err => toast.error(err + " Unknown Error (first) "));
        } else {
         } 
    }
 

    render() {

        const colStyle = {
            opacity: "80%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee", backgroundImage: "linear-gradient(to right, #131050, black)"
        }; 

        const firstAllowanceButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "black",
            transition: ".4s", marginTop: "30px", marginBottom: "-22px", fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to right, #FFDD00, #FBB034)", fontSize: "18px", borderRadius: "30px" 
        };

        return (
            <div style={{ paddingTop: "60px" }} >
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}> 

                        <div className="col-xl-12" style={{ marginTop: "-18px", marginLeft: "-5px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "#eee97f", textAlign: "center", fontWeight: "bold", fontSize: "21px", fontFamily: "MyFont" }}>
                          Mindpay Purchase</div>
                        <br />
                        <form
                            onSubmit={(event) => {

                                event.preventDefault();

                                const spender = this.state.contractAddress;
                                const amount = this.state.count; 
                                 
                                if (amount > 0) {
                                    this.purchase( amount); 
                                }  
                            }  
                            
                        } 

                        >    
                        <label style={{color: "#eee97f"}}>Enter Amount (in ETH) </label>
                        <input type="text" style={{ backgroundColor: "black", borderRadius: "2px", height: "50px", color: "#eee97f", fontSize: "25px", paddingLeft: "30px", border: "4px solid white", width: "100%" }} onChange={this.changeHandler} /> <br /><br />

 

                        <br />

                        {/* <p style={{ color: "#eee97f", textAlign: "center", fontSize: "22px" }}>Your token Balance : {this.props.tokenBal} tokens</p> */}
                        <p style={{ color: "#eee97f", textAlign: "center", fontSize: "14px" }}>You will receive : {this.state.tokenRec} MPY</p>
                         
                         
 
                        <div style={{ textAlign: "center" }}>
                            <button type="submit" className="btn btn-success" style={firstAllowanceButton}>Buy</button> 
                        </div>
                        </form> 

                    </div>
                    
                    <div className="col-xl-4"></div>
                </div>

            </div>
        )
    }
}

export default Purchase;
