import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from "recoil"
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout'

function MyApp({ Component, pageProps: {session,...pageProps} }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </RecoilRoot>
  ) 
}

export default MyApp
