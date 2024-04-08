import { AppBar } from "./components/AppBar";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="container">
      <div className="flex flex-col w-full min-h-screen">
        <AppBar />
        <Button>Button</Button>
      </div>
    </div>
  );
}

export default App;
