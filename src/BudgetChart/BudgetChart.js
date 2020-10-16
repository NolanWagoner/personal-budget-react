import React from 'react';
import axios from 'axios';
import Chart from 'chart.js';

function BudgetChart() {
  return (
    <>
        <div className="text-box">
            <h1>Chart</h1>
            <p>
                <canvas id="myChart" width="400" height="400"></canvas>
            </p>
        </div>
    </>
  );
}

var dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#ccff00',
                '#ccffff',
                '#ffccff',
            ],
        }
    ],
    labels: []
};

    function createChart() {
        var ctx = document.getElementById("myChart").getContext("2d");
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: dataSource
        });
    }

    function getBudget() {
        axios.get('http://localhost:3000/budget')
        .then(function (res) {
            console.log(res);
            for (var i = 0; i < res.data.myBudget.length; i++){
                dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                dataSource.labels[i] = res.data.myBudget[i].title;
            }
            createChart();
        });
    }
    getBudget();

export default BudgetChart;
