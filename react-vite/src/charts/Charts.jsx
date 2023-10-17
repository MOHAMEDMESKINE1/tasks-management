import { useEffect, useState } from "react"
import { Bar, Line, Pie, Radar } from "react-chartjs-2"
import  ChartDataLabels from'chartjs-plugin-datalabels';
import Api from "../helpers/Api";
import Card from "../components/layouts/Card";
import Chart from "react-apexcharts";
import ApexCharts from "react-apexcharts";
import { 
    CategoryScale,
    LinearScale,
    Chart as ChartJs, 
    BarElement,
    LineElement,
    PointElement ,
    RadialLinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
  } from "chart.js";

  ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    RadialLinearScale,
    ArcElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend,
     Filler,
    
)

export default function Charts() {
   

    const [taskData, setTaskData] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const fetchTasksData = async ()=>{
        const response =   await Api.get('/tasks/charts')
        const data =   await Api.get('/tasks/charts')

        setTaskData(response.data);
      
       
      }

    const fetchDoneTasksData = async ()=>{
        const response =   await Api.get('/tasks/charts/tasks/done')
        console.log(response.data);
        setDoneTasks(response.data);
      }

    useEffect(() =>  {

      fetchTasksData();
      fetchDoneTasksData();
    }, []); 
    
  // tasksdone
  const chartDoneTasks = {
    labels: doneTasks.map(item => item.completion_date),
    datasets: [
      {
        label: 'Completed Tasks',
        data: doneTasks.map(item => item.completed_count),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor:'lightgreen',
        lineTension: 0.1,
        
      },
      {
        label: 'Not Completed Tasks',
        data: doneTasks.map(item => item.not_completed_count),
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor:'red',

        lineTension: 0.1,
      },
      
    ],
  responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
     
      
      },
    },
     
    
  
   
  };
  
  // tasksdone

    // Create a chart data object
    const chartData = {
      labels: Object.keys(taskData),
      datasets: [
        {
            label: 'Task Created By Dates',
            data: Object.values(taskData),
            fill: false,
            borderColor: '#9BD0F5',
            backgroundColor: [
              
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            lineTension: 0.1,
            hoverOffset: 4,
        },
        
      ],
     
    };
    // options pie
    const chartPieOptions = {
       plugins: {
      datalabels: {
      display: true,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: '#fff',
      borderRadius: 4,
      padding: 4,
      font: {
        size: 14,
        family: 'Arial',
      },
      align: 'center',
      anchor: 'center',
    },
  },
    };
      const datasetLabel = chartData.datasets[0].label;




      //-------------------- apexcharts option-----------------------
      const options = {
       
        xaxis: {
          categories: Object.keys(taskData),
        },
        plotOptions: {
          line: {
            dataLabels: {
              position: 'center', // You can customize the position of the labels
              enabled: true,
            },
          },
         
        },
        
        legend: {
          show: true,
        },
      };
    
      const series = [
        {
          name: 'Tasks Count',
          data: Object.values(taskData),
        },
      ];
      // apexcharts option
      
      return (
    <>
          
          
              <div className="container ">
                <div className="row gy-3 ">

                    <div className="col-6 ">
                        
                      <Card title={datasetLabel} footer={'Bar Data'}>
                        <Bar data={chartData} />
                      </Card>
                      
                    </div>
                    <div className="col-6">
                       
                      <Card title={datasetLabel}  footer={'Line Data'}>
                        <Line data={chartData} />
                      </Card>
                        
                    </div>
                    <div className="col-md-6">
                       
                      <Card title={datasetLabel}  footer={'Radar Data'}>
                        <Radar data={chartData} />
                      </Card>
                        
                    </div>
                    <div className="col-md-6">
                       
                    <Card title={'Number Tasks'}  footer={'Pie Data'}>
                        <Pie data={chartData}  options={chartPieOptions}    />
                      </Card>
                        
                    </div>
                    <div className="col-md-6">
                       
                    <Card title={'Done  Tasks'}  footer={'Line Data'}>
                        <Line data={chartDoneTasks}    />
                      </Card>
                        
                    </div>
                    <div className="col-md-6">
                       
                    <Card title={'Done  Tasks'}  footer={'Horizontal Bar Data'}>
                        <Bar data={chartDoneTasks} options={{
                           indexAxis: 'y' ,
                           elements: {
                             bar: {
                               borderWidth: 2,
                             },
                           },
                        }}   />
                      </Card>
                        
                    </div>
                    <div className="col-md-6">
                       
                    <Card title={'Task Created By Dates '}  footer={'ApexChart  Bar Data'}>
                        <ApexCharts  options={options} series={series}  type="bar" height={300}   />
                      </Card>
                        
                    </div>
                    <div className="col-md-6">
                       
                    <Card title={'Task Created By Dates '}  footer={'ApexChart  Pie Data'}>
                        <ApexCharts  options={options} series={series}  type="line" height={300}   />

                    </Card>
                        
                    </div>
                   
                </div>
            </div>
          
    </>
  )
}
