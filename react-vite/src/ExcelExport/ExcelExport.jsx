import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import Api from '../helpers/Api';

import * as XLSX from 'xlsx';
import { useState } from 'react';
export default function ExcelExport() {


    const [tasks, setTasks] = useState([]);
    const [exporData, setExportData] = useState([]);

   
    // const excelData =    Api.get("/tasks").then(res=>res.data);
    const fileType = '8-application/vnd.openxmlfornats-officedocument.spreadsheetml.sheet;charset=UTF';
    const fileExtension = ' . xlsx' ;

    const exporTasksToExcel =async ()  => {
    
        try {
            const tasks = await Api.get('/tasks/all').then(res=>res.data);
           
            const worksheet = XLSX.utils.json_to_sheet(tasks);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tasks.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
  
          
        } catch (error) {
          console.log(error);
        }
  
    
      }
    //   useEffect(()=>{
    //     fetchtasks()
    //   },[])
  return (



    <div class=" my-3 mx-2">
        <button onClick={exporTasksToExcel} class="btn btn-success"><FontAwesomeIcon icon={faFileExcel}/>   Export To Excel </button>
      


  </div>
  )
}
