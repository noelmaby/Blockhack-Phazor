import React,{useState} from 'react'
import {ethers} from 'ethers';

const Login = () => {

    const [errorMessage,setErrorMessage]=useState(null);
    const [defaultAccount,setDefaultAccount]=useState(null);
     
    const connectWallet =() =>{
        if (window.ethereum) {
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(result =>{
                accountChanged([result[0]])
            })
        }else{
            setErrorMessage('install MetaMask !!')
        }
    }

    const accountChanged = (accountName) =>  {
        setDefaultAccount(accountName)
    }

  return (
    <div>
        <h1>Metamask wallet connectio</h1>
        <button onClick={connectWallet}>Connect to metamask</button>
        <h2>Adress: {defaultAccount}</h2>

        {errorMessage}
    </div>
  )
}

export default Login
