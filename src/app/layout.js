import './globals.css'
import '../styles/styles.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quizz World',
  description: 'Teste seus conhecimentos, desafie seus amigos e descubra o quão esperto você realmente é. Junte-se a nós agora e embarque em uma jornada de aprendizado e entretenimento, onde a diversão nunca termina!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
