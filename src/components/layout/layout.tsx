import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { Footer } from './footer'
import styles from './layout.module.css'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={styles.root}>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
