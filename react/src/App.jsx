import React from 'react'
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { getSession, logout as doLogout } from './services/auth'
import Landing from './components/Landing'
import AuthLogin from './components/AuthLogin'
import AuthSignup from './components/AuthSignup'
import Dashboard from './components/Dashboard'
import Tickets from './components/Tickets'
import ProtectedRoute from './components/ProtectedRoute'

function App(){
  const location = useLocation()
  const navigate = useNavigate()
  const [auth, setAuth] = React.useState(!!getSession())
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(()=>{
    // update auth flag when location changes (login/signup will navigate)
    setAuth(!!getSession())
    setMobileOpen(false)
  },[location])

  function handleLogout(){
    doLogout()
    setAuth(false)
    navigate('/')
  }

  return (
    <div>
      <nav className="nav container">
        <div className="logo">TicketApp</div>

        <button className="nav-toggle btn-ghost" aria-expanded={mobileOpen} onClick={()=>setMobileOpen(v=>!v)} aria-label="Toggle menu">☰</button>

        <div className="nav-actions" style={{display:'flex',gap:12,alignItems:'center'}}>
          <Link to="/" className="btn btn-ghost home-btn">Home</Link>
          {auth && <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>}

          {!auth ? (
            <>
              <Link to="/auth/login" className="btn btn-ghost">Login</Link>
              <Link to="/auth/signup" className="btn btn-primary">Get Started</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          )}
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu container">
          <Link to="/" className="btn btn-ghost home-btn">Home</Link>
          {auth && <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>}
          {!auth ? (
            <>
              <Link to="/auth/login" className="btn btn-ghost">Login</Link>
              <Link to="/auth/signup" className="btn btn-primary">Get Started</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          )}
        </div>
      )}

      <main className="container">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/auth/login" element={<AuthLogin/>} />
          <Route path="/auth/signup" element={<AuthSignup/>} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/tickets" element={<ProtectedRoute><Tickets/></ProtectedRoute>} />

          <Route path="/auth" element={<Navigate to="/auth/login" replace/>} />
        </Routes>
      </main>

      <footer className="container footer">© {new Date().getFullYear()} TicketApp — Built with React</footer>
    </div>
  )
}

export default App
