import * as React from 'react';
import Application from '../components/Application';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import Locations from '../components/Locations/Locations';
import Slider from '../components/Slider/Slider'
import Suggest from '../components/Suggestions/Suggest';
import UserManual from '../components/UserManual/UserManual';

export default function Home(){
  React.useEffect(()=>{
    fetch('https://provinces.open-api.vn/api/ depth==2')
    .then((res)=>{
      console.log('res', res)
    })
  },[])
  return (
    <>
      <Slider/>
      <Locations/>
      <Suggest/>
      <UserManual/>
      <Application/>
      <Contact/>
      <Footer/>
    </>
  );
}
