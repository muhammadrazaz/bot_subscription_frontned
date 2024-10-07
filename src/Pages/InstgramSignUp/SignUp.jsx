import React from 'react'

export default function SignUp() {
    const [signUpData, setSignUpData] = useState({})
    const [errors, setErrors] = useState({})
  
  
    const changeSignUpData = (e) => {
        const {name,value} = e.target
        
        setSignUpData(prevState =>({
            ...prevState,
            [name] : value
        }))
    }
  return (
    <div className="d-flex justify-content-center align-items-center instagram">
      <form action="" className='m-3'>
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

    


      </form>
    </div>
  )
}
