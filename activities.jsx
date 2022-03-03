import React from 'react';
import ReactDOM from 'react-dom';

class Activities extends React.Component{ 
    constructor(props){
        super(props);
        this.state = { activities: [] };
    }

    componentDidMount(){
        let that = this;
        fetch('/activities').then(function(res){
            if(res.ok){
                console.log(res);
                return res.json();
            } else {
                console.log("Problem getting activities");
                return new Promise.reject(res.statusText);
            }
        })
        .then(function(activities){
            console.log(activities);
            that.setState({activities: activities});
            
        })
    }

    render() {
        // Create table rows with array map method
        let tableRows = this.state.activities.map(function(event,i){
        return (<tr key={i}><td>{event.name}</td>
                        <td>{event.dates}</td>
                        <td>{event.description}</td></tr>);
        });

        let eventName = this.state.activities.map(function(event,j){
        return <h3 key={j}><ul><li>{event.name}</li></ul></h3>
        })
        return <>
        <h1 style={{marginTop:"100px"}}>Club Activities</h1>
        {eventName}
        <table>
        <caption>Club Activities Table</caption>
        <thead>
            <tr><th>Name</th><th>Dates</th><th>Description</th></tr>
                    </thead>
                    <tbody id="ActTable">
                    {tableRows}
                    </tbody>
        </table>
        </>;
    }
}

export default Activities;

