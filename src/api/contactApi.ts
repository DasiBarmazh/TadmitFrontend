import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ContactFormData, ContactApiResponse } from '../types/contact'

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    submitContact: builder.mutation<ContactApiResponse, ContactFormData>({
      query: (body) => ({
        url: '/api/contact',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSubmitContactMutation } = contactApi
