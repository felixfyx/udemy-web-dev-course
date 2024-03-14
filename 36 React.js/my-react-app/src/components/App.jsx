import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import notes from "../notes";

function makeNote(val) {
    return <Note
        key={val.key}
        title={val.title}
        content={val.content}
    />;
}

function App() {
    return <div>
        <Header />
        {notes.map(makeNote)}
        <Footer />
    </div>;
}

export default App;