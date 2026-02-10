export const TEXTS = {
  menu: 'תפריט',
  menuNav: 'תפריט ניווט',
  closeMenu: 'סגור תפריט',
  

  navHome: 'דף הבית',
  navContact: 'יצירת קשר',

  heroHeadline: 'עסקה טובה נולדת,\nמהבנה מלאה של התמונה',
  heroSubline: 'מולי פשדמיסקי',

  ctaTitle: 'מולי פשדמיסקי',
  ctaParagraph1:
    'שמי מולי פשדמיסקי. התשוקה לנדל"ן מלווה אותי שנים,\n מתוך עניין עמוק באופן שבו מתקבלות החלטות שמשפיעות על חיים שלמים. \nלאורך הדרך נחשפתי מקרוב לעולם העסקאות, לשיקולים שמניעים אותו,\n ולפער שקיים לא פעם בין הסיפור שמוצג ללקוח לבין התמונה המלאה.',
  ctaParagraph2:
    'עבודתי מבוססת על הסתכלות רחבה ומעמיקה: ניתוח מספרים, הבנת מטרות ההשקעה, בחינת רמת הסיכון, התאמה אישית, לוחות זמנים והיבטים תכנוניים. \nלא חיפוש אחר עסקה, אלא בדיקה יסודית של ההחלטה שעומדת מאחוריה.',
  ctaParagraph3:
    'אני מעניק ייעוץ אובייקטיבי ומקיף, ללא אינטרסים חיצוניים,\n מתוך מטרה אחת ברורה - לאפשר ללקוח לקבל החלטה נכונה, שקולה ומבוססת,\n כזו שאפשר לעמוד מאחוריה גם לאורך זמן.',
  ctaButton: 'בואו נתקדם הלאה',

  whatIDoTitle: 'מה אני עושה',
  whatIDoItem1Title: 'פגישות ייעוץ ואפיון לרוכשים ומשקיעים',
  whatIDoItem1FullText:
    'לרוכשים ומשקיעים בתחילת הדרך או בצומת החלטה. \nמיפוי מטרות, יכולת מימון, רמת סיכון והכיוון הנכון לפעולה.',
  whatIDoItem2Title: 'פגישות ייעוץ לאחר עסקה',
  whatIDoItem2FullText:
    '.למי שכבר מחזיק נכס ומתלבט לגבי המשך הדרך. \nבחינה שקולה של החזקה, מימוש או שינוי הסטרטגיה',
  whatIDoItem3Title: 'בחינת עסקאות נדל"ן',
  whatIDoItem3FullText:
    'בדיקה מקיפה של עסקה קיימת או מוצעת. \nניתוח מספרים, סיכונים, היבטים תכנוניים והתאמה אישית – לפני החלטה.',
  whatIDoItem4Title: 'ליווי משקיעים',
  whatIDoItem4FullText:
    'ליווי אישי ומתמשך בתהליך קבלת החלטות השקעה. \nהגדרת הסטרטגיה, בחינת חלופות וליווי בצמתים משמעותיים.',
  whatIDoItem5Title: 'תיווך וליווי עסקאות יזמיות',
  whatIDoItem5FullText:
    'תיווך ממוקד בעסקאות יזמיות נבחרות. \nמתאים ליזמים ולמשקיעים מנוסים המחפשים חיבור לעיסקאות גדולות ומורכבות.',

  clientsTitle: 'הלקוחות שלנו',
  client1Name: 'יצחק ונועה',
  client1Location: 'בית וגן, ירושלים',
  client1Year: '2025',
  client1Text: 'זוג צעיר עם נכס מניב ביד',
  client2Name: 'לקוח ב',
  client2Location: 'תל אביב',
  client2Year: '2024',
  client2Text: 'תוכן לדוגמה – לקוח ב.',
  client3Name: 'לקוח ג',
  client3Location: 'חיפה',
  client3Year: '2024',
  client3Text: 'תוכן לדוגמה – לקוח ג.',

  contactUsTitle: 'Contact us',
  contactPageTitle: 'השאירו פרטים ונחזור אליכם בהקדם.',
  formFullName: 'שם',
  formPhone: 'טלפון',
  formEmail: 'Email',
  formMessage: 'הודעה',
  formSubmit: 'שלח',
  formSubmitting: 'שולח...',
  formSuccess: 'ההודעה נשלחה בהצלחה.',
  formError: 'אירעה שגיאה בשליחה.',

  validationFullNameRequired: 'נא למלא את השם.',
  validationFullNameMaxLength: 'השם ארוך מדי.',
  validationFullNameInvalid: 'השם מכיל תווים לא חוקיים.',
  validationPhoneRequired: 'נא למלא את מספר הטלפון.',
  validationPhoneInvalid: 'מספר הטלפון לא תקין.',
  validationEmailRequired: 'נא למלא את כתובת האימייל.',
  validationEmailInvalid: 'כתובת האימייל לא תקינה.',
  validationMessageRequired: 'נא למלא את ההודעה.',
  validationMessageMaxLength: 'ההודעה ארוכה מדי.',
  validationMessageInvalid: 'ההודעה מכילה תווים לא חוקיים.',

  contactAddress: 'הצבי 15 ירושלים',
  contactPhone: '0559933699',
  contactEmail: 'd0534116358@gmail.com',

  footerDesignBy: 'Riki Kahan Design',
  footerAuto: 'Auto',
  footerTagline: 'מולי פשדמיסקי יועץ וליווי השקעות בנדל"ן',

  imageAltFallback: 'תמונה',
} as const

export const WHAT_I_DO_ITEMS = [
  { id: '1', title: TEXTS.whatIDoItem1Title, fullText: TEXTS.whatIDoItem1FullText },
  { id: '2', title: TEXTS.whatIDoItem2Title, fullText: TEXTS.whatIDoItem2FullText },
  { id: '3', title: TEXTS.whatIDoItem3Title, fullText: TEXTS.whatIDoItem3FullText },
  { id: '4', title: TEXTS.whatIDoItem4Title, fullText: TEXTS.whatIDoItem4FullText },
  { id: '5', title: TEXTS.whatIDoItem5Title, fullText: TEXTS.whatIDoItem5FullText },
] as const

export const WHAT_I_DO_IMAGES = [
  { id: '1', src: '', alt: TEXTS.whatIDoItem1Title },
  { id: '2', src: '', alt: TEXTS.whatIDoItem2Title },
  { id: '3', src: '', alt: TEXTS.whatIDoItem3Title },
  { id: '4', src: '', alt: TEXTS.whatIDoItem4Title },
  { id: '5', src: '', alt: TEXTS.whatIDoItem5Title },
]

export const CLIENTS_DATA = [
  {
    id: '1',
    name: TEXTS.client1Name,
    location: TEXTS.client1Location,
    year: TEXTS.client1Year,
    image: '',
    mainImage: '',
    text: TEXTS.client1Text,
  },
  {
    id: '2',
    name: TEXTS.client2Name,
    location: TEXTS.client2Location,
    year: TEXTS.client2Year,
    image: '',
    mainImage: '',
    text: TEXTS.client2Text,
  },
  {
    id: '3',
    name: TEXTS.client3Name,
    location: TEXTS.client3Location,
    year: TEXTS.client3Year,
    image: '',
    mainImage: '',
    text: TEXTS.client3Text,
  },
] as const
