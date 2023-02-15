import React from 'react'
import styled from 'styled-components'
import { type ISatellite } from '../Interfaces'

interface SatelliteCardProps {
  satellite: ISatellite
}

const Card = styled.div`
  margin-bottom: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  background-color: #fff;
`

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`

const CardBody = styled.div`
  padding: 20px;
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
`

const SatelliteCard = ({ satellite }: SatelliteCardProps): JSX.Element => {
  return (
        <Card>
            <CardImage src={satellite.name} alt={satellite.name}/>
            <CardBody>
                <CardTitle>{satellite.name}</CardTitle>
                <PropertyList>
                    <PropertyListItem>Latitude: {satellite.position.latitude}</PropertyListItem>
                    <PropertyListItem>Longitude: {satellite.position.longitude}</PropertyListItem>
                    <PropertyListItem>Temperature: {satellite.temperature}</PropertyListItem>
                    <PropertyListItem>Status: {satellite.status}</PropertyListItem>
                </PropertyList>
            </CardBody>
        </Card>)
}

export default SatelliteCard
