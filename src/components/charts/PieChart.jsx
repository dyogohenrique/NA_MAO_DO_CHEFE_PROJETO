import ReactApexChart from 'react-apexcharts';

const PieChart = ({ data, labels }) => {
    const options = {
      chart: {
        type: 'pie',
      },
      labels: labels, // Agora, você recebe os nomes dos produtos como labels
      series: data,
    };
  
    return <ReactApexChart options={options} series={options.series} type="pie" height={200} width={500} />;
  };
  
  export default PieChart;