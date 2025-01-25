import "./App.css";
import Logs from "./Logs";

function App() {
  return (
    <div className="App" style={{ height: "100vh", width: "1200px" }}>
      <header className="App-header">
        <h1>Monaco Editor</h1>
      </header>

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "auto 24em",
          gridTemplateAreas: `"filler logs"`,
        }}
      >
        <div style={{ gridArea: "filler" }}></div>
        <Logs />
      </div>
    </div>
  );
}

export default App;
