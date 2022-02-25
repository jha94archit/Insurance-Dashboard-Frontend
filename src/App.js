import Topbar from "./Components/Topbar/Topbar";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Home />
      </div>
    </div>
  );
}

export default App;
