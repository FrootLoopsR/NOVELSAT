import React from 'react'
import styled from 'styled-components'
import { type ISatellite } from '../Interfaces'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../Store'

interface SatelliteCardProps {
  satellite: ISatellite
}

const SatelliteCard = ({ satellite }: SatelliteCardProps): JSX.Element => {
  const dispatch = useDispatch()
  const { updateSatellite } = bindActionCreators(actionCreators, dispatch)
  const btn = !satellite.status ? 'Activate' : 'Deactivate'

  const toggleActivationHandler = (): void => {
    updateSatellite(satellite.id)
  }

  return (
        <Card>
            <CardBody>
                <CardTitle>{satellite.name}</CardTitle>
                <PropertyList>
                    <PropertyListItem>ID: {satellite.id}</PropertyListItem>
                    <PropertyListItem>Latitude: {satellite.position.latitude}</PropertyListItem>
                    <PropertyListItem>Longitude: {satellite.position.longitude}</PropertyListItem>
                    <PropertyListItem>Temperature: {satellite.temperature}</PropertyListItem>
                    <PropertyListItem>Status: {satellite.status ? 'Active' : 'Inactive'}</PropertyListItem>
                </PropertyList>
                <Button onClick={toggleActivationHandler}>{btn}</Button>
            </CardBody>
        </Card>
  )
}

export default SatelliteCard

const Card = styled.div`
  margin-bottom: 20px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.8);
  transition: 0.3s;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid black;
  max-width: 500px;
`

const CardBody = styled.div`
  padding: 20px;
  text-align: center;
`

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`

const PropertyList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const PropertyListItem = styled.li`
  margin-bottom: 10px;
  text-align: left;
`

const Button = styled.button`
  color: black;
  background-color: transparent;
  border: 1px solid darkblue;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: gray;
    font-weight: bold;
  }
`
