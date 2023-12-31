
'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">

        <header className='fixed w-full px-5 py-4 bg-neutral-800'>
          <nav className="flex flex-row gap-2 justify-end">
            <Link href="/" className='text-white text-xl hover:underline'>Home</Link>
            <Link href="/todo" className='text-white text-xl hover:underline'>Todos</Link>
            {/* <Link href="/calis">Todos</Link> */}
          </nav>
        </header>

        
          <div className="w-full pt-[60px]">
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </div>  
        

      </body>
      
      
    </html>
  )
}
