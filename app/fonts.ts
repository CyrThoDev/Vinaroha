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
  src: '../public/fonts/Lovelo_Black.otf',
  variable: '--nf-lovelo',
})

export const avallon = localFont({
  src: '../public/fonts/Avallon.ttf',
  variable: '--nf-avallon',
})

export const fontjek = localFont({
  src: '../public/fonts/Fontjek.ttf',
  variable: '--nf-fontjek',
})
