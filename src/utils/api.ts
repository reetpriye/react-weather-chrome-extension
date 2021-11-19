const OPEN_WEATHER_API_KEY = '293bfb033c757efb30a76a0a51d1d720' // Don't spam

export interface OpenWeatherData {
  name: string
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
  wind: {
    speed: number
    degree: number
  }
}

export type OpenWeatherTempScale = 'metric' | 'imperial'

export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=${tempScale}`
  )

  if (!res.ok) {
    throw new Error('City not found')
  }

  const data: OpenWeatherData = await res.json()
  return data
}
