import React, { Component } from 'react'

import getBlockchain from './ethereum.js'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

toast.configure();

export class UserInfo extends Component {
 
    constructor(props) {
        super(props)

        this.state = {
            count: 0 
        }
        
        this.cancelHandler = this.cancelHandler.bind(this);
        this.stakeHandler = this.stakeHandler.bind(this);
         
    }
   async cancelHandler( ){
    if(this.props.diff === 0){
    const { currentAcc, contractInstance } = await getBlockchain();
        await contractInstance
        .cancel({
            from: currentAcc 
        })
        .then(res => toast.success( 'Purchase  processing, Please wait do not refresh', { position: toast.POSITION.TOP_RIGHT, autoClose: 20000 }) 
        ).then(res => {
            setInterval(() => {
                window.location.reload();
            }, 20000);
        }).catch(err => toast.error(err + " Unknown Error (first) "));
        } else {
            toast.error( " please wait for " + this.props.diff +" seconds");
        }
    }

    async stakeHandler( ){
    if(this.props.diff === 0){

        const { currentAcc, contractInstance } = await getBlockchain();
            await contractInstance
            .stake({
                from: currentAcc 
            })
            .then(res => toast.success( 'Purchase  processing, Please wait do not refresh', { position: toast.POSITION.TOP_RIGHT, autoClose: 20000 }) 
            ).then(res => {
                setInterval(() => {
                    window.location.reload();
                }, 20000);
            }).catch(err => toast.error(err + " Unknown Error (first) "));
        } else {
            toast.error( " please wait for " + this.props.diff +" seconds");
        }
        } 

    render(){

        const colStyle = {
            opacity: "80%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee", backgroundImage: "linear-gradient(to right, #131050, black)"
        };

        const headerStyle ={ marginTop: "-18px", marginLeft: "-5px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "#eee97f", textAlign: "center", fontWeight: "bold", fontSize: "21px" };
        return (

            <div style={{ paddingTop: "60px" }}>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <div className="col-xl-6" style={headerStyle}>
                            User Stats</div>
                        <br /> 

                        <div className="col-xl-12" style={{ textAlign: "center" }}>
          
                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}>User Address</p>
                            <a href="#1" style={{ color: "#eee97f", fontSize: "17px", textAlign: "center" }}> {this.props.currentAcc }  </a>
                            <br /><br />
                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}> Total MPay purchased</p>
                            <a href="#1" style={{ color: "#eee97f", fontSize: "15px", textAlign: "center" }}> {this.props.token_amt } MPAY </a>
                            <br /><br />
                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}> Ether Value of Purchase</p>
                            <a href="#1" style={{ color: "#eee97f", fontSize: "15px", textAlign: "center" }}> {this.props.ether_amt }  </a>
                            <br /><br />
                            <p style={{ color: "white", fontSize: "17px", textAlign: "center" }}> Time left to Cancel/Stake</p>
                            <a href="#1" style={{ color: "#eee97f", fontSize: "15px", textAlign: "center" }}> {this.props.diff } s  </a>
                            <br /><br />
                            <button type="submit" className="btn btn-success" onClick={this.stakeHandler}  >Stake</button> 
                            <br /><br />
                            <button type="submit" className="btn btn-warning" onClick={this.cancelHandler}  >Cancel</button>
                            <br /><br />
                            
                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >
        )
    }
}

export default UserInfo
