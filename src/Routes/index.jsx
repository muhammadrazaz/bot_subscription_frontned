import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Earning from '../Pages/Earning/Earning'
import Users from '../Pages/Users/Users'
import ClientDetail from "../Pages/ClinetDetail/ClientDetail";
import Product from "../Pages/Product/Product";
import ProductCSV from "../Pages/Product/ProductCSV";
import PDFHistory from "../Pages/PDFHistory/PDFHistory";
import { useEffect } from "react";
import PDFDashboard from "../Pages/PDFDashboard/PDFDashboard";
import Instagram from "../Pages/Instagram/Instagram";
import PostHistory from "../Pages/PostHistory/PostHistory";
import Payment from "../Pages/Payment/Payment";
import Project from  '../Pages/Project/Project'
const Routes = () => {
  const { token,userDetail } = useAuth();

  // Define public routes accessible to all users
  // const routesForPublic = [
  //   {
  //     path: "/service",
  //     element: <div>Service Page</div>,
  //   },
  //   {
  //     path: "/about-us",
  //     element: <div>About Us</div>,
  //   },
  // ];

  // Define routes accessible only to authenticated users
  // const routesForAllAuth =[
  //   {
  //     path: "/",
  //     element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
  //     children: [
  //       {
  //         path: "/",
  //         element: <Dashboard/>,
  //       },
        
  //     ],
  //   },
  // ];
  const routesForSubscriptionAndAdminOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Dashboard/>,
        },
        {
          path: "/earnings/:user_id?",
          element: <Earning/>,
        },
        
        
      ],
    },
  ];

  const routesForProductAndAdminOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Dashboard/>,
        },
        {
          path: "/earnings/:user_id?",
          element: <Earning/>,
        },
        
      ],
    },
  ];


  const routesForProductOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        
        {
          path: "/products/:user_id?",
          element: <Product/>,
        },
        {
          path: "/products/upload-csv?",
          element: <ProductCSV/>,
        },
        
        
        
       
      ],
    },
  ];

  const routesForPDFOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        
        {
          path: "/",
          element: <PDFDashboard/>,
        },
        {
          path:'/pdf/history',
          element : <PDFHistory/>
        }
        
       
      ],
    },
  ];

  const routesForPDFandAdminOnly = [
    {
      
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        
       
        {
          path:'/pdf/history/:user_id?',
          element : <PDFHistory/>
        }
        
       
      ],
    },
  ];

  const routesForAdminOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/users/",
          element: <Users/>,
        },
        {
          path: "/users/:user_id?",
          element: <ClientDetail/>,
        },
        {
          path: "/payment/",
          element: <Payment/>,
        },
      ],
    },
  ];

  const routesForInstagramOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        
        {
          path: "/",
          element: <Instagram/>,
        },
       
        
       
      ],
    },
  ];

  const routesForInstagramandAdminOnly = [
    {
      
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        
       
        {
          path:'/instagram/history/:user_id?',
          element : <PostHistory/>
        }
        
       
      ],
    },
  ];


  const routesForDeveloperAndVAAndAdmin =[
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        
        {
          path: "/projects",
          element: <Project/>,
        },
       
        
       
      ],
    },
  ];
  

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Login />
    },
   
  ];


 
  const router = createBrowserRouter([
    // ...routesForPublic,
    ...((!token || !userDetail) ? routesForNotAuthenticatedOnly : []),
    // ...(token? routesForAllAuth:[]),
    ...(token && userDetail &&(userDetail['role'] === 'admin' || userDetail['role']==='subscription')?routesForSubscriptionAndAdminOnly:[]),
    ...(token && userDetail && (userDetail['role']==='admin' || userDetail['role'] === 'product')? routesForProductAndAdminOnly:[]),
    ...(token && userDetail && (userDetail['role']==='admin' || userDetail['role'] === 'pdf')? routesForPDFandAdminOnly:[]),
    ...(token && userDetail && (userDetail['role']==='admin' || userDetail['role'] === 'instagram')? routesForInstagramandAdminOnly:[]),
    // ...(token && userDetail &&(userDetail['role'] === 'admin' || userDetail['role']==='developer')?routesForDeveloperAndVAAndAdmin:[]),
    ...(token && userDetail &&  userDetail['role'] === 'product'? routesForProductOnly:[]),
    ...(token && userDetail &&  userDetail['role'] === 'pdf'? routesForPDFOnly:[]),
    ...(token && userDetail &&  userDetail['role'] === 'instagram'? routesForInstagramOnly:[]),
    ...(token && userDetail && userDetail['role']=='admin' ? routesForAdminOnly : []),
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;