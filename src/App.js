import { ScoringComponent } from "./scoring/ScoringComponent";
import json_data from "./stories/example-data/the-example";
//import json_data from "./stories/example-data/empty-aspects.json";
//import json_data from "./stories/example-data/empty-tasks.json";

function App() {
  return (
    <ScoringComponent
      criteria={json_data}
      onSubmit={results => console.log(results)}
      onCancel={draft => console.log(draft)}
    />
  );
}

export default App;
