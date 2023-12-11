export type IUser = {
  created_at: string
  display_name: string
  email: string
  id: string
  image_url: string
  role: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: boolean
} | null
