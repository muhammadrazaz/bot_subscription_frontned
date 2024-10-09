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
import Project from '../Pages/Project/Project'
import ProjectDetail from "../Pages/ProjectDetail/ProjectDetail";
import OpenTask from "../Pages/OpenTasks/OpenTask";
import InstaLogin from '../Pages/InstagramLogin/Login'
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword'
import ResetPassword from "../Pages/ResetPassword/ResetPassword";

const Routes = () => {
  const { token, userDetail } = useAuth();

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


  const routesForAdminOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/earnings/:bot_id?",
          element: <Earning />,
        },
        {
          path: "/users/",
          element: <Users />,
        },
        {
          path: "/products/:bot_id?",
          element: <Product />,
        },
        {
          path: "/users/:bot_id?",
          element: <ClientDetail />,
        },
        {
          path: "/payment/",
          element: <Payment />,
        },
        {
          path: "/project/",
          element: <Project />,
        },
        {
          path: "/projects/detail/:project_id",
          element: <ProjectDetail />,
        },
        {
          path: "/open-tasks",
          element: <OpenTask />,
        },
      ],
    },
  ];

  const routesForVAOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        // {
        //   path: "/",
        //   element: <Dashboard />,
        // },
        {
          path: "/",
          element: <Users />,
        },
        {
          path: "/earnings/:bot_id?",
          element: <Earning />,
        },
        
        {
          path: "/users/:bot_id?",
          element: <ClientDetail />,
        },
        // {
        //   path: "/payment/",
        //   element: <Payment />,
        // },
        {
          path: "/project/",
          element: <Project />,
        },
        {
          path: "/projects/detail/:project_id",
          element: <ProjectDetail />,
        },
        {
          path: "/open-tasks",
          element: <OpenTask />,
        },
      ],
    },
  ];


  const routesForSubscriptionOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/earnings/:bot_id?",
          element: <Earning />,
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
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/earnings/:bot_id?",
          element: <Earning />,
        },
        {
          path: "/products/:bot_id?",
          element: <Product />,
        },
        {
          path: "/products/upload-csv?",
          element: <ProductCSV />,
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
          element: <PDFDashboard />,
        },
        {
          path: '/pdf/history:user_id?',
          element: <PDFHistory />
        }


      ],
    },
  ];

  // const routesForPDFandAdminOnly = [
  //   {

  //     element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
  //     children: [


  //       {
  //         path:'/pdf/history/:user_id?',
  //         element : <PDFHistory/>
  //       }


  //     ],
  //   },
  // ];



  const routesForInstagramOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [

        {
          path: "/",
          element: <Instagram />,
        },



      ],
    },
  ];

  // const routesForInstagramandAdminOnly = [
  //   {

  //     element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
  //     children: [


  //       {
  //         path: '/instagram/history/:user_id?',
  //         element: <PostHistory />
  //       }


  //     ],
  //   },
  // ];


  const routesForDeveloper = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [

        {
          path: "/",
          element: <Project />,
        },

        {
          path: "/projects/detail/:project_id",
          element: <ProjectDetail />,
        },
        {
          path: "/open-tasks",
          element: <OpenTask />,
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

    {
      path: "/insta-login",
      element: <InstaLogin />
    },

    {
      path: "/forgot-password",
      element: <ForgotPassword />
    },

    {
      path: "/reset-password/:uid/:token",
      element: <ResetPassword />
    },


  ];


  const router = createBrowserRouter([
    // ...routesForPublic,
    ...((!token || !userDetail) ? routesForNotAuthenticatedOnly : []),
    ...(token && userDetail && userDetail['role'] == 'admin' ? routesForAdminOnly : []),
    ...(token && userDetail && userDetail['role'] == 'VA' ? routesForVAOnly : []),
    ...(token && userDetail && (userDetail['role'] === 'subscription') ? routesForSubscriptionOnly : []),
    ...(token && userDetail && ( userDetail['role'] === 'developer') ? routesForDeveloper : []),
    ...(token && userDetail && userDetail['role'] === 'product' ? routesForProductOnly : []),
    ...(token && userDetail && userDetail['role'] === 'pdf' ? routesForPDFOnly : []),
    ...(token && userDetail && userDetail['role'] === 'instagram' ? routesForInstagramOnly : []),
    // ...(token? routesForAllAuth:[]),
    
    // ...(token && userDetail && (userDetail['role']==='admin' || userDetail['role'] === 'product')? routesForProductAndAdminOnly:[]),
    // ...(token && userDetail && (userDetail['role']==='admin' || userDetail['role'] === 'pdf')? routesForPDFandAdminOnly:[]),
    // ...(token && userDetail && (userDetail['role'] === 'admin' || userDetail['role'] === 'instagram') ? routesForInstagramandAdminOnly : []),
    
    
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;