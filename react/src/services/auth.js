// Simple auth service using localStorage
const USERS_KEY = 'ticketapp_users'
const SESSION_KEY = 'ticketapp_session'

function delay(ms=300){
  return new Promise(r=>setTimeout(r,ms))
}

export async function authSignup({email,password}){
  await delay(300)
  email = String(email || '').trim().toLowerCase()
  if(!email || !password) throw new Error('Email and password are required')
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  if(users.find(u=>u.email===email)) throw new Error('User already exists')
  const user = {email,password}
  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  // create session
  const token = Math.random().toString(36).slice(2)
  localStorage.setItem(SESSION_KEY, JSON.stringify({token,email}))
  return {token,email}
}

export async function authLogin({email,password}){
  await delay(300)
  email = String(email || '').trim().toLowerCase()
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  // add default demo user if none
  if(users.length===0){
    users.push({email:'demo@ticket.app',password:'Password123'})
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }
  const user = users.find(u=>u.email===email)
  if(!user || user.password !== password){
    throw new Error('Invalid credentials')
  }
  const token = Math.random().toString(36).slice(2)
  localStorage.setItem(SESSION_KEY, JSON.stringify({token,email}))
  return {token,email}
}

export function logout(){
  localStorage.removeItem(SESSION_KEY)
}

export function getSession(){
  try{
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  }catch(e){return null}
}
