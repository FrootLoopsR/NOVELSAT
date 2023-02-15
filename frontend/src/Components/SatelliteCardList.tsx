import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SatelliteCard from './SatelliteCard'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../Store'
import { type RootState } from '../Store/Reducers'
import styled from 'styled-components'

const SatelliteCardList = (): JSX.Element => {
  const dispatch = useDispatch()
  const satelliteList = useSelector((state: RootState) => state.satellite)
  const { getSatelliteList } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    getSatelliteList()
  }, [dispatch])

  return (
        <SatelliteCardListContainer>
            {satelliteList?.satelliteList.map((satellite) => (
                <SatelliteCardWrapper key={satellite.id}>
                    <SatelliteCard satellite={satellite}/>
                </SatelliteCardWrapper>
            ))}
        </SatelliteCardListContainer>
  )
}

export default SatelliteCardList

const SatelliteCardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const SatelliteCardWrapper = styled.div`
  flex-basis: calc(33.33% - 10px);
  margin-bottom: 20px;
`
