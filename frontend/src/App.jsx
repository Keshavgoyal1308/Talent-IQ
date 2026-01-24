
import './App.css'
import { SignedOut, SignInButton } from '@clerk/clerk-react'

function App() {
 

  return (
    <>
      <h1>Welcome to the Interview Platform</h1>

      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      
    </>
  )
}

export default App
