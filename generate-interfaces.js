const fetch = require('node-fetch')
const fs = require('fs')

const DOCUMENTATION_URLS = [
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-created',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-updated',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-cancelled',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-succeeded',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-failed',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-refunded',

  'https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-succeeded',
  'https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-refunded',
  'https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/order-processing-completed',

  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/payment-dispute-created',
  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/payment-dispute-closed',
  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/high-risk-transaction-created',
  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/high-risk-transaction-updated',

  'https://developer.paddle.com/webhook-reference/payout-alerts/transfer-created',
  'https://developer.paddle.com/webhook-reference/payout-alerts/transfer-paid',

  'https://developer.paddle.com/webhook-reference/audience-alerts/new-audience-member',
  'https://developer.paddle.com/webhook-reference/audience-alerts/update-audience-member',

  'https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-paid',
  'https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-sent',
  'https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-overdue',
]

run()

async function run() {
  let interfaces = []

  for (let url of DOCUMENTATION_URLS) {
    interfaces.push(await buildWebhookInterface(url))
    console.log(`Built interface from ${url}`)
  }

  const unionType = interfaces.map((x) => x.interfaceName).join(' | ')

  const code = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

/** An event fired by Paddle through a configured webhook */
export type PaddleEvent = ${unionType}

${interfaces.map((x) => x.interfaceCode).join('\n\n')}`

  fs.writeFileSync(__dirname + '/src/interfaces.ts', code, 'utf-8')
  console.log('Written into interfaces.ts. Run `yarn format` next.')
}

async function buildWebhookInterface(url) {
  const routeInfo = await getRouteInfo(url)

  const description = getWebhookDescription(routeInfo)
  const jsonSchema = getWebhookJsonSchema(routeInfo)

  const properties = Object.entries(jsonSchema.properties).map(([propertyName, propertySchema]) => {
    const type = inferTypeFromPropertySchema(propertySchema)

    const comment = propertySchema.description ? `/** ${propertySchema.description} */\n  ` : ''
    return `  ${comment}${propertyName}: ${type}`
  })

  const interfaceName = `Paddle${toPascalCase(jsonSchema.properties.alert_name.default)}Event`
  const interfaceCode = `/** ${description} */
export interface ${interfaceName} {
${properties.join('\n')}
}`

  return { interfaceName, interfaceCode }
}

async function getRouteInfo(url) {
  const response = await fetch(url)
  const text = await response.text()

  const line = text.split('\n').find((x) => x.trim().startsWith('window.__routeInfo ='))
  const jsonString = line.replace(/^.*window\.__routeInfo = /, '').replace(/;.*$/, '')
  return JSON.parse(jsonString)
}

function getWebhookDescription(routeInfo) {
  return routeInfo.allProps.page.data.blocks
    .find((x) => x.type === 'text')
    .data.split('\n')
    .find((x) => x.startsWith('####'))
    .replace('#### ', '')
}

function getWebhookJsonSchema(routeInfo) {
  return routeInfo.allProps.page.data.blocks.find((x) => x.type === 'jsonSchema').data
}

function toPascalCase(string) {
  const camelCase = string.replace(/_(\w)/g, ($, $1) => $1.toUpperCase())
  return `${camelCase.charAt(0).toUpperCase()}${camelCase.substr(1)}`
}

function inferTypeFromPropertySchema(propertySchema) {
  if (propertySchema.default) {
    return `"${propertySchema.default}"`
  }

  if (propertySchema.enum) {
    return propertySchema.enum.map((x) => `"${x}"`).join(' | ')
  }

  return 'string'
}
