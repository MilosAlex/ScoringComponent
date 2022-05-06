import { Button } from 'react-bootstrap';

const Buttons = ({ onButtonClick, onSubmit, onCancel, points }) => {
    return (
        <tr id="buttons">
            <td>
                <Button id="previous" onClick={onButtonClick} variant="secondary">Previous task</Button>
            </td>
            <td>
                <Button onClick={() => onSubmit({ "results": [...points.output.submits] })} variant="success" disabled={!(points.errors.every((error) => !error.hasError))} >Submit</Button>{" "}
                <Button onClick={() => onCancel({ "results": [...points.output.cancels] })} variant="warning">Cancel</Button>
            </td>
            <td>
                <Button id="next" onClick={onButtonClick} variant="secondary">Next task</Button>
            </td>
        </tr>

    );
};

export default Buttons;