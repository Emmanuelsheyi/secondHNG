import React, {useEffect, useState} from 'react'
import { listTickets } from '../services/tickets'
import { logout } from '../services/auth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const [stats,setStats]=useState({total:0,open:0,in_progress:0,closed:0})
  const [loading,setLoading]=useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    async function load(){
      try{
        const list = await listTickets()
        const total = list.length
        const open = list.filter(t=>t.status==='open').length
        const in_progress = list.filter(t=>t.status==='in_progress').length
        const closed = list.filter(t=>t.status==='closed').length
        setStats({total,open,in_progress,closed})
      }catch(e){
        // ignore
      }finally{setLoading(false)}
    }
    load()
  },[])

  function doLogout(){
    logout()
    navigate('/auth/login')
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Dashboard</h2>
        <div>
          <button className="btn btn-ghost" onClick={()=>navigate('/tickets')}>Manage Tickets</button>
          <button className="btn btn-ghost" onClick={doLogout}>Logout</button>
        </div>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="cards">
          <div className="card">
            <h3>Total tickets</h3>
            <p style={{fontSize:22,fontWeight:700}}>{stats.total}</p>
          </div>
          <div className="card">
            <h3>Open</h3>
            <p style={{fontSize:22,fontWeight:700}}>{stats.open}</p>
          </div>
          <div className="card">
            <h3>In Progress</h3>
            <p style={{fontSize:22,fontWeight:700}}>{stats.in_progress}</p>
          </div>
          <div className="card">
            <h3>Resolved</h3>
            <p style={{fontSize:22,fontWeight:700}}>{stats.closed}</p>
          </div>
        </div>
      )}
    </div>
  )
}
