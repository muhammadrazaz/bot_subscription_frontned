import React, { useState } from 'react'
import InstagramLoader from '../../Components/InstagramLoader/InstagramLoader'
import axios from '../../Api/axios'
export default function ForgotPassword() {
    const [loader, setLoader] = useState(false)
    const [otherLoader, setOtherLoader] = useState(false)
    const [otherText, setOtherText] = useState('')
    const [forgotPassword, setForgotPassword] = useState({})
    const [errors, setErrors] = useState({})

  
    const changeForgotPasswordData = (e) => {
        const { name, value } = e.target

        setForgotPassword(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const forgotPasswordApi = (e) => {
        e.preventDefault()
        setLoader(true)
        axios.post('forgot-password/', forgotPassword)
            .then(response => {
                console.log(response)
                setOtherText(response.data.message)
                setLoader(false)
                setOtherLoader(true)
            }).catch(error => {
                console.log(error)
                if (error.response.status === 400) {
                    setErrors(error.response.data)
                }
                setLoader(false)
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center instagram">
            {
                loader && <InstagramLoader text="WAIT..." />
            }
            {
                !loader && otherLoader && <InstagramLoader text={otherText} />
            }

            {
                !loader && !otherLoader && <form onSubmit={forgotPasswordApi} className='m-3'>
                    <div class="">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name='email' value={forgotPassword['email']} onChange={changeForgotPasswordData} className={'email' in errors ? 'form-control is-invalid' : 'form-control'} />

                        <div class="invalid-feedback">
                            {errors.email}
                        </div>
                    </div>

                    <button className='my-4 text-center p-2 w-100'>Forgot</button>

                </form>
            }

        </div>
    )
}
