import { z } from 'zod'
import { TEXTS } from '../constants/texts'

const MAX_FULL_NAME_LENGTH = 100
const MAX_MESSAGE_LENGTH = 2000
const MAX_PHONE_LENGTH = 20
const MAX_EMAIL_LENGTH = 254

const isSafeText = (value: string): boolean => {
  const lower = value.toLowerCase()

  if (lower.includes('<') || lower.includes('>')) {
    return false
  }

  if (lower.includes('javascript:')) {
    return false
  }

  return true
}

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: TEXTS.validationFullNameRequired })
    .max(MAX_FULL_NAME_LENGTH, { message: TEXTS.validationFullNameMaxLength })
    .refine(isSafeText, { message: TEXTS.validationFullNameInvalid }),
  phone: z
    .string()
    .min(1, { message: TEXTS.validationPhoneRequired })
    .max(MAX_PHONE_LENGTH, { message: TEXTS.validationPhoneInvalid })
    .refine(
      (value) => /^[0-9+()\-\s]*$/.test(value),
      { message: TEXTS.validationPhoneInvalid }
    ),
  email: z
    .string()
    .min(1, { message: TEXTS.validationEmailRequired })
    .max(MAX_EMAIL_LENGTH, { message: TEXTS.validationEmailInvalid })
    .email({ message: TEXTS.validationEmailInvalid }),
  message: z
    .string()
    .min(1, { message: TEXTS.validationMessageRequired })
    .max(MAX_MESSAGE_LENGTH, { message: TEXTS.validationMessageMaxLength })
    .refine(isSafeText, { message: TEXTS.validationMessageInvalid }),
})

export type ContactSchema = z.infer<typeof contactSchema>

