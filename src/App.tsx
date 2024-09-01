import { useState } from 'react'
import './App.css'
import { Auth } from './features/auth'
import { Chat } from './features/chat'

function App() {
  const [auth, setAuth] = useState(localStorage?.getItem('auth') || '')
  return (
    <>
      {auth ? (
        <Chat auth={auth} />
      ) : (
        <Auth onLogin={(token) => setAuth(token)} />
      )}
    </>
  )
}

export default App
