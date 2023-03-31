import './App.css';

import axios from 'axios'
import {Routes, Route} from 'react-router-dom'

import Layout from './components/Layout';
import Index from './components/Main'
import Rent from './components/Rent'
import Hotel from './components/Hotel'
import GuestHouse from './components/GuestHouse'
import Pg from './components/Pg'
import Hostel from './components/Hostel'
import Login from './components/Login'
import WishList from './components/Wishlist';
import AirbnbYourHome from './components/AirbnbYourHome';
import Register from './components/Register';
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
