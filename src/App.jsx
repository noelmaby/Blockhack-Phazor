import React from 'react';
import {Routes,Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import MainP from "../src/pages/Mainpage/Mainpage"
import NftP from "../src/pages/Mainpage/Nftpage"
import Nft1p from "../src/pages/Mainpage/Nft1page"
import Nft2p from "../src/pages/Mainpage/Nftpage2"

function App() {

  return (
    <>
      <Toaster position='bottom-right' toastOptions={{duration:3000}} />

      <Routes>
        <Route path='/' element={<MainP/>} />
        <Route path='/nft' element={<NftP/>} />
        <Route path='/nft1' element={<Nft1p/>} />
        <Route path='/nft2' element={<Nft2p/>} />
      </Routes>
        
        
        
        
        
   
    </>
  )
}

export default App
