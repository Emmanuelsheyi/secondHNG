import React, { createContext, useContext, useCallback, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  const showToast = useCallback(({ type = 'info', message = '', className = '' }) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, type, message, className }])
    // auto remove
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200)
  }, [])

  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  return (
    <ToastContext.Provider value={{ showToast, remove }}>
      {children}
      <div className="toast-wrap" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type} ${t.className || ''}`} role="status">
            <div className="toast-message">{t.message}</div>
            <button className="toast-close" onClick={() => remove(t.id)} aria-label="Dismiss">×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(){
  const ctx = useContext(ToastContext)
  if(!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastProvider
