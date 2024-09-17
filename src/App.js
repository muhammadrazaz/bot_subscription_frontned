import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import { BrowserRouter, Routes, Route } from "react-router-dom";


import AuthProvider from './Provider/AuthProvider';
import Routes from './Routes/index';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  
    // <BrowserRouter>
    // <Routes>
    //   <Route path="/" element={<Login/>}/>
    //   <Route path="dashboard/" element={<Dashbaord/>}/>
    //   <Route path="earnings" element={<Earning/>}/>
    //   <Route path="users" element={<Users/>}/>
    // </Routes>
    // </BrowserRouter>
  );
}

export default App;
