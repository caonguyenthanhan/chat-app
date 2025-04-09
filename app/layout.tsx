import type React from "react"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>GPT Chat Demo</title>
        <meta name="description" content="A simple chat application using GPT API" />
      </head>
      <body>{children}</body>
    </html>
  )
}
