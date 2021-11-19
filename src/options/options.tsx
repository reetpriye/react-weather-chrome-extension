import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions
} from '../utils/storage'

import 'fontsource-roboto'
import './options.css'

type FormState = 'ready' | 'saving'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [formState, setFormState] = useState<FormState>('ready')

  useEffect(() => {
    getStoredOptions().then(options => setOptions(options))
  }, [])

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity
    })
  }

  const handleSaveButtonClick = () => {
    setFormState('saving')
    setStoredOptions(options).then(() =>
      setTimeout(() => {
        setFormState('ready')
      }, 1000)
    )
  }

  if (!options) {
    return null
  }

  const isFieldsDisabled = formState === 'saving'

  return (
    <Box mx='10%' my='2%'>
      <Card>
        <CardContent>
          <Grid container direction='column' spacing={4}>
            <Grid item>
              <Typography variant='h4'>Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>Home city name</Typography>
              <TextField
                fullWidth
                placeholder='Enter a home city'
                value={options.homeCity}
                onChange={e => handleHomeCityChange(e.target.value)}
                disabled={isFieldsDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSaveButtonClick}
                disabled={isFieldsDisabled}
              >
                {formState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

render(<App />, root)
