import React from 'react';
import {Routes,Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import MainP from "../src/pages/Mainpage/Mainpage"
import NftP from "../src/pages/Mainpage/Nftpage"

function App() {

  return (
    <>
      <Toaster position='bottom-right' toastOptions={{duration:3000}} />

      <Routes>
        <Route path='/' element={<MainP/>} />
        <Route path='/nft' element={<NftP/>} />
      </Routes>
        
        
        
        
        
   
    </>
  )
}

export default App
