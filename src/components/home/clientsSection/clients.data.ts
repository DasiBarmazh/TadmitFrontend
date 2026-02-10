import cus1 from '../../../../imgs/cus1.JPG'
import cus2 from '../../../../imgs/cus2.JPG'
import cus3 from '../../../../imgs/cus3.JPG'
import cus4 from '../../../../imgs/cus4.JPG'
import cus5 from '../../../../imgs/cus5.JPG'
import type { Client } from './clients.types'

export const CLIENTS: Client[] = [
  {
    id: '1',
    name: 'יצחק ונועה,',
    location: 'בית וגן, ירושלים',
    year: '2025',
    quote: 'זוג צעיר עם נכס מניב ביד',
    image: cus1,
  },
  {
    id: '2',
    name: 'עדי ותומר,',
    location: 'רמת השרון',
    year: '2024',
    quote: 'דיוק החלטות לפני חתימה',
    image: cus2,
  },
  {
    id: '3',
    name: 'משפחת לוי,',
    location: 'גבעת שמואל',
    year: '2023',
    quote: 'תהליך קצר שהפך בלבול לתכנית',
    image: cus3,
  },
  {
    id: '4',
    name: 'אורן,',
    location: 'חיפה',
    year: '2025',
    quote: 'מיקוד מספרים וסינון רעשי רקע',
    image: cus4,
  },
  {
    id: '5',
    name: 'נועה,',
    location: 'תל אביב',
    year: '2022',
    quote: 'צעדים ברורים להמשך – בקצב שנכון לי',
    image: cus5,
  },
]

