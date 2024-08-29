import React from 'react';
import '../App.css';
import HeroSection from '../fragments/HeroSection';
import WeeklySpecials from '../fragments/WeeklySpecials';
import OurMission from '../fragments/OurMission';
import MiniBlog from '../fragments/MiniBlog';
import MiniTips from '../fragments/MiniTips';
import ProfileStrip from '../fragments/ProfileStrip';

function Home(props) {
    return (
        <>
            <ProfileStrip {...props} />
            <HeroSection />
            <OurMission />
            <MiniBlog />
            <WeeklySpecials />
            <MiniTips />
        </>
    );
}

export default Home;
