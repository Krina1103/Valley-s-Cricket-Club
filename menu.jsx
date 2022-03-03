// import React from "react";
// import ReactDOM from "react-dom";

// class Menu extends React.Component {

// constructor(props) {
// super(props);

// }

// render() {
// let list = null;
// switch (this.props.role) {
// case "user": list = ["Home", "Activities", "Logout"];
// break;
// case "guest": list = ["Home", "Activities", "Login", "Register"];
// break;
// default: list = ["Home", "Activities", "Login", "Register"];
// break;
// }

// return <div>
// <nav>
//     <ul>
// {list.map((item,i) => 
// <li key={i} className={(item.toLowerCase())===this.props.show?'highlight':''}>{item}</li>
// )}
// </ul>
// </nav>
// </div>;
// }
// }

// export default Menu;

import React from 'react';
import ReactDOM from 'react-dom';

function Menu(props) {
    let content = "";
    let rolename = props.role;
    let showname = props.show;

    if(rolename == "user"){
        content = <>
        <li className={(showname=="home" ? 'highlight':'')} onClick={props.menuHandler.bind(null,"home")}>Home</li>   
        <li className={(showname=="activities" ? 'highlight':'')} onClick={props.menuHandler.bind(null,"activities")}>Club Activities</li>
        <li className={(showname=="adminactivity" ? 'highlight':'')} onClick={props.menuHandler.bind(null,"adminactivity")}>Manage Activity</li>
        <li className={(showname=="logout" ? 'highlight':'')}>Logout</li>
        </>
    }
    if(rolename == "guest"){
        content = <>
        <li className={(showname=="home" ? 'highlight':'')} onClick={props.menuHandler.bind(null,"home")}>Home</li>
        <li className={(showname=="register" ? 'highlight':'')} onClick={props.menuHandler.bind(null,"register")}>Register</li>
        <li className={(showname=="login" ? 'highlight':'')} onClick={props.menuHandler.bind(null,"login")}>Login</li>
        <li className={(showname=="activities" ? 'highlight':'')} onClick={props.menuHandler.bind(null,"activities")}>Club Activities</li>
        </>
    }
    return (<div>
    <nav>
    <ul>
       {content}
    </ul>
    </nav>
    </div>
    );
}

export default Menu;