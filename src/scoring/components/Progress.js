import React from 'react'
import { ProgressBar } from 'react-bootstrap';

const Progress = ({ points }) => {
  return (
    <ProgressBar now={points.required !== 0 ? (points.collectedRequired * 100 / points.required) : 0} label={`${points.required !== 0 ? (points.collectedRequired * 100 / points.required) : 0}%`} variant="info" />
  )
}

export default Progress