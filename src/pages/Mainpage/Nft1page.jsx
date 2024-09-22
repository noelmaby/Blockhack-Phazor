import React,{useState} from 'react'
import {ethers} from 'ethers';
import {toast} from 'react-hot-toast';

import {Link, useNavigate} from 'react-router-dom'

import "./css/fontawesome.css"
import "./css/templatemo-lugx-gaming.css"
import "./css/owl.css"
import "./css/animate.css"

import nft1 from "./images/nft1.jpg"

const Nft1page = () => {
  return (
    <div>
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
          <h3>Wayanad: Rebuild</h3>
          <span className="breadcrumb"><a href="#">Home</a>  &gt;  <a href="#">NFT</a>  &gt; Wayanad:Rebuild</span>
        </div>
      </div>
    </div>
  </div>
  <div className="single-product section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="left-image">
            <img src={nft1} alt />
          </div>
        </div>
        <div className="col-lg-6 align-self-center">
          <h4>Wayanad: Rebuild</h4>
          <span className="price">1.49 POL</span>
          <p>On July 2024, Wayanad was struck by one of the deadliest landslides in Kerala’s history, triggered by intense monsoon rains. The landslide wiped out several villages, including Punjirimattom, Mundakkai, and Chooralmala. Over 285 people tragically lost their lives. Entire families were buried under the debris, and hundreds of homes and properties&nbsp;were&nbsp;destroyed.</p>
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

export default Nft1page