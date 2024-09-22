import React,{useState} from 'react'
import {ethers} from 'ethers';
import {toast} from 'react-hot-toast';

import {Link, useNavigate} from 'react-router-dom'

import "./css/fontawesome.css"
import "./css/templatemo-lugx-gaming.css"
import "./css/owl.css"
import "./css/animate.css"

import nft2 from "./images/nft2.jpg"

const Nftpage2 = () => {
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
          <h3>Lebanon : Pager Aid</h3>
          <span className="breadcrumb"><a href="#">Home</a>  &gt;  <a href="#">NFT</a>  &gt; Lebanon : Pager Aid</span>
        </div>
      </div>
    </div>
  </div>
  <div className="single-product section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="left-image">
            <img src={nft2} alt />
          </div>
        </div>
        <div className="col-lg-6 align-self-center">
          <h4>Lebanon : Pager Aid</h4>
          <span className="price">1.49 POL</span>
          <p>The pager explosions that occurred in Lebanon on September 17, 2024, caused widespread devastation, affecting both Hezbollah members and civilians. The incident resulted in at least 12 deaths and left more than 2,800 people injured. Victims suffered severe injuries from the blasts, and videos shared from emergency rooms highlighted the seriousness of&nbsp;the&nbsp;situation.</p>
          <form id="qty" action="#">
            <input type="qty" className="form-control" id={1} aria-describedby="quantity" placeholder={1} />
            <button type="submit"><i className="fa fa-shopping-bag" /> ADD TO CART</button>
          </form>
          {/* <ul>
      <li><span>Game ID:</span> COD MMII</li>
      <li><span>Genre:</span> <a href="#">Action</a>, <a href="#">Team</a>, <a href="#">Single</a></li>
      <li><span>Multi-tags:</span> <a href="#">War</a>, <a href="#">Battle</a>, <a href="#">Royal</a></li>
    </ul>*/}
        </div>
        <div className="col-lg-12">
          <div className="sep" />
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
</div>

  )
}

export default Nftpage2