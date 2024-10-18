import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InstagramLoader from '../../Components/InstagramLoader/InstagramLoader'
import axios from '../../Api/axios'
export default function SignUp() {
    const [signUpData, setSignUpData] = useState({})
    const [errors, setErrors] = useState({})
    const [loader,setLoader] = useState(false)
    const [otherLoader,setOtherLoader] = useState(false)
    const [otherText,setOtherText] = useState('')
    
  
  
    const changeSignUpData = (e) => {
        const {name,value} = e.target
        
        setSignUpData(prevState =>({
            ...prevState,
            [name] : value
        }))
    }

    const RegisterApi = async (e) => {
      e.preventDefault()
      setLoader(true)
      await axios.post('register/', signUpData)
          .then(response => {
              setSignUpData({})
              setLoader(false)
              setOtherLoader(true)
              setOtherText("Registered successfully please sign in.")
              setTimeout(()=>{
                setOtherText()
                setOtherLoader(false)
              },1000)
              // console.log(response)
          }).catch(error => {
              console.log(error)
              if (error.response.status === 400) {
                  setErrors(error.response.data)
              }
              else {
                  setErrors({})
              }
              setLoader(false)
          })


  }
  return (
    <div className="d-flex justify-content-center align-items-center instagram">
      {loader && <InstagramLoader text="Wait..."/>}
      {otherLoader && <InstagramLoader text={otherText}/>}
      {
        !loader && !otherLoader && <form  className='m-3' onSubmit={RegisterApi}>
        <div class="">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name='username' value={signUpData['username']} onChange={changeSignUpData} className={'username' in errors ? 'form-control is-invalid' : 'form-control'} />

          <div class="invalid-feedback">
            {errors.username}
          </div>
        </div>

        <div class="mt-5 mb-2">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name='password' value={signUpData['password']} onChange={changeSignUpData} className={'password' in errors ? 'form-control is-invalid' : 'form-control'} />

          <div class="invalid-feedback">
            {errors.password}
          </div>
        </div>

      

        <button className='my-4 text-center p-2 w-100'>Create</button>

    
        <Link to={'/'} className='forgot-password align-self-start'>or sign in</Link><br />

      </form>
      }
      
    </div>
  )
}
