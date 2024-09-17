import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import UploadFile from '../../Components/UploadFile/UploadFile'
import axios from 'axios';
import { Modal } from "react-bootstrap";
import './Instagram.css'
import Loader from '../../Components/Loader/Loader';

export default function Instagram() {
    const [fileSelected, setFileSelected] = useState();
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState({})
    const [caption, setCaption] = useState()
    const [generatedCaptions, setGeneratedCaptions] = useState([])
    const [isSelect, setIsSelect] = useState(false)
    const [postData,setPostData] = useState({})

    const changePostData = (e) =>{
        const  {name,value} = e.target

        setPostData(prevState =>({
            ...prevState,
            [name] :value
        }))
    }


    useEffect(() => {
        if (generatedCaptions.length) {
            setIsSelect(true)
        }
        else {
            setIsSelect(false)
        }

    }, [generatedCaptions])

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        setFileSelected(selectedFile);

    };

    const handleDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];

        setFileSelected(selectedFile);

    };

    const uplaodFile = async (e) => {
        e.preventDefault()
        // return
        // console.log(file)
        // return
        setLoader(true)

        const formData = new FormData();
        formData.append('file', fileSelected);
        formData.append('caption', caption)

        await axios.post("generate-caption/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response)
            setErrors({})
            // alert(response.data.message)
            setGeneratedCaptions(response.data.captions)
            setLoader(false)
        }).catch(error => {
            console.log(error)
            if (error.response.status === 400) {
                setErrors(error.response.data)
            }
            setLoader(false)
        })
    }

    const postApi = async (e) => {
        e.preventDefault()
        console.log('============')
        setLoader(true)

        const formData = new FormData();
        formData.append('file', fileSelected);
        formData.append('caption', postData['caption']||'')
        formData.append('username', postData['username']||'')
        formData.append('password', postData['password']||'')

        await axios.post("post-on-instagram/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response)
            setErrors({})
            
            setPostData({})
            setIsSelect(false)
            setLoader(false)
            alert(response.data.message)
        }).catch(error => {
            console.log(error)
            if (error.response.status === 400) {
                setErrors(error.response.data)
            }
            setLoader(false)
        })
    }
    return (
        <BasePage title="Instgram">
            {
                loader && <Loader/>
            }
            <UploadFile fileSelected={fileSelected} setFileSelected={setFileSelected} errors={errors} handleFileChange={handleFileChange} type="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" handleDrop={handleDrop} multiple={false} uplaodFile={uplaodFile} caption={caption} setCaption={setCaption} instagram = {true}/>


            <Modal
                show={isSelect}
                onHide={() => { setIsSelect(false) }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            >

                <Modal.Body style={{ maxHeight: "80vh", overflow: 'auto' }}>

                    <div className='p-3 h-100' >
                        <p className='text-center font-1 macan-bold '>Add New Post</p>
                        <p className='font-2 macan-semibold'>Select post</p>
                        <form onSubmit={postApi} className='p-2'>
                            <div className="row">
                                {generatedCaptions.map((value, index) => {
                                    return (
                                        <div className="col-4" key={index}>
                                            <input type="radio" name="caption" id={`caption-${index}`} value={value} className='d-none'  onChange={changePostData}/>
                                            <label htmlFor={`caption-${index}`} className='border'>{value}</label>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div class="input-field">
                                        <i class="fas fa-user"></i>
                                        <input type="text" name="username" placeholder="Username" value={postData['username']} onChange={changePostData} className={'username' in errors ? 'form-control is-invalid' : 'form-control'} />
                                        <div></div>
                                        <div class="invalid-feedback">
                                            {errors.username}
                                        </div>
                                    </div>
                                    <div class="input-field">
                                        <i class="fas fa-lock"></i>
                                        <input type="password" name="password" value={postData['password']} placeholder="Password" onChange={changePostData} className={'password' in errors ? 'form-control is-invalid' : 'form-control'} />
                                        <div></div>
                                        <div class="invalid-feedback">
                                            {/* {errors.password} */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-100 text-center mt-2">
                                <button type='submit' className='btn btn-dark pt-2 pb-2 m-0 ms-3'>Post     </button>
                            </div>
                        </form>





                    </div>







                </Modal.Body>

            </Modal>
        </BasePage>
    )
}
