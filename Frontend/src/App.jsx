import { useState } from 'react'
import login from './pages/login'
import signup from './pages/signup'

function App() {
  const [showLogin, setShowLogin] = useState(true)

  return  (
    <div>
      {showLogin ? <LoginPage /> : <SignupPage />}
    </div>
  )
}

export default App
