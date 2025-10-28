import React from 'react'
import { Navigate } from 'react-router-dom'

function hasSession(){
  try{
    const s = localStorage.getItem('ticketapp_session')
    return !!s
  }catch(e){
    return false
  }
}

export default function ProtectedRoute({children}){
  if(!hasSession()){
    return <Navigate to="/auth/login" replace />
  }
  return children
}
