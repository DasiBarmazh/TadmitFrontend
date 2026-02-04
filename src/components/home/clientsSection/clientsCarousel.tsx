import styles from './clientsCarousel.module.css'

export interface ClientItem {
  id: string
  name: string
  location?: string
  year?: string
  image: string
  mainImage?: string
  text: string
}

interface ClientsCarouselProps {
  items: ClientItem[]
  activeId: string
  onSelect: (id: string) => void
}

export function ClientsCarousel({
  items,
  activeId,
  onSelect,
}: ClientsCarouselProps) {
  return (
    <div className={styles.carousel}>
      <div className={styles.track}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.thumb} ${activeId === item.id ? styles.thumbActive : ''}`}
            onClick={() => onSelect(item.id)}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className={styles.thumbImg}
              />
            ) : (
              <span className={styles.thumbPlaceholder}>
                {item.name.slice(0, 1)}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
