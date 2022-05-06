import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table } from 'react-bootstrap';

import { useEffect, useState } from "react";

import Tabs from "./components/Tabs";
import Task from "./components/Task";
import Progress from './components/Progress';
import ErrorList from './components/ErrorList';


export function ScoringComponent({ criteria, onSubmit, onCancel }) {
  //console.log(criteria);

  // UseStates
  const [results, setResults] = useState({});
  const [activeTaskInd, setActiveTask] = useState(1);
  const [points, setPoints] = useState({ "all": 0, "required": 0, "collectedAll": 0, "collectedRequired": 0, "errors": [], "taskScores": {}, "output": [] });


  // Event handlers
  const onTabClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTask(parseInt(e.target.getAttribute('ind')))
  }

  const handleResults = (e) => {
    let newResults;

    if (e.target.type === "checkbox" && !e.target.checked) newResults = { ...results, [e.target.id]: { "id": e.target.id, "value": 0 } }
    else newResults = { ...results, [parseInt(e.target.id)]: { "id": parseInt(e.target.id), "value": e.target.value } }

    setResults(newResults);
    handlePoints(newResults);
  }

  const onButtonClick = (e) => {
    const taskCount = criteria.tasks.length;
    e.preventDefault();
    if (e.target.id === "previous" && activeTaskInd > 0) setActiveTask(activeTaskInd - 1);
    else if (e.target.id === "next" && activeTaskInd < (taskCount - 1)) setActiveTask(activeTaskInd + 1);
  }

  const handlePoints = (newResults) => {
    let allPoints = 0;
    let requiredPoints = 0;
    let collectedAllPoints = 0;
    let collectedRequiredPoints = 0;
    let errors = [];
    let taskScores = [];
    let output = { "submits": [], "cancels": [] };
    let submit, cancel;

    for (const taskInd in criteria.tasks) {

      taskScores[taskInd] = { "all": 0, "correct": 0, "wrong": 0 }

      for (const aspectId in criteria.tasks[taskInd].aspects) {

        const aspect = criteria.tasks[taskInd].aspects[aspectId];
        submit = { "id": aspect.id, "value": 0 };
        cancel = { "id": aspect.id, "value": 0 };

        if (aspect.required) errors[aspect.id] = { "hasError": true, "msg": "Point is mandatory!", "taskIndex": taskInd };
        else errors[aspect.id] = { "hasError": false };

        if (newResults.hasOwnProperty(aspect.id) && isNaN(newResults[aspect.id].value)) {
          errors[aspect.id] = { "hasError": true, "msg": "Point must be a number!", "taskIndex": taskInd };
        }

        if (newResults.hasOwnProperty(aspect.id) && !isNaN(newResults[aspect.id].value) && (newResults[aspect.id].value !== "")) {

          errors[aspect.id] = { "hasError": false };

          if (aspect.type === "number") {
            if (parseInt(newResults[aspect.id].value) < 0) errors[aspect.id] = { "hasError": true, "msg": "Point must be at least 0!", "taskIndex": taskInd };
            else if (parseInt(newResults[aspect.id].value) > parseInt(aspect.maxValue)) errors[aspect.id] = { "hasError": true, "msg": "Point must be maximum " + aspect.maxValue + "!", "taskIndex": taskInd };
          }

          if (!errors[aspect.id].hasError) {
            collectedAllPoints += parseInt(newResults[aspect.id].value);
            submit.value = parseInt(newResults[aspect.id].value);
            cancel.value = parseInt(newResults[aspect.id].value);
            output.cancels.push(cancel);
            if (aspect.required) collectedRequiredPoints += parseInt(newResults[aspect.id].value);
          }

        }

        output.submits.push(submit);

        if (aspect.type === "list") {
          allPoints += aspect.values.good
          if (aspect.required) requiredPoints += aspect.values.good
        }
        else if (aspect.type === "number") {
          allPoints += aspect.maxValue
          if (aspect.required) requiredPoints += aspect.maxValue
        }
        else if (aspect.type === "boolean") {
          allPoints += aspect.value
          if (aspect.required) requiredPoints += aspect.value
        }

        taskScores[taskInd].all++;

        if (errors[aspect.id].hasError) taskScores[taskInd].wrong++;
        else taskScores[taskInd].correct++;
      }

    }
    //console.log(JSON.stringify({"results": [...points.output.submits]}, null, 2))
    //console.log(JSON.stringify({"results": [...points.output.cancels]}, null, 2))
    setPoints({ "all": allPoints, "required": requiredPoints, "collectedAll": collectedAllPoints, "collectedRequired": collectedRequiredPoints, "errors": errors, "taskScores": taskScores, "output": output })
  }

  useEffect(() => { handlePoints({}) }, [])

  return (
    <Container>
      <h1>{criteria.name}</h1>
      <span>{points.collectedAll}/{points.required}</span>
      <Progress points={points} />
      <Table striped bordered hover variant="dark" style={{ textAlign: "center", margin: "0px" }}>
        <tbody>
          <Tabs criteria={criteria} onTabClick={onTabClick} activeTaskInd={activeTaskInd} points={points} />
        </tbody>
      </Table>
      <Table striped bordered hover variant="dark" style={{ textAlign: "center" }}>
        <tbody>
          <Task criteria={criteria} onButtonClick={onButtonClick} activeTaskInd={activeTaskInd} handleResults={handleResults} results={results} points={points} onSubmit={onSubmit} onCancel={onCancel} />
        </tbody>
      </Table>
      <ErrorList criteria={criteria} onClick={onTabClick} errors={points.errors} />
    </Container>
  );
}