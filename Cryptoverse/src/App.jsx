import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import News from './components/News'
import Currency from './components/Currency'
import Exchanges from './components/Exchanges'
import Transfer from './components/Transfer'
import HomePage from './components/Homepage'

const App = () => {
  return (
    <div className="bg-gradient-to-tr from-[#000000] via-[#1a0021] to-[#6d0000] min-h-screen">
      <Routes>
          <Route path='/' element={<Navbar/>} >
            <Route index element={<HomePage/>}/>
            <Route path='/transfer' element={<Transfer/>} />
            <Route path='/currency' element={<Currency/>}/>
            <Route path='/exchanges' element={<Exchanges/>}/>
            <Route path='/news' element={<News/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App
