import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import DownloadButton from '../../Components/DownloadButton/DownloadButton'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import Loader from '../../Components/Loader/Loader'
import { Link } from 'react-router-dom'
export default function Product() {
    const { user_id } = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [productData, setProductData] = useState({})
    const [editProductData, setEditProductData] = useState({})
    const [userProfile, setUserProfile] = useState()
    const [errors, setErrors] = useState({})
    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState(null);
    const sampleCSV = {
        columns: [
            {

                label: 'Variant SKU',
                

            },
            {

                label: 'Vendor',
                

            },
            {
                label: 'Title',
                

            },
            {
                label: 'Variant Price',
                

            },
            {
                label: 'Image Src',
                
            },
            {
                label: 'Product Category',
                

            },
            {
                label: 'Type',
                

            },
            {
                label: 'Body (HTML)',
                

            },
            {
                label: 'Option1 Name',
                

            },
            {
                label: 'Option1 Value',
                

            },
            {
                label: 'Option2 Name',
                

            },
            {
                label: 'Option2 Value',
                

            },
            {
                label: 'Option3 Name',
                

            },
            {
                label: 'Option3 Value',
                

            },
            



        ]
    }
    const [tableData, setTableData] = useState({
        columns: [
            {

                label: 'Product ID',
                field: 'product_id',

            },
            {

                label: 'Product Name',
                field: 'product_name',

            },
            {
                label: 'Thumbnail',
                field: 'thumbnail',

            },
            {
                label: 'Price',
                field: 'price',

            },
            {
                label: 'Product Img',
                field: 'product_img'
            },
            {
                label: 'Product Category',
                field: 'product_category',

            },
            {
                label: 'Sub Category',
                field: 'sub_category',

            },
            {
                label: 'Description',
                field: 'description',

            },
            {
                label: 'Edit',
                field: 'action',

            },

        ]
    })


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "text/csv") {
            setFile(selectedFile);
        } else {
            alert("Please upload a valid CSV file.");
        }
    };




    useEffect(() => {
        productApi()
    }, [])





    const handleAddChange = (e) => {
        const { name, value } = e.target

        if (name === "thumbnail" || name === "product_img") {
            const selectedFile = e.target.files[0]

            setProductData(prevState => ({
                ...prevState,
                [name]: selectedFile
            }))
        }
        else {
            setProductData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }

    }


    const handleEditChange = (e) => {
        const { name, value } = e.target


        if (name === "thumbnail" || name === "product_img") {
            const selectedFile = e.target.files[0]

            setEditProductData(prevState => ({
                ...prevState,
                [name]: selectedFile
            }))
        }
        else {
            setEditProductData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }
    function isFile(input) {
        return input instanceof File;
    }

    const addProductApi = (e) => {
        e.preventDefault()
        
        // return
        setLoader(true)
        const formData = new FormData();
        formData.append('product_id', productData.product_id?productData.product_id:'')
        formData.append('product_name', productData.product_name?productData.product_name:'')
        formData.append('brand', productData.brand?productData.brand:'')
        if(isFile(productData.thumbnail)){

            formData.append('thumbnail', productData.thumbnail)
        }
        formData.append('price', productData.price)
        if(isFile(productData.product_img)){

            formData.append('product_img', productData.product_img)
        }
        formData.append('product_category', productData.product_category?productData.product_category:'')
        formData.append('sub_category', productData.sub_category?productData.sub_category:'')
        formData.append('description', productData.description?productData.description:'')
        
        console.log(formData)
        // return 
        axios.post('products/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data)
                setIsAdd(false)
                setProductData({})
                setErrors({})
                setLoader(false)
            }).catch(error => {
                console.log(error)
                if (error.response.status === 400) {
                    setErrors(error.response.data)
                }

                setLoader(false)
            })
    }

    const productApi = async () => {
        setLoader(true)
        await axios.get("/products/", {
            params: {

                user_id: user_id
            }
        })
            .then(response => {
                const data = response.data

                for (var i = 0; i < data.length; i++) {
                    data[i]['action'] = <button value={i} onClick={(e) => { setIsEdit(true); setEditProductData(data[e.target.value]) }} style={{ backgroundColor: 'transparent', border: 'none' }}>Edit</button>

                }

                setTableData(prevState => ({
                    ...prevState,
                    rows: data
                }))
                setLoader(false)
            }).catch(error => {
                console.log(error)
                setLoader(false)

            })


    }
    function isFile(input) {
        return input instanceof File;
    }
    const updateProductApi = async (e) => {
        e.preventDefault()

        setLoader(true)


        const formData = new FormData();
        formData.append('product_id', editProductData.product_id)
        if (isFile(editProductData.thumbnail)) {

            formData.append('thumbnail', editProductData.thumbnail)
        }
        if (isFile(editProductData.product_img)) {
            formData.append('product_img', editProductData.product_img)
        }
        formData.append('price', editProductData.price)

        formData.append('product_category', editProductData.product_category)
        formData.append('sub_category', editProductData.sub_category)
        formData.append('description', editProductData.description)

        await axios.patch('/products/' + editProductData.id + '/', formData)
            .then(response => {
                console.log(response)
                setIsEdit(false)
                setErrors({})
                productApi()
                setLoader(false)
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
        <BasePage title="Products">
            {loader && <Loader />}

            <div className="row">
               
                <div className="col-sm-9">
                    <div className='h-100'>
                        <DownloadButton data={sampleCSV} filename="sampleCSV.csv" title="Download Sample CSV" />

                        <button className='btn btn-dark pt-2 pb-2 m-0 h-100 ms-3' onClick={() => { setIsAdd(true) }}>Add New</button>
                    </div>
                </div>
                <div className="col-sm-3 text-end">
                    <Link to='upload-csv' className='btn btn-dark pt-2 pb-2 m-0 h-100 me-3'>Upload CSV </Link>
                    <DownloadButton data={tableData} filename="SubscriptionReport.csv" />

                </div>

                <div className='desktop' style={{ height: '95%' }}>
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
                        <p className='text-center font-2 semi-bold'>Add New Product</p>

                        <form onSubmit={addProductApi} className='p-2'>
                            <div className="w-100 p-2">

                                <input type="text" name="product_id" placeholder="Product ID" value={productData['product_id']} onChange={handleAddChange} className={'form-control input-field m-0 ' + (errors.product_id ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.product_id}
                                </div>
                            </div>

                            <div className="w-100 p-2">

                                <input type="text" name="product_name" placeholder="Product Name" value={productData['product_name']} onChange={handleAddChange} className={'form-control input-field m-0 ' + (errors.product_name ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.product_name}
                                </div>
                            </div>

                            <div className="w-100 p-2">

                                <input type="text" name="brand" placeholder="Brand Name" value={productData['brand']} onChange={handleAddChange} className={'form-control input-field m-0 ' + (errors.brand ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.brand}
                                </div>
                            </div>

                            <div className="w-100 p-2">
                                <label htmlFor="" className='mb-2 macan-regular'>Thumbnail</label>
                                <input type="file" name="thumbnail" placeholder="Thumbnail" onChange={handleAddChange} className={'form-control input-field m-0 ' + (errors.thumbnail ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.thumbnail}
                                </div>
                            </div>
                            <div className="w-100 p-2">
                                <input type="number" name="price" placeholder="Price" value={productData['price']} onChange={handleAddChange} className={'form-control input-field m-0 ' + (errors.price ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.price}
                                </div>
                            </div>
                            <div className="w-100 p-2">
                                <label htmlFor="" className='mb-2 macan-regular'>Product Image</label>
                                <input type="file" name="product_img" placeholder="Product Img" onChange={handleAddChange} className={'form-control input-field m-0 ' + (errors.product_img ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.product_img}
                                </div>
                            </div>
                            <div className="w-100 p-2">
                                <input type="text" name="product_category" placeholder="Product Category" value={productData['product_category']} onChange={handleAddChange} className={'form-control input-field m-0 ' + (errors.product_category ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.product_category}
                                </div>
                            </div>
                            <div className="w-100 p-2">
                                <input type="text" name="sub_category" placeholder="Sub Category" value={productData['sub_category']} onChange={handleAddChange} className={'form-control input-field m-0 ' + (errors.sub_category ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.sub_category}
                                </div>
                            </div>
                            <div className="w-100 p-2">
                                <input type="text" name="description" placeholder="Description" value={productData['description']} onChange={handleAddChange} className={'form-control input-field m-0 ' + (errors.description ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.description}
                                </div>
                            </div>

                            <div className="w-100 text-center mt-2">
                                <button type='submit' className='btn btn-dark pt-2 pb-2 m-0 ms-3'>Save</button>
                            </div>
                        </form>





                    </div>







                </Modal.Body>

            </Modal>
            <Modal
                show={isEdit}
                onHide={() => { setIsEdit(false) }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            >

                <Modal.Body style={{ maxHeight: "80vh", overflow: 'auto' }}>

                    <div className='p-3 h-100' >
                        <p className='text-center font-2 macan-semibold'>Update Product</p>

                        <form onSubmit={updateProductApi} className='p-2'>
                            <div className="w-100 p-2">

                                <input type="text" name="product_id" placeholder="Product ID" value={editProductData['product_id']} onChange={handleEditChange} className={'form-control input-field m-0 ' + (errors.product_id ? 'is-invalid' : '')}/>
                                <div class="invalid-feedback">
                                    {errors.product_id}
                                </div>
                            </div>
                            <div className="w-100 p-2">

                                <input type="text" name="product_name" placeholder="Product Name" value={editProductData['product_name']} onChange={handleEditChange} className={'form-control input-field m-0 ' + (errors.product_name ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.product_name}
                                </div>
                            </div>

                            <div className="w-100 p-2">
                                <label htmlFor="" className='mb-2 macan-regular'>Thumbnail</label>
                                <input type="file" name="thumbnail" placeholder="Thumbnail" onChange={handleEditChange} className={'form-control input-field m-0 ' + (errors.thumbnail ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.thumbnail}
                                </div>
                            </div>
                            <div className="w-100 p-2">
                                <input type="number" name="price" placeholder="Price" value={editProductData['price']} onChange={handleEditChange} className={'form-control input-field m-0 ' + (errors.price ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.price}
                                </div>
                            </div>
                            <div className="w-100 p-2">
                                <label htmlFor="" className='mb-2 macan-regular'>Product Image</label>
                                <input type="file" name="product_img" placeholder="Product Img" onChange={handleEditChange} className={'form-control input-field m-0 ' + (errors.price ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.product_img}
                                </div>
                            </div>
                            <div className="w-100 p-2">
                                <input type="text" name="product_category" placeholder="Product Category" value={editProductData['product_category']} onChange={handleEditChange} className={'form-control input-field m-0 ' + (errors.product_category ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.product_category}
                                </div>
                            </div>
                            <div className="w-100 p-2">
                                <input type="text" name="sub_category" placeholder="Sub Category" value={editProductData['sub_category']} onChange={handleEditChange} className={'form-control input-field m-0 ' + (errors.sub_category ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.sub_category}
                                </div>
                            </div>
                            <div className="w-100 p-2">
                                <input type="text" name="description" placeholder="Description" value={editProductData['description']} onChange={handleEditChange} className={'form-control input-field m-0 ' + (errors.description ? 'is-invalid' : '')} />
                                <div class="invalid-feedback">
                                    {errors.description}
                                </div>
                            </div>

                            <div className="w-100 text-center mt-2">
                                <button type='submit' className='btn btn-dark pt-2 pb-2 m-0 ms-3 font-1 macan-bold'>Save</button>
                            </div>
                        </form>




                    </div>







                </Modal.Body>

            </Modal>


        </BasePage>
    )
}
