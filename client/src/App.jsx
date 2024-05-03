import { useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import Modal from './components/Modal'

function App() {

  const [isloggedin, setIsLoggedIn] = useState(false)

  return (
    <>
    <Timer/>
    {!isloggedin ? <Modal setIsLoggedIn = {() => setIsLoggedIn(true)}/>: <> </>}
    </>
  )
}

export default App
