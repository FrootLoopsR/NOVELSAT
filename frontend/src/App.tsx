import React from 'react'
import SatelliteCardList from './Components/SatelliteCardList'
import { Provider } from 'react-redux'
import { satelliteStore } from './Store'

const App = (): JSX.Element => {
  return (
        <Provider store={satelliteStore}>
            <SatelliteCardList/>
        </Provider>
  )
}

export default App
