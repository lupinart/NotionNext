import BLOG from '@/blog.config'

const EMAIL_OCTOPUS_ENDPOINT = 'https://emailoctopus.com/api/1.6'
const MAILCHIMP_ENDPOINT = 'https://us18.api.mailchimp.com/3.0'

function hasEmailOctopusConfig() {
  return BLOG.EMAIL_OCTOPUS_API_KEY && BLOG.EMAIL_OCTOPUS_LIST_ID
}

function hasMailchimpConfig() {
  return BLOG.MAILCHIMP_API_KEY && BLOG.MAILCHIMP_LIST_ID
}

function buildEmailOctopusPayload({ email, first_name, last_name }) {
  const fields = {}

  if (first_name) {
    fields.FirstName = first_name
  }

  if (last_name) {
    fields.LastName = last_name
  }

  const payload = {
    api_key: BLOG.EMAIL_OCTOPUS_API_KEY,
    email_address: email,
    status: 'SUBSCRIBED'
  }

  if (Object.keys(fields).length) {
    payload.fields = fields
  }

  return payload
}

function buildMailchimpPayload({ email, first_name, last_name }) {
  return {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: first_name || '',
      LNAME: last_name || ''
    }
  }
}

function requestEmailOctopus(payload) {
  const listId = BLOG.EMAIL_OCTOPUS_LIST_ID

  return fetch(`${EMAIL_OCTOPUS_ENDPOINT}/lists/${listId}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

function requestMailchimp(payload) {
  const listId = BLOG.MAILCHIMP_LIST_ID
  const apiKey = BLOG.MAILCHIMP_API_KEY

  return fetch(`${MAILCHIMP_ENDPOINT}/lists/${listId}/members`, {
    method: 'POST',
    headers: {
      Authorization: `apikey ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export default function subscribeToNewsletterApi({
  email,
  first_name = '',
  last_name = ''
}) {
  if (!email) {
    return Promise.reject(new Error('Email is required'))
  }

  if (hasEmailOctopusConfig()) {
    const payload = buildEmailOctopusPayload({ email, first_name, last_name })
    return requestEmailOctopus(payload)
  }

  if (hasMailchimpConfig()) {
    const payload = buildMailchimpPayload({ email, first_name, last_name })
    return requestMailchimp(payload)
  }

  return Promise.reject(new Error('No email subscription service configured'))
}

export async function subscribeToNewsletter(email, firstName, lastName) {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, firstName, lastName })
  })

  return response.json()
}
