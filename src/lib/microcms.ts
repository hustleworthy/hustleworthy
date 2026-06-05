import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || 'missing-service-domain'
const apiKey = process.env.MICROCMS_API_KEY || 'missing-api-key'

export const isMicroCmsConfigured =
  Boolean(process.env.MICROCMS_SERVICE_DOMAIN) && Boolean(process.env.MICROCMS_API_KEY)

export const client = createClient({
  serviceDomain,
  apiKey,
});
