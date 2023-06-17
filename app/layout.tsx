import ActiveStatus from './components/ActiveStatus'
import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'
// import AuthContext from './context/AuthContext'
// import ToasterContext from './context/ToasterContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Harjot's Messenger Clone",
  description: 'Messenger Clone',
}
// this controls tab name
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       
      <AuthContext>
          <ToasterContext/>
          {/* this will do stuff with our toast */}
          <ActiveStatus/>
          
            {children}
      </AuthContext>
        </body>
    </html>
  )
}
