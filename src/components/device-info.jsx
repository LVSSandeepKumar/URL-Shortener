import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

export default function DeviceInfo({ stats }) {

    const deviceCount = stats.reduce((acc, item) => {
        if(!acc[item.device]) {
            acc[item.device] = 0;
        }
        acc[item.device]++;
        return acc;
    }, {})

    const result = Object.keys(deviceCount).map((device) => ({
        device,
        count : deviceCount[device]
    }));

    const COLORS = ["#FFFFFF", "#E0FFFF", "#DEB887", "#DCDCDC"]

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={700} height={400}>
          <Pie
            data={result}
            dataKey="count"
            labelLine={false}
            label={({device, percent}) => 
            `${device} : ${(percent * 100).toFixed(0)}%`}
          >
            {result.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
