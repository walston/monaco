import Editor from "./Editor";
import "./App.css";
import { useMemo } from "react";
import * as monaco from "monaco-editor";

function App() {
  const options = useMemo(
    () =>
      ({
        readonly: true,
      } as monaco.editor.IEditorOptions),
    []
  );

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Monaco Editor</h1>
        </header>
        <Editor style={{ height: "500px", width: "950px" }} options={options} />
      </div>
    </>
  );
}

export default App;
