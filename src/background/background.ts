import { setStoredCities, setStoredOptions } from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
  setStoredOptions({
    homeCity: '',
    tempScale: 'metric'
  })
})
