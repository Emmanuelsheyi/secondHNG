import React from 'react'
import Wave from '../../assets/wave.svg'

export default function Landing(){
  return (
    <section className="hero">
      <div className="circle-deco circle-1" aria-hidden></div>
      <div className="hero-inner">
        <div style={{flex:'1 1 400px'}}>
          <h1>TicketApp — Track issues, move faster</h1>
          <p>A lightweight ticket management demo built across multiple frontend frameworks. Create, edit, and organize tickets with a clean UI.</p>
          <div className="cta">
            <a href="/auth/login" className="btn btn-primary">Login</a>
            <a href="/auth/signup" className="btn btn-ghost">Get Started</a>
          </div>
        </div>

        <div style={{flex:'0 0 320px'}} aria-hidden>
          <div className="card" style={{height:180}}>
            <h3 style={{marginTop:0}}>Quick features</h3>
            <ul>
              <li>CRUD tickets</li>
              <li>Protected routes</li>
              <li>Responsive layout</li>
            </ul>
          </div>
        </div>
      </div>

      <img src={Wave} alt="wave decoration" className="wave"/>
      <div className="circle-deco circle-2" aria-hidden></div>
    </section>
  )
}
