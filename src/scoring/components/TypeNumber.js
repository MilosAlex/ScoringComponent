import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const TypeNumber = ({ values, handleResults, results, inputRef, index, handleFocusIndex, points }) => {

    const defVal = results && results[values.id] && results[values.id]['value']
    const hasDefVal = !((defVal === undefined) || (defVal === false))

    return (
        <>
            <Row>
                <Col xs="auto">
                    <Form.Control onChange={handleFocusIndex} index={index} ref={el => inputRef.current[index] = el} onInput={handleResults} id={values.id} defaultValue={hasDefVal ? defVal : ""} value={values.value} type="text" />
                </Col>
                <Col xs="auto">
                    <Form.Label>{values.maxValue}</Form.Label>
                </Col>
            </Row>
            <Row>
                <Col xs="auto">
                    <Form.Label style={{ color: "red", margin: "0px" }}>{(points.errors.length !== 0 && points.errors[values.id].hasError) ? points.errors[values.id].msg : ""}</Form.Label>
                </Col>
            </Row>
        </>
    )
}

export default TypeNumber