import React,{useState} from 'react'
import {ethers} from 'ethers';
import {toast} from 'react-hot-toast';
import "./css/fontawesome.css"
import "./css/templatemo-lugx-gaming.css"
import "./css/owl.css"
import "./css/animate.css"
import {Link, useNavigate} from 'react-router-dom'

const Header = () => {  

    const [connection, setConnection] = useState(0);

    const handleLinkClick = (e) => {
        if (connection !== 'connected') {
          e.preventDefault(); // Prevent the link from navigating
          toast.error('Please connect your wallet first!'); // Show error message
        }
      };
    
      const connectWallet =() =>{
        if (window.ethereum) {
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(result =>{
                accountChanged([result[0]])
            toast.success('Login Successfull');
            console.log('login success')
            setConnection('connected');
            })
        }else{
            toast.error('Login using Metamask Wallet only!!')
            console.log('need metamask so login')
        }
    }

    const accountChanged = (accountName) =>  {
        console.log(accountName)
    }


    const handleKeyPress = (event) => {
        // Add your custom keypress logic here
        console.log(event.target.value);
    }


  return (
    <header className="header-area header-sticky">
            <div className="container">
              <nav className="main-nav">
                {/* Logo */}
                <a href="#" className="logo">
                  <h1>Trudo</h1>
                </a>
    
                {/* Menu */}
                <ul className="nav">
                  <li>
                    <a href="#" className="active">Home</a>
                  </li>
                  <li>
                  <Link to='/nft' onClick={handleLinkClick}><a >NFT</a></Link>
                  </li>
                  <li>
                    <a >Create Campaign</a>
                  </li>
                  <li>
                  <button onClick={connectWallet} className="connect-button">
                    <img src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                        className="metamask-icon"
                        alt="MetaMask Icon"
                    />
                    {connection === 'connected' ? 'Connected' : 'Connect with MetaMask'}
                    </button>
                  </li>
                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </header>
  )
}

export default Header