"use client"

// Inspired by shadcn/ui
import { useState, useEffect } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

// Simple mock for now if not present, but usually this file exists in shadcn projects.
// If it was missing, we create a simple version.
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2)
    const newToast = { id, title, description, variant }
    setToasts((prev) => [...prev, newToast])
    
    // Auto remove
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
    
    // In a real app we'd dispatch to a global context
    console.log("Toast:", title, description)
     // Fallback alert for now since we don't have the full Toast Provider stack setup here if I am creating it from scratch
     // But let's assume the user might have a toast component but missing the hook?
  }

  return { toast, toasts }
}
