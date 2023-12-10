import React, { useEffect, useRef } from 'react'
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

Chart.register(ArcElement, Tooltip, Legend)

import {Pie, getElementAtEvent} from 'react-chartjs-2';
import axios from 'axios';

const PieChart = ({data}) => {

    const path = useNavigate();

    const resdata = {
        labels: ["Open", "In-Progress", "Waiting On Client", "Resolved"],
        datasets: [
            {
                data: [data.open, data.progress, data.wait, data.solve],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)','rgb(80, 185, 116)']
            }
        ]
    };

    const options = {

    }

    const chartRef = useRef();
    
    function getFilterIssues(stat){
        let filterrecords = '';

        axios.get("http://localhost:8080/api/v1/issue").then(response => {
            // console.log(response.data);

            const res = response.data;
            filterrecords = res.filter((record) => record.issueStatus === stat);
            // console.log(filterrecords);
            path('/filterissues', { state: { filterrecords } });
        })
    }

    function viewIssues(e){
        if(getElementAtEvent(chartRef.current, e)[0].index == 0){
            const stat = "Open";
            getFilterIssues(stat);
        }
        else if(getElementAtEvent(chartRef.current, e)[0].index == 1){
            const stat = "In-Progress";
            getFilterIssues(stat);
        }
        else if(getElementAtEvent(chartRef.current, e)[0].index == 2){
            const stat = "Waiting On Client";
            getFilterIssues(stat);
        }
        else if(getElementAtEvent(chartRef.current, e)[0].index == 3){
            const stat = "Resolved";
            getFilterIssues(stat);
        }
    }   

  return (
    <div>
        {/* <canvas ref={chartRef} style={{width:"200px", height:"200px"}} /> */}
        <Pie
            data={resdata}
            options={options}
            onClick={viewIssues}
            ref={chartRef}
        >
        </Pie>
    </div>
  )
}

export default PieChart