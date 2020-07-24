export type PaddleEvent =
  | PaddleSubscriptionCreatedEvent
  | PaddleSubscriptionUpdatedEvent
  | PaddleSubscriptionCancelledEvent
  | PaddleSubscriptionPaymentSucceededEvent
  | PaddleSubscriptionPaymentFailedEvent
  | PaddleSubscriptionPaymentRefundedEvent

export interface PaddleSubscriptionCreatedEvent {
  alert_id: string
  alert_name: 'subscription_created'
  cancel_url: string
  checkout_id: string
  currency: string
  email: string
  event_time: string
  linked_subscriptions: string
  marketing_consent: string
  next_bill_date: string
  passthrough: string
  quantity: string
  source: string
  status: string
  subscription_id: string
  subscription_plan_id: string
  unit_price: string
  update_url: string
  user_id: string
  p_signature: string
}

export interface PaddleSubscriptionUpdatedEvent {
  alert_id: string
  alert_name: 'subscription_updated'
  cancel_url: string
  checkout_id: string
  currency: string
  email: string
  event_time: string
  linked_subscriptions: string
  marketing_consent: string
  new_price: string
  new_quantity: string
  new_unit_price: string
  next_bill_date: string
  old_next_bill_date: string
  old_price: string
  old_quantity: string
  old_status: string
  old_subscription_plan_id: string
  old_unit_price: string
  passthrough: string
  status: string
  subscription_id: string
  subscription_plan_id: string
  update_url: string
  user_id: string
  p_signature: string
}

export interface PaddleSubscriptionCancelledEvent {
  alert_id: string
  alert_name: 'subscription_cancelled'
  cancellation_effective_date: string
  checkout_id: string
  currency: string
  email: string
  event_time: string
  linked_subscriptions: string
  marketing_consent: string
  passthrough: string
  quantity: string
  status: string
  subscription_id: string
  subscription_plan_id: string
  unit_price: string
  user_id: string
  p_signature: string
}

export interface PaddleSubscriptionPaymentSucceededEvent {
  alert_id: string
  alert_name: 'subscription_payment_succeeded'
  balance_currency: string
  balance_earnings: string
  balance_fee: string
  balance_gross: string
  balance_tax: string
  checkout_id: string
  country: string
  coupon: string
  currency: string
  customer_name: string
  earnings: string
  email: string
  event_time: string
  fee: string
  initial_payment: string
  instalments: string
  marketing_consent: string
  next_bill_date: string
  next_payment_amount: string
  order_id: string
  passthrough: string
  payment_method: string
  payment_tax: string
  plan_name: string
  quantity: string
  receipt_url: string
  sale_gross: string
  status: string
  subscription_id: string
  subscription_payment_id: string
  subscription_plan_id: string
  unit_price: string
  user_id: string
  p_signature: string
}

export interface PaddleSubscriptionPaymentFailedEvent {
  alert_id: string
  alert_name: 'subscription_payment_failed'
  amount: string
  attempt_number: string
  cancel_url: string
  checkout_id: string
  currency: string
  email: string
  event_time: string
  instalments: string
  marketing_consent: string
  next_retry_date: string
  order_id: string
  passthrough: string
  quantity: string
  status: string
  subscription_id: string
  subscription_payment_id: string
  subscription_plan_id: string
  unit_price: string
  update_url: string
  user_id: string
  p_signature: string
}

export interface PaddleSubscriptionPaymentRefundedEvent {
  alert_id: string
  alert_name: 'subscription_payment_refunded'
  amount: string
  balance_currency: string
  balance_earnings_decrease: string
  balance_fee_refund: string
  balance_gross_refund: string
  balance_tax_refund: string
  checkout_id: string
  currency: string
  earnings_decrease: string
  email: string
  event_time: string
  fee_refund: string
  gross_refund: string
  initial_payment: string
  instalments: string
  marketing_consent: string
  order_id: string
  passthrough: string
  quantity: string
  refund_reason: string
  refund_type: string
  status: string
  subscription_id: string
  subscription_payment_id: string
  subscription_plan_id: string
  tax_refund: string
  unit_price: string
  user_id: string
  p_signature: string
}
