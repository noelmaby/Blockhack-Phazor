import React from 'react'
import {toast} from 'react-hot-toast';
import {ethers} from 'ethers';


import {Link, useNavigate} from 'react-router-dom'


import "./css/fontawesome.css"
import "./css/templatemo-lugx-gaming.css"
import "./css/owl.css"
import "./css/animate.css"

import nft1 from "./images/nft1.jpg"
import nft2 from "./images/nft2.jpg"
import nft3 from "./images/nft3.jpg"
import nft4 from "./images/nft4.jpeg"
import nft5 from "./images/nft5.jpg"
import nft6 from "./images/nft6.jpg"
import nft7 from "./images/nft7.jpeg"
import nft8 from "./images/nft8.jpg"

const Nftpage = () => {

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
  {/* ***** Header Area Start ***** */}
  <header className="header-area header-sticky">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav">
            {/* ***** Logo Start ***** */}
            <h1 style={{color: 'white'}}>Trudo</h1>
            {/* ***** Logo End ***** */}
            {/* ***** Menu Start ***** */}
            <ul className="nav">
            <Link to='/'><li><a>Home</a></li></Link>
             <Link to='/nft'><li><a href="#">NFT</a></li></Link> 
              <li><a href="#" >Create Campaign</a></li>
              
            </ul>   
            <a className="menu-trigger">
              <span>Menu</span>
            </a>
            {/* ***** Menu End ***** */}
          </nav>
        </div>
      </div>
    </div>
  </header>
  {/* ***** Header Area End ***** */}
  <div className="page-heading header-text">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h3>Popular NFTs</h3>
          <span className="breadcrumb"><a href="">Home</a> &gt; NFT</span>
        </div>
      </div>
    </div>
  </div>
  <div className="section trending">
    <div className="container">
      <ul className="trending-filter">
        <li>
          <a className="is_active" href="#!" data-filter="*">Show All</a>
        </li>
        <li>
          <a href="#">Landslides</a>
        </li>
        <li>
          <a href="#">Earthquakes</a>
        </li>
        <li>
          <a href="#">Flood</a>
        </li>
      </ul>
      {/*data-filter=".adv"
data-filter=".str"
data-filter=".rac"*/}
      <div className="row trending-box">
        <div className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv">
          <div className="item">
            <div className="thumb">
              <a ><img src={nft1} alt /></a>
              {/*<span class="price"><em>Rs 450/-</em>Rs 350/-</span>*/}
            </div>
            <div className="down-content">
              <span className="category">Wayanad</span>
              <h4>Rebuild</h4>
              <Link to='/nft1'> <i className="fa fa-shopping-bag" /></Link>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 str">
          <div className="item">
            <div className="thumb">
              <a><img src={nft2} alt /></a>
            </div>
            <div className="down-content">
              <span className="category">Lebanon</span>
              <h4>Pager Aid</h4>
              <Link to='/nft2'> <i className="fa fa-shopping-bag" /></Link>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv rac">
          <div className="item">
            <div className="thumb">
              <a href="product-details.html"><img src={nft3} alt /></a>
            </div>
            <div className="down-content">
              <span className="category">Uttarakhand</span>
              <h4>ReLeaf</h4>
              <a><i className="fa fa-shopping-bag" /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 str">
          <div className="item">
            <div className="thumb">
              <a ><img src={nft4} alt /></a>
            </div>
            <div className="down-content">
              <span className="category">Assam</span>
              <h4>Flood to Future</h4>
              <a ><i className="fa fa-shopping-bag" /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 rac str">
          <div className="item">
            <div className="thumb">
              <a ><img src={nft5} alt /></a>
            </div>
            <div className="down-content">
              <span className="category">China</span>
              <h4>Survive Leukemia</h4>
              <a ><i className="fa fa-shopping-bag" /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 rac adv">
          <div className="item">
            <div className="thumb">
              <a ><img src={nft6} alt /></a>
            </div>
            <div className="down-content">
              <span className="category">Africa</span>
              <h4>End hunger </h4>
              <a ><i className="fa fa-shopping-bag" /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 rac str">
          <div className="item">
            <div className="thumb">
              <a><img src={nft7} alt /></a>
            </div>
            <div className="down-content">
              <span className="category">Uttar Pradesh</span>
              <h4>Flood</h4>
              <a ><i className="fa fa-shopping-bag" /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 rac adv">
          <div className="item">
            <div className="thumb">
              <a ><img src={nft8} alt /></a>
            </div>
            <div className="down-content">
              <span className="category">Vilangad</span>
              <h4>Hope</h4>
              <a><i className="fa fa-shopping-bag" /></a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ul className="pagination">
              <li><a href="#"> &lt; </a></li>
              {/*<li><a href="#">1</a></li>
      <li><a class="is_active" href="#">2</a></li>
      <li><a href="#">3</a></li>
    */}
              <li><a href="#"> &gt; </a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div className="container">
        <div className="col-lg-12">
          <p>Copyright © 2024 Trudo NFT Campaign Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div></div>

      );
}

export default Nftpage