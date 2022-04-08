import * as React from 'react';
import Application from '../components/Application';
import Contact from '../components/Contact';
import Locations from '../components/Locations/Locations';
import Slider from '../components/Slider/Slider'
import Suggest from '../components/Suggestions/Suggest';
import UserManual from '../components/UserManual/UserManual';

export default function Home(){
  return (
    <>
      <Slider/>
      <Locations/>
      <Suggest/>
      <UserManual/>
      <Application/>
      <Contact/>
    </>
  );
}
