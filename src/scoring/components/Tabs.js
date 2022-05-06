import { Badge } from "react-bootstrap";

export function Tabs({ criteria, onTabClick, activeTaskInd, points }) {
    return (
        <tr>
            {
                (criteria.tasks.length === 0) ? (<td>No tasks</td>) : (
                    criteria.tasks.map((task, k) => (
                        <td key={task.name} ind={k} onClick={onTabClick} className={`task.name ${activeTaskInd === k ? "active" : ""}`} style={activeTaskInd === k ? { fontWeight: "bold" } : {}}>
                            {task.name}{" "}
                            <Badge bg="success">{points.taskScores[k] && points.taskScores[k].correct !== 0 && points.taskScores[k].correct}</Badge>{" "}
                            <Badge bg="danger">{points.taskScores[k] && points.taskScores[k].wrong !== 0 && points.taskScores[k].wrong}</Badge>{" "}
                            <Badge bg="secondary">/ {points.taskScores[k] && points.taskScores[k].all !== 0 && points.taskScores[k].all}</Badge>
                        </td>
                    ))
                )
            }
        </tr>
    );
};

export default Tabs
