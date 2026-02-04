import { useNavigate, useLocation } from 'react-router-dom'
import styles from './logo.module.css'

const LOGO_IMG_SRC = `/imgs/${encodeURIComponent('Frame 16 (1).png')}`

export function Logo() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <button type="button" className={styles.logo} onClick={handleClick}>
      <img
        src={LOGO_IMG_SRC}
        alt=""
        className={styles.icon}
      />
    </button>
  )
}
 