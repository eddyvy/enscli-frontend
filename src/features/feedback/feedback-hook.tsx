import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material'
import { useState } from 'react'

export function useFeedback() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const Feedback = () => (
    <>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => setError('')}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Error: {error}
        </Alert>
      </Snackbar>
    </>
  )

  return {
    isLoading,
    setIsLoading,
    error,
    setError,
    Feedback,
  }
}
