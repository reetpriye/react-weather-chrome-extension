import React, { useState } from 'react'
import { render } from 'react-dom'
import WeatherCard from './WeatherCard'

import 'fontsource-roboto'

import './popup.css'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([
    'Toronto',
    'New York',
    'Error'
  ])

  return (
    <div>
      {cities.map((city, index) => (
        <WeatherCard city={city} key={index} />
      ))}
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

render(<App />, root)
