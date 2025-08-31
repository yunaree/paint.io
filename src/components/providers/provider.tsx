"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { createPortal } from "react-dom"

type AlertType = { id: number; element: React.ReactNode }
type AlertContextType = { showAlert: (element: React.ReactNode, duration?: number) => void }

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const useAlert = () => {
  const ctx = useContext(AlertContext)
  if (!ctx) throw new Error("useAlert must be used within AlertProvider")
  return ctx
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertType[]>([])

  const showAlert = useCallback((element: React.ReactNode, duration = 3000) => {
    const id = Date.now()
    setAlerts((prev) => [...prev, { id, element }])

    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id))
    }, duration)
  }, [])

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 flex top-5 justify-center z-50 pointer-events-none">
            <div className="space-y-2">
              {alerts.map((a) => (
                <div
                  key={a.id}
                >
                  {a.element}
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}

    </AlertContext.Provider>
  )
}
