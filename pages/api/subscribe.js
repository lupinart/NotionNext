import subscribeToNewsletterApi from '@/lib/plugins/newsletter'

/**
 * 接受邮件订阅
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, firstName, lastName } = req.body
    try {
      const response = await subscribeToNewsletterApi({ email, first_name: firstName, last_name: lastName })
      const data = await response.json()

      if (!response.ok) {
        console.error('newsletter subscription error', data)
        res
          .status(response.status)
          .json({ status: 'error', message: data?.error?.message || 'Subscription failed!', error: data })
        return
      }

      res.status(200).json({ status: 'success', message: 'Subscription successful!' })
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Subscription failed!', error })
    }
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' })
  }
}
