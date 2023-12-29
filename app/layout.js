import './globals.css'

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/assets/images/logo.svg" />
      </head>

      <body>
        {children}
      </body>
    </html>
  )
}
