import Buttons from "./Buttons";
import TypeBoolean from "./TypeBoolean";
import TypeList from "./TypeList";
import TypeNumber from "./TypeNumber";

import { useEffect, useRef, useState } from "react";

export function Task({ criteria, onButtonClick, activeTaskInd, handleResults, results, points, onSubmit, onCancel }) {

    // UseStates
    const [focusIndex, setFocusIndex] = useState(null);
    const [focusIndexList, setFocusIndexList] = useState({ "index": null, "value": null });
    const [focusIndexBool, setFocusIndexBool] = useState({ "index": null, "value": null });
    const inputRef = useRef([]);

    // Event handlers
    const handleFocusIndex = (e) => {
        setFocusIndex(parseInt(e.target.getAttribute('index')))
    }

    const handleFocusIndexList = (e) => {
        setFocusIndexList({ "index": parseInt(e.target.getAttribute('index')), "value": e.target.value })
        handleResults(e);
    }

    const handleFocusIndexBool = (e) => {
        if (e.target.checked) setFocusIndexBool({ "index": parseInt(e.target.getAttribute('index')), "value": e.target.value });
        else setFocusIndexBool({ "index": parseInt(e.target.getAttribute('index')), "value": 0 });
        handleResults(e);
    }

    useEffect(() => {
        inputRef.current[focusIndex] && inputRef.current[focusIndex].focus();
    });

    function Type({ values, index }) {
        if (values.type === "list") return <TypeList values={values} inputRef={inputRef} index={index} handleFocusIndex={handleFocusIndexList} focusIndexList={focusIndexList} points={points} />
        else if (values.type === "number") return <TypeNumber values={values} handleResults={handleResults} results={results} inputRef={inputRef} index={index} handleFocusIndex={handleFocusIndex} points={points} />
        else if (values.type === "boolean") return <TypeBoolean values={values} handleResults={handleResults} results={results} inputRef={inputRef} index={index} handleFocusIndex={handleFocusIndexBool} focusIndexList={focusIndexBool} points={points} />
    }

    const AspectsEmpty = () => {
        if (criteria.tasks[activeTaskInd].aspects.length === 0) {
            return (
                <tr>
                    <td></td>
                    <td key="no-aspect">No aspects</td>
                    <td></td>
                </tr>
            )
        }
        else return (
            criteria.tasks[activeTaskInd].aspects.map((aspect, k) => (
                <tr key={aspect.id}>
                    <td className={aspect.name}>{aspect.name}{aspect.required ? "*" : ""}</td>
                    <td style={{ width: "33%" }} className={aspect.name}>{<Type values={aspect} index={k} />}</td>
                    <td className={aspect.name}>{aspect.description}</td>
                </tr>
            ))
        )
    }

    return (
        <>
            {(criteria.tasks.length !== 0) && < AspectsEmpty />}
            {(criteria.tasks.length !== 0) && < Buttons onButtonClick={onButtonClick} onSubmit={onSubmit} onCancel={onCancel} points={points} />}
        </>
    )
}

export default Task;