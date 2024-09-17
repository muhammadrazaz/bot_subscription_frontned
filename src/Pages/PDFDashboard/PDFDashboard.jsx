import React, { useState } from 'react'
import BasePage from '../BasePage/BasePage'
import UploadFile from '../../Components/UploadFile/UploadFile';
import axios from 'axios';
import Loader from '../../Components/Loader/Loader'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination';
export default function PDFDashboard() {
    const [fileSelected, setFileSelected] = useState();
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState({})

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
                field: 'datetime'
            },

        ]
    })

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const formData = new FormData();

        if (selectedFiles.length > 0) {
            Array.from(selectedFiles).forEach((file) => {
                if (file.type === "application/pdf") {
                    formData.append("files", file);
                } else {
                    alert("Please upload only valid PDF files.");
                    return;
                }
            });
            setFileSelected(formData);
        } else {
            alert("Please select at least one file.");
        }
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const selectedFiles = event.target.files;
        const formData = new FormData();

        if (selectedFiles.length > 0) {
            Array.from(selectedFiles).forEach((file) => {
                if (file.type === "application/pdf") {
                    formData.append("files", file);
                } else {
                    alert("Please upload only valid PDF files.");
                    return;
                }
            });
            setFileSelected(formData);
        } else {
            alert("Please select at least one file.");
        }
    };


    const uplaodFile = async (e) => {
        e.preventDefault()
        // return
        // console.log(file)
        // return
        setLoader(true)



        await axios.post("pdf/", fileSelected, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {

            setErrors({})
            const data = response.data.rows
            for (var i = 0; i < data.length; i++) {
                data[i]['input'] = <a target="_blank" href={axios.defaults.baseURL + '/pdf/download/?filename=' + data[i]['input']}>{data[i]['input']}</a>
                data[i]['output'] = <a target="_blank" href={axios.defaults.baseURL + '/pdf/download/?filename=' + data[i]['output']}>{data[i]['output']}</a>

            }

            setTableData(prevState => ({
                ...prevState,
                'rows': data
            }))
            setFileSelected()

            setLoader(false)
        }).catch(error => {
            console.log(error)
            if (error.response.status === 400) {
                setErrors(error.response.data)
            }
            setLoader(false)
        })
    }
    return (
        <div>
            
            {loader && <Loader/>}
            <BasePage title="PDF">
                <UploadFile fileSelected={fileSelected} setFileSelected={setFileSelected} errors={errors} handleFileChange={handleFileChange} handleDrop={handleDrop} multiple={true} uplaodFile={uplaodFile} type=".pdf"/>
                <div className='desktop' style={{ height: '95%' }}>
                    <TableWithPagination data={tableData} />
                </div>
            </BasePage>


        </div>
    )
}
