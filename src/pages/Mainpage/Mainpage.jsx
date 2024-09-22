import React,{useState} from 'react'
import {ethers} from 'ethers';
import {toast} from 'react-hot-toast';

import {Link, useNavigate} from 'react-router-dom'

import "./css/fontawesome.css"
import "./css/templatemo-lugx-gaming.css"
import "./css/owl.css"
import "./css/animate.css"

import shieldlock from  "./images/shield-lock.svg"
import transperancy from "./images/transparency.svg"
import graphup from "./images/graph-up-arrow.svg"
import cashcoin from "./images/cash-coin.svg"

import nft1 from "./images/nft1.jpg"
import nft2 from "./images/nft2.jpg"
import nft3 from "./images/nft3.jpg"
import nft4 from "./images/nft4.jpeg"

const Mainpage = () => {

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
        <>
          {/* Preloader */}
          
          {/* Header */}
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
    
          {/* Main Banner */}
          <div className="main-banner">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="caption header-text">
                    <h6>Welcome to Trudo</h6>
                    <h2>TRUE DONATIONS!</h2>
                    <p>
                      Trudo is a free, blockchain-powered donation platform designed to
                      transform the world of online giving. With Trudo, donors can securely
                      support verified charitable campaigns while receiving unique NFTs as rewards.
                    </p>
                    <div className="search-input">
                      <form id="search" action="#">
                        <input
                          type="text"
                          placeholder="Type Something"
                          id="searchText"
                          name="searchKeyword"
                          onKeyPress={handleKeyPress}
                        />
                        <button role="button">Search Now</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Features Section */}
          <div className="features">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <a href="#">
                    <div className="item">
                      <div className="image">
                        <img src={shieldlock} alt="" style={{ maxWidth: '44px' }} />
                      </div>
                      <h4>Secure Donations</h4>
                    </div>
                  </a>
                </div>
                <div className="col-lg-3 col-md-6">
                  <a href="#">
                    <div className="item">
                      <div className="image">
                        <img src={transperancy} alt="" style={{ maxWidth: '44px' }} />
                      </div>
                      <h4>Transparent Transactions</h4>
                    </div>
                  </a>
                </div>
                <div className="col-lg-3 col-md-6">
                  <a href="#">
                    <div className="item">
                      <div className="image">
                        <img src={graphup} alt="" style={{ maxWidth: '44px' }} />
                      </div>
                      <h4>Increased Trust</h4>
                    </div>
                  </a>
                </div>
                <div className="col-lg-3 col-md-6">
                  <a href="#">
                    <div className="item">
                      <div className="image">
                        <img src={cashcoin} alt="" style={{ maxWidth: '44px' }} />
                      </div>
                      <h4>Improved Fundraising</h4>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
    
          {/* Most Played Section */}
          <div className="section most-played">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="section-heading">
                    <h2>Popular NFTs</h2>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="main-button">
                    <a href="shop.html">View All</a>
                  </div>
                </div>
    
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="item">
                      <div className="thumb">
                        <a >
                          <img src={nft1} alt="" />
                        </a>
                      </div>
                      <div className="down-content">
                        <span className="category">Wayanad</span>
                        <h4>Rebuild</h4>
                        <Link to='/nft1' onClick={handleLinkClick}>Explore</Link>
                      </div>
                    </div>
                  </div>
    
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="item">
                      <div className="thumb">
                        <a >
                          <img src={nft2} alt="" />
                        </a>
                      </div>
                      <div className="down-content">
                        <span className="category">Lebanon</span>
                        <h4>Pager Aid</h4>
                        <Link to='/nft2' onClick={handleLinkClick}>Explore</Link>
                      </div>
                    </div>
                  </div>
    
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="item">
                      <div className="thumb">
                        <a >
                          <img src={nft3} alt="" />
                        </a>
                      </div>
                      <div className="down-content">
                        <span className="category">Uttarakhand</span>
                        <h4>ReLeaf</h4>
                        <a >Explore</a>
                      </div>
                    </div>
                  </div>
    
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="item">
                      <div className="thumb">
                        <a >
                          <img src={nft4} alt="" />
                        </a>
                      </div>
                      <div className="down-content">
                        <span className="category">Flood to Future</span>
                        <h4>Assam</h4>
                        <a >Explore</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Footer */}
          <footer>
            <div className="container">
              <div className="col-lg-12">
                <p>Copyright © 2024 Trudo NFT Campaign Company. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      );
};

export default Mainpage