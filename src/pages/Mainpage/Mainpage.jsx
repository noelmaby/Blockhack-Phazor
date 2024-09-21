import React,{useState} from 'react'
import {ethers} from 'ethers';
import {toast} from 'react-hot-toast';

const Login = () => {

     
    const connectWallet =() =>{
        if (window.ethereum) {
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(result =>{
                accountChanged([result[0]])
            toast.success('Login Successfull');
            console.log('login success')
            })
        }else{
            toast.error('Login using Metamask Wallet only!!')
            console.log('need metamask so login')
        }
    }

    const accountChanged = (accountName) =>  {
        console.log(accountName)
    }

  return (
    <div>
        
        <button onClick={connectWallet}>Connect to metamask</button>
        

        
    </div>
  )
}

export default Login
