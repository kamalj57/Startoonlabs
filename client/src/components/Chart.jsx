import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Chart = () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API;
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/admin`);

        const groupedData = response.data.reduce((acc, user) => {
          const date = new Date(user.lastLoginDate);
          const year = date.getFullYear();
          const month = date.toLocaleString('default', { month: 'short' });

          if (!acc[year]) {
            acc[year] = {};
          }
          if (!acc[year][month]) {
            acc[year][month] = 0;
          }
          acc[year][month] += 1;

          return acc;
        }, {});

        const formattedChartData = Object.keys(groupedData).map(year => {
          const monthlyData = groupedData[year];
          return {
            year: year,
            months: [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ].map(month => ({
              month: month,
              users: monthlyData[month] || 0,
            }))
          };
        });

        const newChartData = {
          labels: formattedChartData.map(yearData => yearData.year),
          datasets: [
            ...Array.from(new Set(formattedChartData.flatMap(yearData => yearData.months.map(monthData => monthData.month)))).map(month => ({
              label: month,
              data: formattedChartData.map(yearData => {
                const monthData = yearData.months.find(md => md.month === month);
                return monthData ? monthData.users : 0;
              }),
              backgroundColor: getRandomColor()
            }))
          ]
        };

        setChartData(newChartData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData.labels.length ? chartData.labels.map((label, index) => ({
          year: label,
          ...chartData.datasets.reduce((acc, dataset) => ({
            ...acc,
            [dataset.label]: dataset.data[index]
          }), {})
        })) : []}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
            backgroundColor: '#fff',
            padding: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, auto)',
            columnGap: '10px'
          }}
          itemStyle={{
            display: 'inline-block',
            margin: '0',
            padding: '5px',
            whiteSpace: 'nowrap'
          }}
        />
        <Legend />
        {chartData.datasets.map((dataset, index) => (
          <Bar key={index} dataKey={dataset.label} stackId="a" fill={dataset.backgroundColor} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
