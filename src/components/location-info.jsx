import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceDot,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

export default function LocationInfo({ stats }) {

    const cityCount = stats.reduce((acc, item) => {
        if(acc[item.city]) {
            acc[item.city] += 1;
        } else acc[item.city] = 1;
        
        return acc;
    }, {})

    const cities = Object.entries(cityCount).map(([city, count]) => ({
        city,
        count
    }));

  return (
    <div style={{width: "100%", height : 300}}>
      <ResponsiveContainer>
        <LineChart width={700} height={300} data={cities.slice(0,5)}>
          <XAxis dataKey="city" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip labelStyle={{color:"green"}}/>
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
