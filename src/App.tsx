import Monaco from "./Monaco";
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
        <Monaco style={{ height: "500px", width: "800px" }} options={options} />
      </div>
    </>
  );
}

export default App;
