import React, { useState } from 'react'
import InstagramLoader from '../../Components/InstagramLoader/InstagramLoader'
import { useParams } from 'react-router-dom'
import axios from '../../Api/axios'
export default function ResetPassword() {
    const {uid,token} = useParams() 
    const [loader, setLoader] = useState(false)
    const [otherLoader, setOtherLoader] = useState(false)
    const [otherText, setOtherText] = useState('')
    const [resetPasswordData, setResetPasswordData] = useState({})
    const [errors, setErrors] = useState({})

    const changeResetPasswordData = (e) => {
        const { name, value } = e.target

        setResetPasswordData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const resetPasswordApi = (e) => {
        e.preventDefault()
        
        setLoader(true)
        axios.post('/reset-password/'+uid+'/'+token+'/', resetPasswordData)
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
                !loader && !otherLoader && <form onSubmit={resetPasswordApi} className='m-3'>
                    <div class="">
                        <label htmlFor="new_password">New Password</label>
                        <input type="password" id="new_password" name='new_password' value={resetPasswordData['new_password']} onChange={changeResetPasswordData} className={'new_password' in errors ? 'form-control is-invalid' : 'form-control'} />

                        <div class="invalid-feedback">
                            {errors.new_password}
                        </div>
                    </div>

                    <div class="mt-4">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" id="confirm_password" name='confirm_password' value={resetPasswordData['confirm_password']} onChange={changeResetPasswordData} className={'confirm_password' in errors ? 'form-control is-invalid' : 'form-control'} />

                        <div class="invalid-feedback">
                            {errors.confirm_password}
                        </div>
                    </div>

                    <button className='my-4 text-center p-2 w-100'>Reset</button>

                </form>
            }

        </div>
  )
}
