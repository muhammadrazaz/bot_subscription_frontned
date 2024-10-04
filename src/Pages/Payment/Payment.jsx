import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import Loader from '../../Components/Loader/Loader'
import CustomDatePicker from '../../Components/CustomDatePicker/CustomDatePicker'
import DownloadButton from '../../Components/DownloadButton/DownloadButton'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import { Modal } from 'react-bootstrap'
// import axios from 'axios'
import axios from '../../Api/axios'
import { subDays } from 'date-fns'


export default function Payment() {
  const [loader, setLoader] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
  const [paymentData, setPaymentData] = useState({})
  const [errors, setErrors] = useState({})
  const [tableData, setTableData] = useState({
    columns: [
      {
        label: 'Invoice ID',
        field: 'invoice_id',

      },
      {
        label: 'Client Name',
        field: 'client_name',

      },
      {
        label: 'Client Email',
        field: 'client_email',

      },
      {
        label: 'Address',
        field: 'address'
      },
      {
        label: 'Amount',
        field: 'amount'
      },
      {
        label: 'MISC Details',
        field: 'misc_details'
      },
      {
        label: 'Payment Status',
        field: 'payment_status'
      },
      {
        label: 'Description',
        field: 'description'
      },
      {
        label: 'Date Time',
        field: 'date_time'
      },

    ]
  })


  useEffect(()=>{
    getPaymentApi()
  },[])



  const handlePaymentData = (e) => {
    const { name, value } = e.target
    setPaymentData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const getPaymentApi = (e) =>{
    setLoader(true)
    axios.get('payment/')
      .then(response => {
        console.log(response)
        setTableData(prevState =>({
          ...prevState,
          rows : response.data
        }))
        setLoader(false)
      }).catch(error => {
        console.log(error)
        if (error.response.status === 400) {
          setErrors(error.response.data)
        }
        setLoader(false)
      })
  }

  const addPaymentApi = async (e) => {
    e.preventDefault()
    setLoader(true)
    await axios.post('payment/', paymentData)
      .then(response => {
        console.log(response)
        alert(response.data.url)
        setPaymentData({})
        setErrors({})
        setIsAdd(false)
        setLoader(false)
      }).catch(error => {
        console.log(error)
        if (error.response.status === 400) {
          setErrors(error.response.data)
        }
        setLoader(false)
      })
  }
  return (
    <BasePage title="Payments">
      {loader && <Loader />}
      <div className="row">
        <div className="col-md-2 my-1">
          <CustomDatePicker dates={dates} setDates={setDates} />
        </div>
        <div className="col-md-6 my-1">
          <button className='btn btn-dark pt-2 pb-2 m-0 h-100 ms-md-3' onClick={() => { setIsAdd(true) }}>Add New</button>
        </div>
        <div className="col-md-4 text-end my-1">


          <DownloadButton data={tableData} filename="PaymentReport.csv" />

        </div>

        <div style={{ height: '95%' }}>
          <TableWithPagination data={tableData} />
        </div>
      </div>

      <Modal
        show={isAdd}
        onHide={() => { setIsAdd(false) }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >

        <Modal.Body style={{ maxHeight: "80vh", overflow: 'auto' }}>

          <div className='p-3 h-100' >
            <p className='text-center font-1 macan-bold'>Add New Payment</p>

            <form onSubmit={addPaymentApi} className='p-2'>
              <div className="w-100 p-2">

                <input type="text" name="client_name" placeholder="Client Name" value={paymentData['client_name']} onChange={handlePaymentData} className={'form-control input-field m-0 ' + (errors.client_name ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.client_name}
                </div>
              </div>

              <div className="w-100 p-2">

                <input type="email" name="client_email" placeholder="Client Email" value={paymentData['client_email']} onChange={handlePaymentData} className={'form-control input-field m-0 ' + (errors.client_email ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.client_email}
                </div>
              </div>

              <div className="w-100 p-2">

                <input type="text" name="address" placeholder="Address" value={paymentData['address']} onChange={handlePaymentData} className={'form-control input-field m-0 ' + (errors.address ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.address}
                </div>
              </div>


              <div className="w-100 p-2">
                <input type="text" name="description" placeholder="Description" value={paymentData['description']} onChange={handlePaymentData} className={'form-control input-field m-0 ' + (errors.description ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.description}
                </div>
              </div>

              <div className="w-100 p-2">
                <input type="number" name="amount" placeholder="Amount" value={paymentData['amount']} onChange={handlePaymentData} className={'form-control input-field m-0 ' + (errors.amount ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.amount}
                </div>
              </div>
              <div className="w-100 p-2">
                <input type="text" name="misc_details" placeholder="Misc Details" value={paymentData['misc_details']} onChange={handlePaymentData} className={'form-control input-field m-0 ' + (errors.misc_details ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.misc_details}
                </div>
              </div>


              <div className="w-100 text-center mt-2">
                <button type='submit' className='btn btn-dark pt-2 pb-2 m-0 ms-3 font-2 macan-bold'>Save</button>
              </div>
            </form>





          </div>







        </Modal.Body>

      </Modal>


    </BasePage>
  )
}

