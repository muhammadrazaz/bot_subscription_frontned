import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import Loader from '../../Components/Loader/Loader'

import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import { Modal } from 'react-bootstrap'
import { subDays } from 'date-fns'
import axios from '../../Api/axios'
export default function Developer() {
    const [loader, setLoader] = useState(false)
    const [isAdd, setIsAdd] = useState()
    const [errors, setErrors] = useState({})
    // const [developers, setDevelopers] = useState([])
    const [signUpData, setSignUpData] = useState({})
    const [tableData, setTableData] = useState({
        columns: [
            {
                label: 'Username',
                field: 'username',

            },
            {
                label: 'First Name',
                field: 'first_name',

            },
            {
                label: 'last_name',
                field: 'last_name',

            },
            {
                label: 'email',
                field: 'email'
            },
            



        ]
    })



    useEffect(() => {
        getDeveloperApi()
    }, [])


    const changeSignUpData = (e) => {
        const { name, value } = e.target

        setSignUpData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    

   
    const getDeveloperApi = () => {
        setLoader(true)

        axios.get('developers')
            .then(response => {
                console.log(response)

                setTableData(prevState=>({
                    ...prevState,
                    'rows' : response.data
                }))
                setLoader(false)
            }).catch(error => {
                console.log(error)
                setLoader(false)
            })
    }



    const RegisterApi = async (e) => {
        e.preventDefault()
        setLoader(true)
        var data = signUpData
        data['type'] = 'developer'
        await axios.post('register/', data)
            .then(response => {
                setSignUpData({})
                setLoader(false)
                alert("Registered successfully.")
                setIsAdd(false)
                getDeveloperApi()
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
        <BasePage title='Developers'>
            {loader && <Loader />}

            <div className="row">

                <div className="col-md-6 my-1">

                    <button className='btn btn-dark pt-2 pb-2 m-0 h-100' onClick={() => { setIsAdd(true) }}>Add New</button>

                </div>
                <div className="col-md-4 my-1 text-end">



                </div>

                <div style={{ height: '95%' }}>
                    <TableWithPagination data={tableData} />
                </div>
            </div>
            <Modal
                show={isAdd}
                onHide={() => { setIsAdd(false); }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            >

                <Modal.Body style={{ maxHeight: "80vh", overflow: 'auto' }}>

                    <div className='p-3 h-100' >
                        <p className='text-center font-2 macan-bold'>Add New Developer</p>

                        <form onSubmit={RegisterApi} class="m-0 p-0">
                            
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

                            

                            





                            <button type="submit" class="custom-btn font-2 macan-regular text-white" >Save</button>

                        </form>





                    </div>


                </Modal.Body>

            </Modal>
        </BasePage>
    )
}
