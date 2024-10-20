import React, { useState, useEffect } from 'react'
import './Login.css'
import { useAuth } from '../../Provider/AuthProvider'
import Loader from '../../Components/Loader/Loader'
// import axios from 'axios'
import axios from '../../Api/axios'

export default function Login() {
    const { setToken, token, loader, setLoader } = useAuth()
    const [signInData, setSignInData] = useState({})
    const [signUpData, setSignUpData] = useState({})
    const [errors, setErrors] = useState({})
    // const [loader, setLoader] = useState(false)






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

    const RegisterApi = async (e) => {
        e.preventDefault()
        setLoader(true)
        await axios.post('register/', signUpData)
            .then(response => {
                setSignUpData({})
                setLoader(false)
                alert("Registered successfully please sign in.")
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


    const changeToSignUp = () => {
        const container = document.querySelector(".custom-container");
        const leftPanel = document.querySelector(".left-panel");
        const rightPanel = document.querySelector(".right-panel");
        const signUpForm = document.querySelector(".sign-up-form")
        
        container.classList.add("sign-up-mode");
        setTimeout(() => {
            
            leftPanel.classList.add("d-none")
            rightPanel.classList.remove("d-none")
            signUpForm.classList.remove('d-none')
            
        }, 1000);


        setErrors({})

    }

    const ChangeToSignIn = () => {
        const leftPanel = document.querySelector(".left-panel");
        leftPanel.classList.remove("d-none")
        const rightPanel = document.querySelector(".right-panel");
        
        const signUpForm = document.querySelector(".sign-up-form")
        // setTimeout(()=>{

            const container = document.querySelector(".custom-container");
            container.classList.remove("sign-up-mode");

            signUpForm.classList.add("d-none")
            setTimeout(()=>{
                rightPanel.classList.add("d-none")
            },[1000])
        // },[10])
        setErrors({})
    }

    const changeSignInData = (e) => {
        const { name, value } = e.target

        setSignInData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const changeSignUpData = (e) => {
        const { name, value } = e.target

        setSignUpData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    return (

        <div class="custom-container">
            {loader && <Loader />}

            <div className="row" style={{ minHeight: '100vh' }}>
                <div className="col-md-6">
                    <div className='sign-up-col'>
                        <div class="panel left-panel">
                            <div class="content">
                                <h2 className='font-1 macan-semibold'>New here ?</h2>
                                <p className='font-2 macan-semibold'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                    ex ratione. Aliquid!
                                </p>
                                <button class="custom-btn transparent" id="sign-up-btn" onClick={changeToSignUp}>
                                    Sign up
                                </button>
                            </div>
                            <img src="img/log.svg" class="image" alt="" />
                        </div>
                        <form onSubmit={RegisterApi} class="sign-up-form d-none">
                            <h2 class="title">Sign up</h2>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" name="username" value={signUpData['username']} placeholder="Username" onChange={changeSignUpData} className={'username' in errors ? 'form-control is-invalid' : 'form-control'} />
                                <div></div>
                                <div class="invalid-feedback">
                                    {errors.password}
                                </div>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-envelope"></i>
                                <input type="email" name='email' value={signUpData['email']} placeholder="Email" onChange={changeSignUpData} className={'email' in errors ? 'form-control is-invalid' : 'form-control'} />
                                <div></div>
                                <div class="invalid-feedback">
                                    {errors.email}
                                </div>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" name='first_name' value={signUpData['first_name']} placeholder="First Name" onChange={changeSignUpData} className={'first_name' in errors ? 'form-control is-invalid' : 'form-control'} />
                                <div></div>
                                <div class="invalid-feedback">
                                    {errors.first_name}
                                </div>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" name='last_name' value={signUpData['last_name']} placeholder="Last Name" onChange={changeSignUpData} className={'last_name' in errors ? 'form-control is-invalid' : 'form-control'} />
                                <div></div>
                                <div class="invalid-feedback">
                                    {errors.last_name}
                                </div>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="password" name="password" value={signUpData['password']} placeholder="Password" onChange={changeSignUpData} className={'password' in errors ? 'form-control is-invalid' : 'form-control'} />
                                <div></div>
                                <div class="invalid-feedback">
                                    {errors.password}
                                </div>
                            </div>

                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="password" name="confirm_password" value={signUpData['confirm_password']} placeholder="Confirm Password" onChange={changeSignUpData} />
                            </div>

                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <select name="type" required className={'type' in errors ? 'form-control is-invalid' : 'form-control'} onChange={changeSignUpData}>
                                    <option >Select Type</option>
                                    <option value="subscription">Subscription</option>
                                    <option value="product">Product</option>
                                    <option value="pdf">PDF</option>
                                    <option value="instagram">Instagram</option>

                                </select>
                                <div></div>
                                <div class="invalid-feedback">
                                    {errors.type}
                                </div>
                            </div>

                            {
                                (signUpData.type === "subscription" || signUpData.type === "product") && <div class="input-field">
                                    <i class="fas fa-lock"></i>
                                    <input type="text" name="bot_father_token" value={signUpData['bot_father_token']} placeholder="Bot Token" onChange={changeSignUpData} className={'bot_father_token' in errors ? 'form-control is-invalid' : 'form-control'} />
                                    <div></div>
                                    <div class="invalid-feedback">
                                        {errors.bot_father_token}
                                    </div>
                                </div>
                            }





                            <button type="submit" class="custom-btn font-2 macan-regular text-white" >Sign up</button>

                        </form>
                    </div>


                </div>
                <div className="col-md-6">
                    <div class="panel right-panel d-none">
                        <div class="content">
                            <h3 className='font-1 macan-semibold'>One of us ?</h3>
                            <p className='font-2 macan-semibold'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button class="custom-btn transparent font-2 macan-regular" id="sign-in-btn" onClick={ChangeToSignIn}>
                                Sign in
                            </button>
                        </div>
                        <img src="img/register.svg" class="image" alt="" />
                    </div>
                    <form onSubmit={LoginApi} class="sign-in-form">
                        <h2 class="title font-1 macan-semibold">Sign in</h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" name="username" placeholder="Username" value={signInData['username']} onChange={changeSignInData} className={'username' in errors ? 'form-control is-invalid' : 'form-control'} />
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.username}
                            </div>
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" name="password" value={signInData['password']} placeholder="Password" onChange={changeSignInData} className={'password' in errors ? 'form-control is-invalid' : 'form-control'} />
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.password}
                            </div>
                        </div>
                        <input type="submit" value="Login" class="custom-btn  text-white font-2 macan-regular" />

                    </form>
                </div>
            </div>

            {/* <div class="forms-container">
                <div class="signin-signup">
                    <form onSubmit={LoginApi} class="sign-in-form">
                        <h2 class="title font-1 macan-semibold">Sign in</h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" name="username" placeholder="Username" value={signInData['username']} onChange={changeSignInData} className={'username' in errors ? 'form-control is-invalid' : 'form-control'} />
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.username}
                            </div>
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" name="password" value={signInData['password']} placeholder="Password" onChange={changeSignInData} className={'password' in errors ? 'form-control is-invalid' : 'form-control'} />
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.password}
                            </div>
                        </div>
                        <input type="submit" value="Login" class="custom-btn  text-white font-2 macan-regular" />

                    </form>
                    <form onSubmit={RegisterApi} class="sign-up-form">
                        <h2 class="title">Sign up</h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" name="username" value={signUpData['username']} placeholder="Username" onChange={changeSignUpData} className={'username' in errors ? 'form-control is-invalid' : 'form-control'} />
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.password}
                            </div>
                        </div>
                        <div class="input-field">
                            <i class="fas fa-envelope"></i>
                            <input type="email" name='email' value={signUpData['email']} placeholder="Email" onChange={changeSignUpData} className={'email' in errors ? 'form-control is-invalid' : 'form-control'} />
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.email}
                            </div>
                        </div>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" name='first_name' value={signUpData['first_name']} placeholder="First Name" onChange={changeSignUpData} className={'first_name' in errors ? 'form-control is-invalid' : 'form-control'} />
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.first_name}
                            </div>
                        </div>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" name='last_name' value={signUpData['last_name']} placeholder="Last Name" onChange={changeSignUpData} className={'last_name' in errors ? 'form-control is-invalid' : 'form-control'} />
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.last_name}
                            </div>
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" name="password" value={signUpData['password']} placeholder="Password" onChange={changeSignUpData} className={'password' in errors ? 'form-control is-invalid' : 'form-control'} />
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.password}
                            </div>
                        </div>

                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" name="confirm_password" value={signUpData['confirm_password']} placeholder="Confirm Password" onChange={changeSignUpData} />
                        </div>

                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <select name="type" required className={'type' in errors ? 'form-control is-invalid' : 'form-control'} onChange={changeSignUpData}>
                                <option >Select Type</option>
                                <option value="subscription">Subscription</option>
                                <option value="product">Product</option>
                                <option value="pdf">PDF</option>
                                <option value="instagram">Instagram</option>
                              
                            </select>
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.type}
                            </div>
                        </div>

                        {
                            (signUpData.type ===  "subscription" || signUpData.type === "product") && <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="text" name="bot_father_token" value={signUpData['bot_father_token']} placeholder="Bot ID" onChange={changeSignUpData} className={'bot_father_token' in errors ? 'form-control is-invalid' : 'form-control'} />
                            <div></div>
                            <div class="invalid-feedback">
                                {errors.bot_father_token}
                            </div>
                        </div>
                        }

                        

                        

                        <button type="submit" class="custom-btn font-2 macan-regular text-white" >Sign up</button>

                    </form>
                </div>
            </div>

            <div class="panels-container">
                <div class="panel left-panel">
                    <div class="content">
                        <h2 className='font-1 macan-semibold'>New here ?</h2>
                        <p className='font-2 macan-semibold'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <button class="custom-btn transparent" id="sign-up-btn" onClick={changeToSignUp}>
                            Sign up
                        </button>
                    </div>
                    <img src="img/log.svg" class="image" alt="" />
                </div>
                <div class="panel right-panel">
                    <div class="content">
                        <h3 className='font-1 macan-semibold'>One of us ?</h3>
                        <p className='font-2 macan-semibold'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                        </p>
                        <button class="custom-btn transparent font-2 macan-regular" id="sign-in-btn" onClick={ChangeToSignIn}>
                            Sign in
                        </button>
                    </div>
                    <img src="img/register.svg" class="image" alt="" />
                </div>
            </div> */}
        </div>
    )
}
