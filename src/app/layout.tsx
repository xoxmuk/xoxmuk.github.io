import { Footer } from "@/widgets/Footer"
import { Header } from "@/widgets/Header"

export const metadata = {
  title: 'xoxmuk',
  description: 'by xoxmuk',
}

export default function RootLayout({ children }: { children: React.ReactNode }) { return (
    <html lang="ru">
      <body>
        <Header/>
        <main>{children}</main>
      </body>
      <Footer/>
    </html>
  )
}