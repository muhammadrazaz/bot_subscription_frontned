import React, { useEffect, useRef, useState } from 'react'
// import BasePage from '../BasePage/BasePage'
// import UploadFile from '../../Components/UploadFile/UploadFile'
// import axios from 'axios';
import addIcon from '../../Assets/add.png'
import logoutIcon from '../../Assets/logout.png'
import axios from '../../Api/axios'
import { Modal } from "react-bootstrap";
import './Instagram.css'
import InstagramLoader from '../../Components/InstagramLoader/InstagramLoader';
import { useAuth } from '../../Provider/AuthProvider';
export default function Instagram() {
    const { token,setToken, setUserDetail } = useAuth()
    const [fileSelected, setFileSelected] = useState();
    const [loader, setLoader] = useState(true)
    const [errors, setErrors] = useState({})
    const [generatedCaptions, setGeneratedCaptions] = useState([])
    const [otherLoader, setOtherLoader] = useState(false)
    const [otherText, setOtherText] = useState('')

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
    const [connectText, setConnectText] = useState('Connect Instagram')



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



    const logout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserDetail()
        setToken('')
    }
    const connectButtonHover = () => {
        if (connectText !== 'Connect Instagram') {
            setConnectText('Disconnect Instagram')
        }
    }

    const connectButtonLeave = () => {
        if (username) {
            setConnectText(username + ' √')
        }
    }



    const getIP = async () => {
        // setLoader(true)
        const response = await fetch('https://ipinfo.io/json')
        const data = await response.json();
        // setLoader(false)
        // console.log(data,data.country)
        setConnectData(prevState => ({
            ...prevState,
            'latitude': data.loc.split(',')[0],
            'longitude': data.loc.split(',')[1],
            'country_code': data.country,
            'city_name': data.city,

        }))

    }


    useEffect(() => {
        getUsernameAndPropmt()
        // getIP()
    }, [])

    useEffect(() => {
        if (!connectData.city_name) {
            // console.log(connectData, '1111111111')
            getIP()
        }
        // console.log(connectData, '===============')
    }, [connectData])

    const changeConnectData = (e) => {
        const { name, value } = e.target
        setConnectData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        if (fileSelected) {
            uplaodFile()
        }
    }, [fileSelected])

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        setFileSelected(selectedFile);


    };

    const handleDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];

        setFileSelected(selectedFile);


    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleButtonClick = () => {
        document.getElementById("fileID").click();
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


    const connectClick = () => {
        if (connectText == 'Connect Instagram') {
            setIsInstagramConnect(true)
        }
        else {
            axios.get('/disconnect-instagram')
                .then(response => {
                    console.log(response)
                    getUsernameAndPropmt()
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    const focusTextarea = (e) => {
        const value = e.target.value
        const textarea = document.getElementById(value);
        textarea.focus(); // Focus the textarea when the radio button is checked
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    }


    const getUsernameAndPropmt = () => {
        setLoader(true)
        axios.get("connect-instagram/")
            .then(response => {
                console.log(response)

                setUsername(response.data.username)
                if (response.data.username) {
                    setConnectText(response.data.username + ' √')
                }
                else {
                    setConnectText('Connect Instagram')
                }
                setIsPrompt(response.data.prompt)
                setCaptionPrompt(response.data.prompt)
                setLoader(false)
            }).catch(error => {

                console.log(error)
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


    const uplaodFile = async () => {
        // e.preventDefault()

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
            // alert(response.data.message)
            setOtherLoader(true)
            setOtherText('POSTED!')
            setTimeout(() => {
                setOtherText('')
                setOtherLoader(false)
            }, [2000])
        }).catch(error => {
            console.log(error)
            if (error.response.status === 400) {
                setErrors(error.response.data)
            }
            setLoader(false)
        })
    }
    return (
        <div className='p-4 instagram'>

            <div className='insta-button d-flex w-100 justify-content-between'>
                <div>

                <button className={' py-2 px-3 top-btn my-1' + (isInstagramConnect ? 'active-border' : '')} onClick={connectClick} onMouseEnter={connectButtonHover} onMouseLeave={connectButtonLeave}>{connectText}</button>
                <button className={' py-2 px-3 top-btn ms-md-4 my-1' + (isSetUpCaptionPrompt ? 'active-border' : '')} onClick={() => { setIsInstagramConnect(false); setIsSetUpCaptionPrompt(!isSetUpCaptionPrompt) }}>Set-up Caption Prompt{isPrompt ? ' √' : ''}</button>
                </div>

                <button className='logout-btn p-1  my-1' onClick={logout}><img src={logoutIcon} alt="" /></button>
            </div>

            {
                loader && <div className='d-flex  align-items-center justify-content-center' style={{ height: '90vh' }}>
                    <InstagramLoader text="WAIT" />
                </div>

            }

            {
                otherLoader && !loader && <div className='d-flex  align-items-center justify-content-center' style={{ height: '90vh' }}>
                    <InstagramLoader text={otherText} />
                </div>

            }

            {
                !loader && !otherLoader &&
                <div className='d-flex  align-items-center justify-content-center'  style={{minHeight:'80vh'}}>

                    {isInstagramConnect && <form className='m-3' onSubmit={connectAPI}>
                        <div class="">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name='username' value={connectData['username']} onChange={changeConnectData} className={'username' in errors ? 'form-control is-invalid' : 'form-control'} />

                            <div class="invalid-feedback">
                                {errors.username}
                            </div>
                        </div>

                        <div class="mt-5 mb-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name='password' value={connectData['password']} onChange={changeConnectData} className={'password' in errors ? 'form-control is-invalid' : 'form-control'} />

                            <div class="invalid-feedback">
                                {errors.password}
                            </div>
                        </div>



                        <button className='my-4 text-center p-2 w-100' type='submit'>Connect</button>



                    </form>}



                    {!isInstagramConnect && isSetUpCaptionPrompt && <form className='m-3 p-4' onSubmit={setCaptionPromptAPI}>
                        <div className="col-12 propmt-txt">
                            <p>ChatGPT will write 3 captions of the images uploaded based on this prompt. </p>
                        </div>
                        <div className="col-12 my-4">
                            <div>
                                <textarea name="prompt" id="" className={'w-100 p-3  form-control ' + (errors.prompt ? 'is-invalid' : '')} rows={8} style={{ resize: 'none', }} value={captionPrompt} onChange={(e) => { setCaptionPrompt(e.target.value) }}></textarea>
                                <div class="invalid-feedback">
                                    {errors.prompt}
                                </div>
                            </div>
                        </div>



                        <button className='my-4 text-center p-2 w-75' type='submit'>Set-up Prompt</button>



                    </form>}

                    {(username && !isInstagramConnect) && (isPrompt && !isSetUpCaptionPrompt) && (!generatedCaptions.length) && <form
                        className="w-50 d-flex align-items-center justify-content-center"
                        style={{ aspectRatio: '1/0.5', border: 'none' }}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    // onSubmit={uplaodFile}
                    >
                        <div className='text-center'>
                            <img src={addIcon} alt="" style={{ height: '150px', 'opacity': '0.8' }} />
                            {/* <p>Files Supported: CSV</p> */}
                            <p className=' mb-2 drag-drop-text mt-4'>Drag and drop</p>
                            <p className='font-2  opacity-75 or'>or <button className='file-btn' onClick={handleButtonClick} type='button'>choose file</button></p>
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                id="fileID"
                                className='upload-input form-control is-invalid'
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple={false}
                                value={fileSelected ? undefined : ''}
                            />
                            <div class="invalid-feedback w-100 text-center">
                                {errors && errors.file}
                            </div>

                        </div>


                    </form>
                    }


                    {generatedCaptions.length !== 0 &&

                        <div className='row mt-5 w-100'>

                            {generatedCaptions.map((data, index) => {
                                return <div className="col-md-4">
                                    <p className='caption-text' >Caption {index + 1}</p>
                                    <form className="catption-box p-4 mt-3 align-items-start" onSubmit={postApi}>
                                        <label className='edit-btn mb-4 edit-label' htmlFor={"radio-" + index}>Edit</label>
                                        <input name='caption-input' id={'radio-' + index} type="radio" value={"caption-" + index} className='d-none' onChange={focusTextarea} />
                                        <textarea name="caption" id={"caption-" + index} className='w-100 caption-textarea ' rows={10} style={{ resize: 'none' }} value={data} onChange={(e) => handleInputChange(e, index)} ></textarea>
                                        <div>

                                            <button className='post-btn py-2 px-5 mt-3' type='submit'>Post</button>
                                        </div>
                                    </form>
                                </div>
                            })}


                        </div>
                    }

                    {
                        (!username && !isInstagramConnect && !captionPrompt && !isSetUpCaptionPrompt) && <p className='guide-text text-center'>
                        Connect Insta and set-up prompt first
                    </p>
                        }
                            {
                                (!username && !isInstagramConnect) && 
                                <p className='guide-text text-center'>
                                    Connect Insta first
                                </p>
                            }
                            
                            {
                        (!captionPrompt && !isSetUpCaptionPrompt) && <p className='guide-text text-center'>
                        set-up prompt first
                    </p>
                        }
                        
                    


                </div>


            }











            <Modal
                show={isOTP}
                onHide={() => {
                    // setIsOTP(false)
                }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ zIndex: '10000000000000' }}>

                <Modal.Body style={{ maxHeight: "80vh", overflow: 'auto' }}>

                    <div className='p-3 h-100' >
                        <p className='text-center'>Enter OTP</p>




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
                        </div >

                        <div className="w-100 text-center mt-2">
                            <button type='button' className='btn btn-dark pt-2 pb-2 m-0 ms-3' onClick={sendOTP}>Next     </button>
                        </div>






                    </div >

                </Modal.Body >

            </Modal >
        </div >
    )
}
