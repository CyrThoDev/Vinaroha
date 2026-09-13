export type GoogleReviews = {
  note: number
  avisCount: number
  url: string
  avis: Array<{ citation: string; auteur: string }>
}

export async function getGoogleReviews(placeId: string): Promise<GoogleReviews | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey || !placeId) return null

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews,url&language=fr&key=${apiKey}`
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } })
    const data = await res.json()

    if (data.status !== 'OK' || !data.result) return null

    return {
      note: data.result.rating,
      avisCount: data.result.user_ratings_total,
      url: data.result.url,
      avis: (data.result.reviews ?? [])
        .map((r: { text: string; author_name: string }) => ({ citation: r.text, auteur: r.author_name })),
    }
  } catch {
    return null
  }
}
