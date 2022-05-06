import { Toast } from 'react-bootstrap'
import React from 'react'

const ErrorList = ({ criteria, errors, onClick }) => {
    return (
        errors.filter(elem => elem.hasError).map((error, k) => (
            <Toast onClick={onClick} ind={error.taskIndex} bg="dark" key={k}>
                <Toast.Header closeButton={false} ind={error.taskIndex}>
                    <strong className="me-auto" ind={error.taskIndex}>{criteria.tasks[error.taskIndex].name}</strong>
                    <small ind={error.taskIndex}>Error message</small>
                </Toast.Header>
                <Toast.Body className="text-white" ind={error.taskIndex}>
                    {error.msg}
                </Toast.Body>
            </Toast>
        ))
    )
}

export default ErrorList