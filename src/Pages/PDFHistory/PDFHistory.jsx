import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import DownloadButton from '../../Components/DownloadButton/DownloadButton'
import Loader from '../../Components/Loader/Loader'
import CustomDatePicker from '../../Components/CustomDatePicker/CustomDatePicker'
// import axios from 'axios'
import axios from '../../Api/axios'
import { useParams } from 'react-router-dom'

import { subDays } from 'date-fns'


export default function PDFHistory() {
    const {user_id} = useParams()
    const [loader,setLoader] = useState(false)
    const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
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
                label: 'Output Without Contacts',
                field: 'output',

            },
            {
                label: 'Output With Contacts',
                field: 'output_with_contacts',

            },
            {
                label: 'Date Time',
                field: 'date_time'
            },

        ]
    })

    useEffect(()=>{
        getFileData()
    },[dates])

    const getFileData = () =>{
        setLoader(true)
        axios.get('pdf/',{
            params :{
                user_id :user_id,
                dates : dates
            }
        }).then(response =>{
            console.log(response)
            const data = response.data.rows
            for (var i = 0; i < data.length; i++) {
                data[i]['input'] = <a target="_blank" href={axios.defaults.baseURL+'/pdf/download/?filename='+data[i]['input']}>{data[i]['input']}</a>
                data[i]['output'] = <a target="_blank" href={axios.defaults.baseURL+'/pdf/download/?filename='+data[i]['output']}>{data[i]['output']}</a>
                data[i]['output_with_contacts'] = <a target="_blank" href={axios.defaults.baseURL + '/pdf/download/?filename=' + data[i]['output_with_contacts']}>{data[i]['output_with_contacts']}</a>
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
                <div className="col-md-6">
                <CustomDatePicker dates={dates} setDates={setDates} />
                </div>
                <div className="col-md-6 text-end">


                    <DownloadButton data={tableData} filename="PDFFileReport.csv" />

                </div>

                <div  style={{ height: '95%' }}>
                    <TableWithPagination data={tableData} />
                </div>
            </div>
            
        </BasePage>
    )
}
