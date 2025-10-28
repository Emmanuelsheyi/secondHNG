import React, {useEffect, useState} from 'react'
import { listTickets, createTicket, updateTicket, deleteTicket } from '../services/tickets'
import { useToast } from './ToastProvider'

const STATUS_OPTIONS = ['open','in_progress','closed']

function StatusTag({status}){
  return <span className={`status ${status}`}>{status.replace('_',' ')}</span>
}

export default function Tickets(){
  const [tickets,setTickets]=useState([])
  const [loading,setLoading]=useState(true)
  const [form, setForm] = useState({title:'',description:'',status:'open',priority:''})
  const [errors, setErrors] = useState({})
  const [editingId, setEditingId] = useState(null)

  const { showToast } = useToast()

  async function load(){
    setLoading(true)
    try{
      const list = await listTickets()
      setTickets(list)
    }catch(e){
      showToast({type:'error', message:'Failed to load tickets. Please retry.'})
    }finally{setLoading(false)}
  }

  useEffect(()=>{load()},[])

  function validate(){
    const e = {}
    if(!form.title || !form.title.trim()) e.title = 'Title is required.'
    if(!STATUS_OPTIONS.includes(form.status)) e.status = 'Invalid status.'
    if(form.description && form.description.length>1000) e.description = 'Description too long.'
    setErrors(e)
    return Object.keys(e).length===0
  }

  async function onSubmit(e){
    e.preventDefault()
    if(!validate()) return
    try{
      if(editingId){
        await updateTicket(editingId, form)
        setEditingId(null)
        showToast({type:'success', message:'Ticket updated'})
      }else{
        await createTicket(form)
        showToast({type:'success', message:'Ticket created'})
      }
      setForm({title:'',description:'',status:'open',priority:''})
      load()
    }catch(err){
      showToast({type:'error', message: err.message || 'Failed'})
    }
  }

  function onEdit(t){
    setEditingId(t.id)
    setForm({title:t.title,description:t.description,status:t.status,priority:t.priority||''})
    window.scrollTo({top:0,behavior:'smooth'})
  }

  async function onDelete(id){
    if(!confirm('Delete this ticket?')) return
    try{
      await deleteTicket(id)
      load()
      showToast({type:'success', message:'Deleted'})
    }catch(err){
      showToast({type:'error', message: err.message || 'Failed to delete'})
    }
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Tickets</h2>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h3 style={{marginTop:0}}>{editingId ? 'Edit Ticket' : 'Create Ticket'}</h3>
        <form onSubmit={onSubmit} className="form">
          <div className="field">
            <label>Title</label>
            <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>

          <div className="field">
            <label>Status</label>
            <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
              {STATUS_OPTIONS.map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.status && <div className="error">{errors.status}</div>}
          </div>

          <div className="field">
            <label>Description</label>
            <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={4}></textarea>
            {errors.description && <div className="error">{errors.description}</div>}
          </div>

          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-primary" type="submit">{editingId? 'Save' : 'Create'}</button>
            {editingId && <button className="btn btn-ghost" type="button" onClick={()=>{setEditingId(null); setForm({title:'',description:'',status:'open',priority:''}); setErrors({})}}>Cancel</button>}
          </div>
        </form>
      </div>

      <div style={{marginTop:18}}>
        <h3>All Tickets</h3>
        {loading ? <p>Loading...</p> : (
          <div className="ticket-list">
            {tickets.length===0 && <p>No tickets yet.</p>}
            {tickets.map(t=> (
              <div key={t.id} className="ticket">
                <div>
                  <strong>{t.title}</strong>
                  <div style={{color:'#6b7280'}}>{t.description}</div>
                </div>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <StatusTag status={t.status} />
                  <button className="btn btn-ghost" onClick={()=>onEdit(t)}>Edit</button>
                  <button className="btn btn-ghost" onClick={()=>onDelete(t.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
