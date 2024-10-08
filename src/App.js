import logo from "./logo.svg";
import "./App.css";
import { Card } from "antd";
import WeatherCard from "./component/WeatherCard";
function App() {
  return (
    <div className="App">
      <WeatherCard />
    </div>
  );
}

export default App;
