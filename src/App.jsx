import React from 'react';
import {Routes,Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import MainP from "../src/pages/Mainpage/Mainpage"
function App() {


  return (
    <>
      <Toaster position='bottom-right' toastOptions={{duration:3000}} />

      <Routes>
        <Route path='/' element={<MainP/>} />
      </Routes>
        
        
        
        
        
   
    </>
  )
}

export default App
