import React from 'react';
import ReactDOM from 'react-dom';
import cricketLogo from '../images/other/cricketlogo.png'; 
import backdrop from '../images/other/backdrop.jpg';
import events from '../images/other/events.png';

function Home(props){
    return <>
    <main>
        <h1> Valley's Cricket Club </h1>
        <h2> This is the home page of Valley's Cricket Club. We are present in Sillicon Valley Area. </h2>
        <img src={cricketLogo} />  
        <p>The Cricket Club provides preeminent recreational and social experiences for its members, their families and friends by maintaining exceptional standards in its facilities, programs and services. </p>
        <h2>Cricket Tips </h2>
        <p>The tips to play better cricket is shared here</p>
        <img src={backdrop} />
        <h2>Events and Calender </h2>
        <p>Details of upcoming events is shared here</p>
        <img src={events} />
    </main>   
    <footer>
        &copy; 2021 Valley's Cricket Club
    </footer>
</>;
}

export default Home;