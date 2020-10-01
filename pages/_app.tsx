import React from 'react'
import 'sanitize.css'
import '../styles/globals.css'
import { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />

export default App
