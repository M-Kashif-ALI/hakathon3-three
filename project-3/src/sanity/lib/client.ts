import { createClient } from 'next-sanity'

import { apiVersion, token } from '../env'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion,
  useCdn: true,
  token,
})
