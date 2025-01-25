import { useEffect, useState } from "react";
import Monaco from "./Monaco";

const LOGS = `\
*** Starting process ***
yarn install v1.22.21
[1/5] Validating package.json...
[2/5] Resolving packages...
success Already up-to-date.
$ yarn run prebuild
yarn run v1.22.21
$ yarn run build:licenses
$ node node/crawlLicenses.js
include dir /Users/work/Repos/console
scanning /Users/work/Repos/console
file written /Users/work/Repos/console/src/resources/licenses.json
Number of entries found: 61
Done in 2.73s.
Done in 3.46s.
`;

export default function Logs() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs([]);
    const lines = LOGS.split("\n");
    const interval = setInterval(() => {
      const next = lines.shift();
      if (!next) {
        return clearInterval(interval);
      } else {
        setLogs((prev) => prev.concat(`${new Date().toISOString()}\t${next}`));
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  console.log(logs.join("\n"));

  return (
    <Monaco
      style={{ width: "100%", height: "100%" }}
      options={{
        minimap: { enabled: false },
        lineNumbers: "off",
        readOnly: true,
      }}
      value={logs.join("\n")}
    />
  );
}
