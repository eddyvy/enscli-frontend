import { useState } from 'react'
import './App.css'
import { Auth } from './features/auth'
import { Chat } from './features/chat'
import LogoutIcon from '@mui/icons-material/Logout'
import { Fab } from '@mui/material'

function App() {
  const [auth, setAuth] = useState(localStorage?.getItem('auth') || '')
  return (
    <>
      {auth ? (
        <>
          <Chat auth={auth} />
          <Fab
            color="primary"
            sx={{ position: 'fixed', bottom: 8, right: 8 }}
            onClick={() => {
              setAuth('')
              localStorage?.removeItem('auth')
            }}
          >
            <LogoutIcon />
          </Fab>
        </>
      ) : (
        <Auth onLogin={(token) => setAuth(token)} />
      )}
    </>
  )
}

export default App
