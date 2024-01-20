// import { Inter } from 'next/font/google';
import './globals.css';
import { getServerSession } from "next-auth";
import SessionProvider from "@/app/util/SessionProvider";
import NavBar from '@/components/NavBar';
import ReactToast from '@/components/React-Toast';

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Damn App',
  description: 'Created By An Expert Web Dev Samuel',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  // className={inter.className}
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <NavBar/>
          {children}
          <ReactToast/>
        </SessionProvider>
      </body>
    </html>
  )
}
