
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useState } from "react";

/*
function makeNote(val) {
    return <Note
        key={val.key}
        title={val.title}
        content={val.content}
    />;
}
*/

function App() {
    const [notes, setNotes] = useState([]);

    function addNotes(input) {
        setNotes((prevNotes) => {
            console.log(prevNotes);
            return [...prevNotes, input];
        });
    }

    function deleteNote(id) {
        setNotes((prevNotes) => {
            return prevNotes.filter((note, index) => {
                return index != id;
            })
        })
    }

    return <div>
        <Header />
        <CreateArea addItem={addNotes}/>
        <div>
            {notes.map((note, index) =>
            <Note 
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            deleteItem={deleteNote}
            />)}
        </div>
        <Footer />
    </div>;
}

export default App;