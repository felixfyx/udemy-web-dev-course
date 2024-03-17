import { useState } from "react";
import PropTypes from "prop-types";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");
  const [isExpanded, setExpanded] = useState(false);

  function handleTitleChange(e) {
    const value = e.target.value;
    setTitleText(value);
  }

  function handleContentChange(e) {
    const value = e.target.value;
    setContentText(value);
  }

  function generateNote() {
    return {
      title: titleText,
      content: contentText,
    };
  }

  function handleClick(e) {
    e.preventDefault();

    // Create and add notes
    const obj = generateNote();
    props.addItem(obj);

    // Clear text
    setTitleText("");
    setContentText("");
  }

  function handleTextClick() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? <input name="title" placeholder="Title" value={titleText} onChange={handleTitleChange}/> : null }
        <textarea name="content" placeholder="Take a note..." rows={isExpanded ? 3 : 1} value={contentText} onChange={handleContentChange} onClick={handleTextClick}/>
        <Zoom in={isExpanded}>
          <Fab onClick={handleClick}><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}
CreateArea.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default CreateArea;
