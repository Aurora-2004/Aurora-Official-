import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-primary font-sans text-white antialiased">
      <Navbar />
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  )
}
