import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const TypeBoolean = ({ values, handleResults, inputRef, index, handleFocusIndex, focusIndexList }) => {
    return (
        <div>
            {
                <Row>
                    <Col xs="auto">
                        <input onChange={handleFocusIndex} index={index} ref={el => inputRef.current[index] = el} onInput={handleResults} id={values.id} value={values.value} type="checkbox" checked={(focusIndexList.index === index) && (parseInt(focusIndexList.value) === parseInt(values.value))} />{"  "}
                        <Form.Label>{values.value}</Form.Label>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default TypeBoolean