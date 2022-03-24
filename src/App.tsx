import React from 'react';
import Home from './page/Home';
import Login from './page/Login'
import Signup from './page/Signup';
import { Routes, Route, BrowserRouter, } from "react-router-dom";
import Rooms from './page/Rooms';
import RoomDetail from './page/RoomDetail';
import Host from './page/Host';
import NewHomeStay from './page/NewHomeStay';
// import Header from './components/Header/Header';

function App() {
  return (
    <>
      {/* <Header/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room" element={<RoomDetail />} />
          <Route path="/host" element={<Host />} />
          <Route path="/newhomestay" element={<NewHomeStay />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
