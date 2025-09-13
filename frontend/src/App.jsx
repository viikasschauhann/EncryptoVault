import React from 'react'
import EncryptedFileVault from './components/FileVault'
import { Routes, Route } from 'react-router';
import About from './Pages/About'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<EncryptedFileVault />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
