const TICKETS_KEY = 'ticketapp_tickets'

function delay(ms=200){return new Promise(r=>setTimeout(r,ms))}

function load(){
  return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
}

function save(list){
  localStorage.setItem(TICKETS_KEY, JSON.stringify(list))
}

export async function listTickets(){
  await delay()
  return load()
}

export async function createTicket({title,description='',status='open',priority}){
  await delay()
  if(!title) throw new Error('Title is required')
  if(!['open','in_progress','closed'].includes(status)) throw new Error('Invalid status')
  const list = load()
  const id = Date.now().toString()
  const item = {id,title,description,status,priority:priority||null,createdAt:new Date().toISOString()}
  list.unshift(item)
  save(list)
  return item
}

export async function updateTicket(id, data){
  await delay()
  const list = load()
  const idx = list.findIndex(t=>t.id===id)
  if(idx===-1) throw new Error('Ticket not found')
  const updated = {...list[idx],...data}
  if(!updated.title) throw new Error('Title is required')
  if(!['open','in_progress','closed'].includes(updated.status)) throw new Error('Invalid status')
  list[idx] = updated
  save(list)
  return updated
}

export async function deleteTicket(id){
  await delay()
  let list = load()
  const exists = list.find(t=>t.id===id)
  if(!exists) throw new Error('Ticket not found')
  list = list.filter(t=>t.id!==id)
  save(list)
  return true
}
