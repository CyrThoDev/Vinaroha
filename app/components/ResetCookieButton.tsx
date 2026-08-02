'use client'

export function ResetCookieButton() {
  const reset = () => {
    localStorage.removeItem('cookie-consent')
    window.location.reload()
  }

  return (
    <button
      onClick={reset}
      className="text-orange underline underline-offset-2 hover:opacity-70 transition-opacity"
    >
      Réinitialiser mon choix
    </button>
  )
}
