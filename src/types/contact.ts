export interface ContactFormData {
  fullName: string
  phone: string
  email: string
  message: string
}

export type ContactFieldKey = keyof ContactFormData

export interface ContactApiResponse {
  success: boolean
  errors?: Partial<Record<ContactFieldKey, string>>
}
