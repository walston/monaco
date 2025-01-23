import Monaco from "./Monaco";
import "./App.css";
import { useState } from "react";
import * as monaco from "monaco-editor";

const options = { readonly: true } as monaco.editor.IEditorOptions;
function App() {
  const [lock, setLock] = useState(false);
  const [text, setText] = useState("hello");

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Monaco Editor</h1>
        </header>
        <div
          style={{ display: "flex", alignItems: "stretch", margin: "0.5em 0" }}
        >
          <input
            id="lock"
            type="checkbox"
            checked={lock}
            onChange={(e) => setLock(e.target.checked)}
          />
          <label
            htmlFor="lock"
            style={{ flexGrow: "1", textAlign: "left", padding: "5px" }}
          >
            Read only
          </label>

          <button onClick={() => setText("hello\nreset")}>Reset</button>
        </div>
        {lock ? (
          <textarea
            style={{ height: "500px", width: "800px" }}
            readOnly
            value={text}
          />
        ) : (
          <Monaco
            style={{ height: "500px", width: "800px" }}
            options={options}
            value={text}
            onChange={(update) => setText(update)}
          />
        )}
      </div>
    </>
  );
}

export default App;
