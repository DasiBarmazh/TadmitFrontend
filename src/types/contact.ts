export interface ContactFormData {
  fullName: string
  phone: string
  email: string
  message: string
}

export interface ContactApiResponse {
  success: boolean
  error?: string
}
