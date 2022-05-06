import React from 'react'

const TypeList = ({ values, inputRef, index, handleFocusIndex, focusIndexList, points }) => {
    return (
        <>
            <input onChange={handleFocusIndex} index={index} ref={el => inputRef.current[index] = el} type="radio" id={values.id} name={values.id} value={values.values.good} checked={(focusIndexList.index === index) && (parseInt(focusIndexList.value) === parseInt(values.values.good))} />{" "}
            <label htmlFor="good">Good</label>{" "}
            <br />{" "}
            <input onChange={handleFocusIndex} index={index} ref={el => inputRef.current[index] = el} type="radio" id={values.id} name={values.id} value={values.values.bad} checked={(focusIndexList.index === index) && (parseInt(focusIndexList.value) === parseInt(values.values.bad))} />{" "}
            <label htmlFor="bad">Bad</label>
            <br />
            <p style={{ color: "red", margin: "0px" }}>{(points.errors.length !== 0 && points.errors[values.id].hasError) ? points.errors[values.id].msg : ""}</p>
        </>
    )
}

export default TypeList