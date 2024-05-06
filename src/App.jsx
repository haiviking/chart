import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, Label } from 'recharts';
import { dataFake } from './data'; // Import your data file here

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // Define your colors

const UserPieChart = ({ userData }) => {
  const total = userData.projects.reduce((acc, project) => acc + project.time, 0);

  const data = userData.projects.map(project => ({
    name: project.name,
    value: project.time,
    percentage: ((project.time / total) * 100).toFixed(2)
  }));

  return (
    <PieChart width={300} height={300}>
      <Tooltip formatter={(value, name, props) => [`${name}: ${value} hours (${props.payload.percentage}%)`, '']} />
      <Legend />
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        labelLine={false}
        label={(entry) => `${entry.percentage}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

const App = () => {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {dataFake.map(user => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <UserPieChart userData={user} />
        </div>
      ))}
    </div>
  );
};

export default App;
