import { useState, useEffect } from 'react'
import { seDispatch } from 'react-redux'
import authService from './Appwrite/auth'
import { login, logout } from './Store/authSlice'
import './App.css'

function App() {
  const [loading, setloading] = useState(true) // For conditional rendering.
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setloading(false))
  }, [])

  return (
    <>
      <h1>Hello world!</h1>
    </>
  )
}

export default App
