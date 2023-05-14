import './App.css';
import { Chart } from "react-google-charts";

function App() {
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={data}
        options={{ title: "My Daily Activities" }}
      />
    </div>
  );
}

export default App;

