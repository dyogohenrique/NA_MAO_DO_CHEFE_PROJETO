import ReactApexChart from 'react-apexcharts';

const LineChart = ({ data, categories }) => {
  const options = {
    chart: {
      type: 'line',
    },
    series: [
      {
        name: 'Vendas',
        data: data,
      },
    ],
    xaxis: {
      categories: categories, // Agora, você recebe os nomes dos produtos como categorias
    },
  };

  return <ReactApexChart options={options} series={options.series} type="line" height={250} width={500} />;
};

export default LineChart;
