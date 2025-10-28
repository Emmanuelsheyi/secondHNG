import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { authSignup } from '../services/auth'
import { useToast } from './ToastProvider'

export default function AuthSignup(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const navigate = useNavigate()

  const { showToast } = useToast()

  async function onSubmit(e){
    e.preventDefault();
    setError('')
    try{
      await authSignup({email,password})
      showToast({type:'success', message:'Account created'})
      navigate('/dashboard')
    }catch(err){
      const msg = err.message || 'Signup failed'
      setError(msg)
      showToast({type:'error', message: msg})
    }
  }

  return (
    <div style={{maxWidth:520}}>
      <h2>Create Account</h2>
      <form onSubmit={onSubmit} className="form">
        <div className="field">
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div className="field">
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required minLength={6} />
        </div>
        {error && <div className="error" role="alert">{error}</div>}
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-primary" type="submit">Signup</button>
          <a style={{alignSelf:'center'}} href="/auth/login">Already have account?</a>
        </div>
      </form>
    </div>
  )
}
