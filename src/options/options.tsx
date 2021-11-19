import * as React from 'react'
import { render } from 'react-dom'

import './options.css'

const App: React.FC<{}> = () => {
  return (
    <div>
      <img src='icon.png' alt='icon' />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

render(<App />, root)
