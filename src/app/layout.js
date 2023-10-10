import './globals.css'
import '../styles/styles.scss'
import { Inter } from 'next/font/google'
import NextAuthSessionProvider from '@/providers/sessionProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quizzlies',
  description: 'Teste seus conhecimentos, desafie seus amigos e descubra o quão esperto você realmente é. Junte-se a nós agora e embarque em uma jornada de aprendizado e entretenimento, onde a diversão nunca termina!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
        
      </body>
    </html>
  )
}
