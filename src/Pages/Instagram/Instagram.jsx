import React, { useEffect, useRef, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import UploadFile from '../../Components/UploadFile/UploadFile'
// import axios from 'axios';
import axios from '../../Api/axios'
import { Modal } from "react-bootstrap";
import './Instagram.css'
import Loader from '../../Components/Loader/Loader';
import { useAuth } from '../../Provider/AuthProvider';
export default function Instagram() {
    const { token } = useAuth()
    const [fileSelected, setFileSelected] = useState();
    const [loader, setLoader] = useState(true)
    const [errors, setErrors] = useState({})
    const [generatedCaptions, setGeneratedCaptions] = useState([])

    const [isOTP, setIsOTP] = useState(false)
    const [OTP, setOTP] = useState()
    const [isConnection, setIsConnection] = useState(false)

    const socketRef = useRef(null);
    const [isInstagramConnect, setIsInstagramConnect] = useState(false)
    const [isSetUpCaptionPrompt, setIsSetUpCaptionPrompt] = useState(false)
    const [isPrompt, setIsPrompt] = useState(false)
    const [connectData, setConnectData] = useState({})
    const [username, setUsername] = useState('')
    const [captionPrompt, setCaptionPrompt] = useState('')
    


    const url = axios.defaults.baseURL


    const wsUrl = 'ws://' + url.split('//')[1].split('/')[0] + '/ws/ac/?token=' + token;

    useEffect(() => {

        socketRef.current = new WebSocket(wsUrl);
        // 

        // Create WebSocket connection

        // Connection opened
        socketRef.current.onopen = () => {
            console.log("WebSocket connection established");
            setIsConnection(true)
            // Optionally send data to the server
            socketRef.current.send("Hello Server!");
        };

        // Listen for messages
        socketRef.current.onmessage = (event) => {
            console.log("Message from server: ", event.data);
            if (event.data === 'otp required') {
                setIsOTP(true)
            }
            if (event.data === 'otp received') {
                setIsOTP(false)
                setOTP()
            }
        };

        // Handle errors
        socketRef.current.onerror = (error) => {
            console.error("WebSocket Error: ", error);
        };

        // Connection closed
        socketRef.current.onclose = () => {
            setIsConnection(false)
            console.log("WebSocket connection closed");
        };

        // Cleanup on component unmount
        return () => {
            socketRef.current.close();
        };


    }, [wsUrl]);
    const sendOTP = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {

            socketRef.current.send(OTP);
        }
    }

  


    const getIP = async () => {
        // setLoader(true)
        const response = await fetch('https://ipinfo.io/json')
        const data = await response.json();
        // setLoader(false)
        // console.log(data,data.country)
        setConnectData(prevState =>({
            ...prevState,
            'latitude' : data.loc.split(',')[0],
            'longitude' : data.loc.split(',')[1],
            'country_code' : data.country,
            'city_name' : data.city,

        }))
      
    }


    useEffect(() => {
        getUsernameAndPropmt()
        // getIP()
    }, [])

    useEffect(()=>{
        if(!connectData.city_name){
            console.log(connectData,'1111111111')
            getIP()
        }
        console.log(connectData,'===============')
    },[connectData])

    const changeConnectData = (e) => {
        const { name, value } = e.target
        setConnectData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    // const changePostData = (e) => {
    //     const { name, value } = e.target

    //     setPostData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }))
    // }


    // useEffect(() => {
    //     if (generatedCaptions.length) {
    //         setIsSelect(true)
    //     }
    //     else {
    //         setIsSelect(false)
    //     }

    // }, [generatedCaptions])

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        setFileSelected(selectedFile);

    };

    const handleDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];

        setFileSelected(selectedFile);

    };

    const handleInputChange = (e, index) => {
        const newValue = e.target.value;

        setGeneratedCaptions(prevState => {
            // Create a shallow copy of the previous state
            const updatedCaptions = [...prevState];

            // Update the value at the specific index
            updatedCaptions[index] = newValue;

            // Return the updated array as the new state
            return updatedCaptions;
        });
    };


    const getUsernameAndPropmt =  () => {
        setLoader(true)
         axios.get("connect-instagram/")
            .then(response => {

                setUsername(response.data.username)
                setIsPrompt(response.data.prompt)
                setCaptionPrompt(response.data.prompt)
                setLoader(false)
            }).catch(error => {


                setLoader(false)
            })
    }

    const connectAPI = async (e) => {
        e.preventDefault()
        

        console.log('test')
        setLoader(true)
        
        await axios.post("connect-instagram/", connectData)
            .then(response => {
                console.log(response)
                setErrors({})

                setConnectData({})
                setLoader(false)
                setIsInstagramConnect(false)
                alert(response.data.message)
                getUsernameAndPropmt()
            }).catch(error => {
                console.log(error)
                if (error.response.status === 400) {
                    setErrors(error.response.data)
                }
                setLoader(false)
                
            })

    }

    const setCaptionPromptAPI = async (e) => {
        e.preventDefault()
        setLoader(true)
        await axios.post("set-up-prompt/", { 'prompt': captionPrompt })
            .then(response => {
                console.log(response)
                setErrors({})
                setIsPrompt(true)
                setIsSetUpCaptionPrompt(false)
                setLoader(false)

            }).catch(error => {
                console.log(error)
                if (error.response.status === 400) {
                    setErrors(error.response.data)
                }
                setLoader(false)
            })
    }


    const uplaodFile = async (e) => {
        e.preventDefault()

        setLoader(true)

        const formData = new FormData();
        formData.append('file', fileSelected);


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

        const form = e.target;
        const caption = form.elements.caption.value;

        setLoader(true)

        const formData = new FormData();
        formData.append('file', fileSelected);
        formData.append('caption', caption || '')


        await axios.post("post-on-instagram/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response)
            setErrors({})


            setFileSelected()
            setGeneratedCaptions([])
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
        <BasePage title="Instagram">
            {
                loader && <Loader />

            }

            <div className='insta-button'>
                <button className={'macan-semibold py-2 px-3 top-btn my-1' + (isInstagramConnect ? 'active-border' : '')} onClick={() => { setIsSetUpCaptionPrompt(false); setIsInstagramConnect(!isInstagramConnect) }}>{username ? username + ' √' : 'Connect Instagram'}</button>
                <button className={'macan-semibold py-2 px-3 top-btn ms-md-4 my-1' + (isSetUpCaptionPrompt ? 'active-border' : '')} onClick={() => { setIsInstagramConnect(false); setIsSetUpCaptionPrompt(!isSetUpCaptionPrompt) }}>Set-up Caption Prompt{isPrompt ? ' √' : ''}</button>
            </div>


            {
                isInstagramConnect && <div className='d-flex  align-items-center justify-content-center' style={{ height: '70vh' }}>
                    <form className="insta-form p-4" onSubmit={connectAPI}>
                        <div className="row" style={{ width: '90%' }}>
                            <div className="col-12">
                                <div class="input-field my-3">
                                    <i class="fas fa-user"></i>
                                    <input type="text" name="username" placeholder="Username" value={connectData['username']} onChange={changeConnectData} className={'username' in errors ? 'form-control is-invalid' : 'form-control'} />
                                    <div></div>
                                    <div class="invalid-feedback">
                                        {errors.username}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div class="input-field my-3">
                                    <i class="fas fa-lock"></i>
                                    <input type="password" name="password" value={connectData['password']} placeholder="Password" onChange={changeConnectData} className={'password' in errors ? 'form-control is-invalid' : 'form-control'} />
                                    <div></div>
                                    <div class="invalid-feedback">
                                        {errors.password}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="connect-btn macan-semibold py-2 px-3 mt-4" type='submit'>
                                    Connect
                                </button>
                            </div>
                        </div>
                    </form>
                </div>




            }

            {
                isSetUpCaptionPrompt && <div className='d-flex  align-items-center justify-content-center' style={{ height: '70vh' }}>
                    <form className="insta-form p-4" onSubmit={setCaptionPromptAPI}>
                        <div className="row" style={{ width: '90%' }}>
                            <div className="col-12 propmt-txt macan-regular">
                                <p>ChatGPT will write 3 captions of the images uploaded based on this prompt. </p>
                            </div>
                            <div className="col-12 my-4">
                                <div>
                                    <textarea name="prompt" id="" className={'w-100 p-3 macan-semibold form-control ' + (errors.prompt ? 'is-invalid' : '')} rows={8} style={{ resize: 'none', fontSize: '16px' }} value={captionPrompt} onChange={(e) => { setCaptionPrompt(e.target.value) }}></textarea>
                                    <div class="invalid-feedback">
                                        {errors.prompt}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="connect-btn macan-semibold py-2 px-3">
                                    Set-up Prompt
                                </button>
                            </div>
                        </div>
                    </form>
                </div>




            }




            {(username && !isInstagramConnect) && (isPrompt && !isSetUpCaptionPrompt) && (!generatedCaptions.length) && < UploadFile fileSelected={fileSelected} setFileSelected={setFileSelected} errors={errors} handleFileChange={handleFileChange} type="image/*" handleDrop={handleDrop} multiple={false} uplaodFile={uplaodFile} />}


            {generatedCaptions.length &&

                <div className='row mt-5'>

                    {generatedCaptions.map((data, index) => {
                        return <div className="col-4">
                            <p className='macan-semibold' style={{ fontSize: '16px' }}>Caption {index + 1}</p>
                            <form className="catption-box p-4 mt-3 align-items-start" onSubmit={postApi}>
                                <textarea name="caption" id="" className='w-100 caption-textarea macan-semibold' rows={10} style={{ resize: 'none' }} value={data} onChange={(e) => handleInputChange(e, index)} ></textarea>
                                <div>

                                    <button className='post-btn py-2 px-5 macan-semibold' type='submit'>Post</button>
                                </div>
                            </form>
                        </div>
                    })}


                </div>}







            <Modal
                show={isOTP}
                onHide={() => {
                    // setIsOTP(false)
                }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ zIndex: '10000000000000' }}

            >

                <Modal.Body style={{ maxHeight: "80vh", overflow: 'auto' }}>

                    <div className='p-3 h-100' >
                        <p className='text-center font-1 macan-bold '>Enter OTP</p>




                        <div className="row">
                            <div className="col">
                                <div class="input-field">
                                    <i class="fas fa-user"></i>
                                    <input type="text" name="otp" placeholder="otp" value={OTP} onChange={(e) => { setOTP(e.target.value) }} className={'otp' in errors ? 'form-control is-invalid' : 'form-control'} />
                                    <div></div>
                                    <div class="invalid-feedback">
                                        {errors.otp}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-100 text-center mt-2">
                            <button type='button' className='btn btn-dark pt-2 pb-2 m-0 ms-3' onClick={sendOTP}>Next     </button>
                        </div>






                    </div>







                </Modal.Body>

            </Modal>
        </BasePage>
    )
}
