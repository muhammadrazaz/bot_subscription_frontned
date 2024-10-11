import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from '../../Api/axios'
import { useAuth } from '../../Provider/AuthProvider'
import InstagramLoader from '../../Components/InstagramLoader/InstagramLoader'
export default function Login() {
  const { token, setToken } = useAuth()

  const [signInData, setSignInData] = useState({})
  const [errors, setErrors] = useState({})
  const [loader, setLoader] = useState(false)


  const changeSignInData = (e) => {
    const { name, value } = e.target
    setSignInData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const LoginApi = (e) => {
    e.preventDefault()

    setLoader(true)
    axios.post("token/", signInData).then(response => {
      // console.log(response)
      setErrors({})
      setToken(response.data.access)
      // setLoader(false)
    }).catch(error => {
      console.log(error)
      if (error.response.status === 400) {
        setErrors(error.response.data)
      }
      else if (error.response.status === 401) {

        setErrors({ 'password': error.response.data['detail'] })
      }
      else {
        setErrors({})
      }
      setLoader(false)
    })
  }

  return (
    <div className="d-flex justify-content-center align-items-center instagram">
      {
        loader && <InstagramLoader/>
      }
      {
        !loader && <form className='m-3' onSubmit={LoginApi}>
          <div class="">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name='username' value={signInData['username']} onChange={changeSignInData} className={'username' in errors ? 'form-control is-invalid' : 'form-control'} />

            <div class="invalid-feedback">
              {errors.username}
            </div>
          </div>

          <div class="mt-5 mb-2">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='password' value={signInData['password']} onChange={changeSignInData} className={'password' in errors ? 'form-control is-invalid' : 'form-control'} />

            <div class="invalid-feedback">
              {errors.password}
            </div>
          </div>

          {/* <Link to={'/forgot-password'} className='forgot-password'>Forgot Password</Link><br /> */}

          <button className='my-4 text-center p-2 w-100' type='submit'>Login</button>

          {/* <Link to={'/'} className='forgot-password'>or create account</Link><br /> */}


        </form>
      }

    </div>
  )
}
