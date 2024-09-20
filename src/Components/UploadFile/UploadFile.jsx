import React from 'react'
import './UploadFile.css'
import UploadIcon from '../../Assets/upload.png'
export default function UploadFile(props) {
    // const handleFileChange = (event) => {
    //     const selectedFile = event.target.files[0];
    //     if (selectedFile && selectedFile.type === "text/csv") {
    //         props.setFileSelected(selectedFile);
    //     } else {
    //         alert("Please upload a valid CSV file.");
    //     }
    // };


    const handleButtonClick = () => {
        document.getElementById("fileID").click();
    };


    // const handleDrop = (event) => {
    //     event.preventDefault();
    //     const selectedFile = event.dataTransfer.files[0];
    //     if (selectedFile && selectedFile.type === "text/csv") {
    //         props.setFileSelected(selectedFile);
    //     } else {
    //         alert("Please upload a valid CSV file.");
    //     }
    // };


    const handleDragOver = (event) => {
        event.preventDefault();
    };
    return (
        <div className="row" style={{'justifyContent':'center'}}>

            <form
                className="py-5 col-md-6 col-sm-10 "
                onDrop={props.handleDrop}
                onDragOver={handleDragOver}
                onSubmit={props.uplaodFile}
            >
                <img src={UploadIcon} alt="" style={{ height: '150px', 'opacity': '0.8' }} />
                {/* <p>Files Supported: CSV</p> */}
                <p style={{ "fontSize": '24px' }} className='macan-bold mb-2'>Upload your files</p>
                <p className='font-2 macan-semibold opacity-75'>Drag and drop your files here or <button className='file-btn' onClick={handleButtonClick} type='button'>choose files</button></p>
                <input
                    type="file"
                    hidden
                    accept={props.type}
                    id="fileID"
                    className='upload-input form-control is-invalid'
                    style={{ display: 'none' }}
                    onChange={props.handleFileChange}
                    multiple={props.multiple}
                    value={props.fileSelected ? undefined : ''}
                />
                <div class="invalid-feedback w-100 text-center">
                    {props.erorrs && props.errors.file}
                </div>
                {
                    props.instagram && <input className='input-field' type="text" name="caption" value={props.caption} onChange={(e)=>{props.setCaption(e.target.value)}} placeholder='Enter Caption'/>
                }
                
                {props.fileSelected && <button className="file-btn font-2 macan-semibold opacity-75" type='submit'>Upload</button>}

            </form>
        </div>

    )
}
