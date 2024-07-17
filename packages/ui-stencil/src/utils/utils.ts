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
