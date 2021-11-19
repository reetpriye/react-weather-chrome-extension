import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography
} from '@material-ui/core'
import { fetchOpenWeatherData } from '../../utils/api'
import { OpenWeatherData } from '../../utils/api'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          <Button color='secondary' onClick={onDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{
  city: string
  onDelete?: () => void
}> = ({ city, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>('loading')

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then(data => {
        setWeatherData(data)
        setCardState('ready')
      })
      .catch(() => setCardState('error'))
  }, [city])

  if (cardState == 'loading' || cardState == 'error') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant='body1'>
          {cardState === 'loading'
            ? 'Loading...'
            : 'Error: Could not retrieve data for this city'}
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant='h5'>{weatherData.name}</Typography>
      <Typography variant='body1'>
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant='body1'>
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
