import { Work_Sans, League_Gothic, Urbanist } from 'next/font/google'
import localFont from 'next/font/local'

export const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--nf-body',
  display: 'swap',
})

export const leagueGothic = League_Gothic({
  subsets: ['latin'],
  variable: '--nf-accent',
  display: 'swap',
})

export const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--nf-urbanist',
  display: 'swap',
})

export const lovelo = localFont({
  src: '../public/fonts/Lovelo_Line_Bold.otf',
  variable: '--nf-lovelo',
  display: 'swap',
})

export const avallon = localFont({
  src: '../public/fonts/Avallon.ttf',
  variable: '--nf-avallon',
  display: 'swap',
})

export const fontjek = localFont({
  src: '../public/fonts/Fontjek.ttf',
  variable: '--nf-fontjek',
  display: 'swap',
})
