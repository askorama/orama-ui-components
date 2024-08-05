import { type FunctionalComponent, h } from '@stencil/core'

interface IconProps {
  name: string
  size?: number
  color?: string
}

export const Icon: FunctionalComponent<IconProps> = ({ name, size = 24, color = 'black' }) => {
  const getIconSvg = (iconName: string) => {
    const icons: { [key: string]: string } = {
      star: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8.1875 0.6875L9.12531 3.22189C9.78366 5.00107 11.1864 6.40384 12.9656 7.06219L15.5 8L12.9656 8.93781C11.1864 9.59616 9.78366 10.9989 9.12531 12.7781L8.1875 15.3125L7.24969 12.7781C6.59134 10.9989 5.18857 9.59616 3.40939 8.93781L0.875 8L3.40939 7.06219C5.18857 6.40384 6.59134 5.00107 7.24969 3.22189L8.1875 0.6875Z" fill="url(#paint0_radial_1183_175)"/>
          <defs>
          <radialGradient id="paint0_radial_1183_175" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.5 -9.5) rotate(141.053) scale(24.2042)">
          <stop stop-color="#6A4BB2"/>
          <stop offset="1"/>
          </radialGradient>
          </defs>
        </svg>`,
    }
    return icons[iconName] || ''
  }

  return (
    <div
      innerHTML={getIconSvg(name)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fill: color,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  )
}
