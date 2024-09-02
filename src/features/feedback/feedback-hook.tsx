import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material'
import { useState } from 'react'

export function useFeedback(global = true) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const Feedback = () => (
    <>
      {global ? (
        <Backdrop open={isLoading}>
          <CircularProgress />
        </Backdrop>
      ) : (
        isLoading && <CircularProgress />
      )}
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
