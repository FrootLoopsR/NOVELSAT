import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type IState } from '../Store/Reducers'
import { getSatelliteList } from '../Store/Action-Creators'
import { Actions } from '../Store/Action-Types'
import SatelliteCard from './SatelliteCard'

const SatelliteCardList = (): JSX.Element => {
  const dispatch = useDispatch()
  const satelliteList = useSelector((state: IState) => state.satelliteList)

  useEffect(() => {
    const fetchSatelliteListData = (): void => {
      const data = getSatelliteList()
      dispatch({ type: Actions.GET_LIST, payload: data })
    }
    fetchSatelliteListData()
  }, [dispatch])

  return (
        <div className="container">
            <div className="row">
                {satelliteList.map((satellite) => (
                    <div className="col-sm-4" key={satellite.id}>
                        <SatelliteCard satellite={satellite}/>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default SatelliteCardList
