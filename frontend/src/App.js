import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer.jsx';
import CafeteriaDetails from './components/CafeteriaDetails.jsx';
import DashboardGerant from './pages/DashboardGerant.jsx';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute allowedRoles={['superadmin']} />}>
          <Route path="/dashboard" element={< Dashboard/>} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={['gerant']} />}>
          <Route path="/dashboard-gerant" element={<DashboardGerant />} />
        </Route>
       

         <Route path="/cafeteriaDetails/:id" element={<CafeteriaDetails />} />
      </Routes>
      {location.pathname !== '/dashboard' && location.pathname !== '/dashboard-gerant' && <Footer />}
    </div>
  );
}

export default App;
