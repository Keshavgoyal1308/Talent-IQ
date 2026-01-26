import React from 'react'
import { SignedOut, SignInButton } from '@clerk/clerk-react'
import { toast } from 'react-hot-toast';

const Homepage =  () => {
  
  return (
    <div>
        <h1>Welcome to the Interview Platform</h1>
     <button className='btn btn-secondary' onClick={()=> toast.success("This is success toast")}> Click Me</button>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </div>
  )
}

export default Homepage