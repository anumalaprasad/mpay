import React, { Component } from 'react'
import getBlockchain from './ethereum.js'; 
import {utils} from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

toast.configure(); 

export class Stake extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0 
        }
        
        this.cancelHandler = this.cancelHandler.bind(this);
        this.stakeHandler = this.stakeHandler.bind(this);
         
    }
   async cancelHandler( ){
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
    } 

    async stakeHandler( ){
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
        } 

    render() {

        const colStyle = {
            opacity: "80%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee", backgroundImage: "linear-gradient(to right, #131050, black)", padding:"10px"
        }; 

        const firstAllowanceButton = {
            display: "inline-block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "black",
            transition: ".4s",  fontWeight: "bold", fontFamily: "MyFont", textAlign: "center", backgroundImage: "linear-gradient(to right, #FFDD00, #FBB034)", fontSize: "18px", borderRadius: "30px" 
        };

        return (
            <div style={{ paddingTop: "60px" }} >
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}> 
 
                        <button type="submit" className="btn btn-success" onClick={this.stakeHandler} style={firstAllowanceButton}>Stake</button> 
                    </div>
                    <div className="col-xl-4" style={colStyle}> 

                         
                        <button type="submit" className="btn btn-success" onClick={this.cancelHandler} style={firstAllowanceButton}>Cancel</button> 
                         
                    </div>
                    <div className="col-xl-4"></div>
                </div>

            </div>
        )
    }
}

export default Stake;
