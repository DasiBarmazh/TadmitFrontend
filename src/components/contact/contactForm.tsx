import { useState } from 'react'
import { useSubmitContactMutation } from '../../api/contactApi'
import { TEXTS } from '../../constants/texts'
import type { ContactFormData } from '../../types/contact'
import styles from './contactForm.module.css'

const initial: ContactFormData = {
  fullName: '',
  phone: '',
  email: '',
  message: '',
}

export function ContactForm({ dark = false }: { dark?: boolean }) {
  const [form, setForm] = useState<ContactFormData>(initial)
  const [submit, { isLoading, isSuccess, isError, error }] =
    useSubmitContactMutation()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submit(form)
      .unwrap()
      .then(() => setForm(initial))
      .catch(() => {})
  }

  const labelTextClass = dark ? styles.labelTextDark : styles.labelText
  const inputClass = [styles.inputBase, dark ? styles.inputDark : styles.inputLight].join(' ')
  const buttonClass = [styles.button, dark ? styles.buttonDark : styles.buttonLight].join(' ')
  const successClass = dark ? styles.successDark : styles.success
  const errorClass = dark ? styles.errorDark : styles.error

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        <span className={labelTextClass}>{TEXTS.formFullName}</span>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </label>
      <label className={styles.label}>
        <span className={labelTextClass}>{TEXTS.formPhone}</span>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </label>
      <label className={styles.label}>
        <span className={labelTextClass}>{TEXTS.formEmail}</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </label>
      <label className={styles.label}>
        <span className={labelTextClass}>{TEXTS.formMessage}</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className={[inputClass, styles.textarea].join(' ')}
        />
      </label>
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
          {error && 'data' in error
            ? String((error as { data?: { error?: string } }).data?.error)
            : TEXTS.formError}
        </p>
      )}
    </form>
  )
}
