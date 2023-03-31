import './App.css';

import axios from 'axios'
import {Routes, Route} from 'react-router-dom'

import Layout from './components/Layout';
import Index from './components/pages/Main'
import Rent from './components/pages/Rent'
import Hotel from './components/pages/Hotel'
import GuestHouse from './components/pages/GuestHouse'
import Pg from './components/pages/Pg'
import Hostel from './components/pages/Hostel'
import Login from './components/auth/Login'
import WishList from './components/auth/Wishlist';
import AirbnbYourHome from './components/auth/AirbnbYourHome';
import Register from './components/auth/Register';
import {UseUserContext} from './context/UserContext'
import { useEffect } from 'react';

axios.defaults.baseURL = 'http://localhost:3000/api/v1'
axios.defaults.withCredentials = true
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Index/>}/>
          <Route path='/rent' element={<Rent/>}/>
          <Route path='/hotel' element={<Hotel/>}/>
          <Route path='/guestHouse' element={<GuestHouse/>}/>
          <Route path='/pg' element={<Pg/>}/>
          <Route path='/hostel' element={<Hostel/>}/>
          <Route path='/airbnbYourHome' element={<AirbnbYourHome/>}/>
          <Route path='/wishlist' element={<WishList/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
