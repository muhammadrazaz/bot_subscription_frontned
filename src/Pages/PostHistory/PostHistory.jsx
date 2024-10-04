import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import DownloadButton from '../../Components/DownloadButton/DownloadButton'
import Loader from '../../Components/Loader/Loader'
// import axios from 'axios'
import axios from '../../Api/axios'
import { useParams } from 'react-router-dom'

import { subDays } from 'date-fns'
import CustomDatePicker from '../../Components/CustomDatePicker/CustomDatePicker'

export default function PostHistory() {
    const { user_id } = useParams()
    const [loader, setLoader] = useState(false)
    const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
    const [tableData, setTableData] = useState({
        columns: [
            {
                label: 'ID',
                field: 'id',

            },
            {
                label: 'Image',
                field: 'file',

            },
            {
                label: 'Caption',
                field: 'caption',

            },
            {
                label: 'Post URL',
                field: 'post_url'
            },
            {
                label: 'Date Time',
                field: 'date_time'
            },

        ]
    })

    useEffect(() => {
        getFileData()
    }, [dates])

    const getFileData = () => {
        setLoader(true)
        axios.get('view-posts/', {
            params: {
                user_id: user_id,
                dates : dates
            }
        }).then(response => {
            console.log(response)
            const data = response.data.rows


            setTableData(prevState => ({
                ...prevState,
                'rows': response.data
            }))
            setLoader(false)
        }).catch(error => {
            console.log(error)
            setLoader(false)
        })
    }
    return (
        <BasePage title="Post History">
            {loader && <Loader />}
            <div className="row">

            <div className="col-md-6">
                <CustomDatePicker dates={dates} setDates={setDates} />
                </div>
                <div className="col-md-6 text-end">


                    <DownloadButton data={tableData} filename="PostReport.csv" />

                </div>

                <div style={{ height: '95%' }}>
                    <TableWithPagination data={tableData} />
                </div>

                
            </div>
            
        </BasePage>
    )
}
