import { useState } from 'react'
import { useSubmitContactMutation } from '../../api/contactApi'
import { TEXTS } from '../../constants/texts'
import type { ContactFormData, ContactFieldKey, ContactApiResponse } from '../../types/contact'
import { contactSchema } from '../../schemas/contactSchema'
import styles from './contactForm.module.css'

const initial: ContactFormData = {
  fullName: '',
  phone: '',
  email: '',
  message: '',
}

export type ContactFormRenderField = (
  key: ContactFieldKey,
  input: React.ReactNode,
  error: React.ReactNode
) => React.ReactNode

export interface ContactFormProps {
  dark?: boolean
  renderField?: ContactFormRenderField
}

function defaultRenderField(
  _key: ContactFieldKey,
  input: React.ReactNode,
  error: React.ReactNode,
  labelText: string,
  labelTextClass: string,
  labelClass: string
) {
  return (
    <label className={labelClass}>
      <span className={labelTextClass}>{labelText}</span>
      {input}
      {error}
    </label>
  )
}

export function ContactForm({ dark = false, renderField }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormData>(initial)
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<ContactFieldKey, string>>
  >({})
  const [submit, { isLoading, isSuccess, isError, error }] =
    useSubmitContactMutation()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target

    setForm((prev) => ({ ...prev, [name]: e.target.value }))

    if (fieldErrors[name as ContactFieldKey]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[name as ContactFieldKey]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = contactSchema.safeParse(form)

    if (!result.success) {
      const flat = result.error.flatten().fieldErrors
      const nextErrors: Partial<Record<ContactFieldKey, string>> = {}

      ;(Object.keys(flat) as ContactFieldKey[]).forEach((key) => {
        const messages = flat[key]
        if (messages && messages.length > 0) {
          nextErrors[key] = messages[0]
        }
      })

      setFieldErrors(nextErrors)
      return
    }

    setFieldErrors({})

    submit(form)
      .unwrap()
      .then(() => setForm(initial))
      .catch(() => {})
  }

  const labelTextClass = dark ? styles.labelTextDark : styles.labelText
  const labelClass = styles.label
  const inputClass = [styles.inputBase, dark ? styles.inputDark : styles.inputLight].join(' ')
  const buttonClass = [styles.button, dark ? styles.buttonDark : styles.buttonLight].join(' ')
  const successClass = dark ? styles.successDark : styles.success
  const errorClass = dark ? styles.errorDark : styles.error

  const apiErrors: Partial<Record<ContactFieldKey, string>> =
    error && 'data' in error && (error as { data?: ContactApiResponse }).data
      ? ((error as { data?: ContactApiResponse }).data?.errors ?? {})
      : {}

  const getErrorFor = (key: ContactFieldKey): string | undefined =>
    fieldErrors[key] ?? apiErrors[key]

  const renderRow = (key: ContactFieldKey, labelText: string, input: React.ReactNode) => {
    const err = getErrorFor(key) ? (
      <p className={[styles.fieldError, errorClass].join(' ')}>{getErrorFor(key)}</p>
    ) : null
    if (renderField) {
      return renderField(key, input, err)
    }
    return defaultRenderField(key, input, err, labelText, labelTextClass, labelClass)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {renderRow(
        'fullName',
        TEXTS.formFullName,
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          className={inputClass}
        />
      )}
      {renderRow(
        'phone',
        TEXTS.formPhone,
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className={inputClass}
        />
      )}
      {renderRow(
        'email',
        TEXTS.formEmail,
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className={inputClass}
        />
      )}
      {renderRow(
        'message',
        TEXTS.formMessage,
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className={[inputClass, styles.textarea].join(' ')}
        />
      )}
      <button type="submit" disabled={isLoading} className={buttonClass}>
        {isLoading ? TEXTS.formSubmitting : TEXTS.formSubmit}
      </button>
      {isSuccess && (
        <p className={[styles.message, successClass].join(' ')}>
          {TEXTS.formSuccess}
        </p>
      )}
      {isError && (
        <p className={[styles.message, errorClass].join(' ')}>
          {TEXTS.formError}
        </p>
      )}
    </form>
  )
}
