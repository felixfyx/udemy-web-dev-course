import { useState } from "react";
import PropTypes from "prop-types";

function CreateArea(props) {
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");

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

  return (
    <div>
      <form>
        <input name="title" placeholder="Title" value={titleText} onChange={handleTitleChange} />
        <textarea name="content" placeholder="Take a note..." rows="3" value={contentText} onChange={handleContentChange} />
        <button onClick={handleClick}>Add</button>
      </form>
    </div>
  );
}
CreateArea.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default CreateArea;
