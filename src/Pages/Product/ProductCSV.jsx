import React, { useState } from 'react';
import BasePage from '../BasePage/BasePage';
import './Product.css';
// import axios from 'axios';
import axios from '../../Api/axios'
import Loader from '../../Components/Loader/Loader';
import UploadFile from '../../Components/UploadFile/UploadFile'
export default function ProductCSV() {

  const [fileSelected, setFileSelected] = useState();
  const [loader,setLoader] = useState(false)
  const [errors,setErrors] = useState({})
  

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
        setFileSelected(selectedFile);
    } else {
        alert("Please upload a valid CSV file.");
    }
  };


  // const handleButtonClick = () => {
  //   document.getElementById("fileID").click();
  // };


  const handleDrop = (event) => {
    event.preventDefault(); 
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
        setFileSelected(selectedFile);
    } else {
        alert("Please upload a valid CSV file.");
    }
  };

 
  // const handleDragOver = (event) => {
  //   event.preventDefault();
  // };

  const uplaodFile = async (e) => {
    e.preventDefault()
    // return
    // console.log(file)
    // return
    setLoader(true)

    const formData = new FormData();
    formData.append('file', fileSelected);

    await axios.post("upload-product-csv", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log(response)
        setErrors({})
        alert(response.data.message)
        setLoader(false)
    }).catch(error => {
        console.log(error)
        if(error.response.status === 400){
            setErrors(error.response.data)
        }
        setLoader(false)
    })
}

  return (
    <BasePage title="Upload Product CSV">
      {loader && <Loader/>}
      <div className='upload-box'>
      <UploadFile fileSelected={fileSelected} setFileSelected={setFileSelected} errors={errors} handleFileChange={handleFileChange} type=".csv" handleDrop={handleDrop} multiple={false} uplaodFile={uplaodFile} />
      </div>
    </BasePage>
  );
}
