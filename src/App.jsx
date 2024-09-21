import React from 'react';
import {Routes,Route} from 'react-router-dom'

import LoginP from "../src/pages/Loginpage/Login"
function App() {


  return (
    <>
      <Routes>

        <Route path='/' element={<LoginP/>} />
      </Routes>
        
        
        
        
        
   
    </>
  )
}

export default App
