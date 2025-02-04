import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import Glossary  from './pages/Glossary'
import SpeechBuilder  from './pages/SpeechBuilder'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/glossary' element={<Glossary/>}/>
      <Route path='/speech-builder' element={<SpeechBuilder/>}/>
    </Routes>
  )
}

export default App
