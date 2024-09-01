import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { FC, useState } from 'react'
import { useFeedback } from '../feedback'

type Props = {
  onLogin: (token: string) => void
}

export const Auth: FC<Props> = ({ onLogin }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const { Feedback, setIsLoading, setError } = useFeedback()

  function handleLogin() {
    setIsLoading(true)
    axios
      .post<{ authed: boolean }>('https://enscli-backend.fly.dev/auth', {
        user,
        password,
      })
      .then((res) => {
        if (!res.data?.authed) throw new Error('Invalid credentials')
        const token = 'Basic ' + btoa(`${user}:${password}`)
        onLogin(token)
        localStorage?.setItem('auth', token)
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin()
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
        border: '1px solid #ccc',
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" component="h1">
        Acceso a ENSCLI
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          name="user"
          label="Ususario"
          variant="outlined"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <TextField
          name="password"
          label="Contraseña"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
      <Feedback />
    </Box>
  )
}
