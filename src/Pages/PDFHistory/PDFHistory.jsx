import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import DownloadButton from '../../Components/DownloadButton/DownloadButton'
import Loader from '../../Components/Loader/Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'
export default function PDFHistory() {
    const {user_id} = useParams()
    const [loader,setLoader] = useState(false)
    const [tableData, setTableData] = useState({
        columns: [
            {
                label: 'ID',
                field: 'id',

            },
            {
                label: 'Input',
                field: 'input',

            },
            {
                label: 'Output',
                field: 'output',

            },
            {
                label: 'Date Time',
                field: 'date_time'
            },

        ]
    })

    useEffect(()=>{
        getFileData()
    },[])

    const getFileData = () =>{
        setLoader(true)
        axios.get('pdf/',{
            params :{
                user_id :user_id
            }
        }).then(response =>{
            console.log(response)
            const data = response.data.rows
            for (var i = 0; i < data.length; i++) {
                data[i]['input'] = <a target="_blank" href={axios.defaults.baseURL+'/pdf/download/?filename='+data[i]['input']}>{data[i]['input']}</a>
                data[i]['output'] = <a target="_blank" href={axios.defaults.baseURL+'/pdf/download/?filename='+data[i]['output']}>{data[i]['output']}</a>
                
              }

              setTableData(prevState =>({
                ...prevState,
                'rows':data
              }))
            setLoader(false)
        }).catch(error =>{
            console.log(error)
            setLoader(false)
        })
    }
    return (
        <BasePage title="PDF History">
            {loader && <Loader/>}
            <div className="row">
                
                <div className="col text-end">


                    <DownloadButton data={tableData} filename="PDFFileReport.csv" />

                </div>

                <div className='desktop' style={{ height: '95%' }}>
                    <TableWithPagination data={tableData} />
                </div>
            </div>
        </BasePage>
    )
}
