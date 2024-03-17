import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
    return <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={() => props.deleteItem(props.id)}><DeleteIcon /></button>
    </div>;
}
Note.propTypes = {
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    deleteItem: PropTypes.func.isRequired,
};

export default Note;