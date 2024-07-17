import { CloudIndexConfig } from '@/types'
import { OramaClient } from '@oramacloud/client'

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
}

export function copyToClipboard(text) {
  // Check if the Clipboard API is supported
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error('Could not copy text: ', err)
    })
  } else {
    // Fallback for browsers that do not support the Clipboard API
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}

export function getNonExplicitAttributes(element: HTMLElement, explicitProps: string[]): { [key: string]: string } {
  const allAttributes = Array.from(element.attributes)
  return allAttributes.reduce((acc, attr) => {
    if (!explicitProps.includes(attr.name)) {
      acc[attr.name] = attr.value
    }
    return acc
  }, {})
}

export function validateCloudIndexConfig(config: CloudIndexConfig): void {
  if (!config || !config.api_key || !config.endpoint) {
    throw new Error('Invalid cloud index configuration. Please provide a valid api_key and endpoint')
  }
}

export function initOramaClient(config: CloudIndexConfig): OramaClient | null {
  validateCloudIndexConfig(config)
  return new OramaClient({
    api_key: config.api_key,
    endpoint: config.endpoint,
  })
}
