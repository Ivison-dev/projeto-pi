import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider} from '@mui/material'
import tema from '../src/themes/theme'


export default function App({ Component, pageProps }: AppProps) {
  return( 
    <ThemeProvider theme={tema}>
      <Component {...pageProps} />
    </ThemeProvider>
    )
}
