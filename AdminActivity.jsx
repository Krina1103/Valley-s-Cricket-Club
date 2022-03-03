import React from 'react';
import ReactDOM from 'react-dom';
import events from "./eventData.json";

// let deleteBtn = <button onClick={that.deleteActivity.bind(that,i)}>Delete</button>

class AdminActivity extends React.Component{ 

    constructor(props){
        super(props);

        this.state = {
           // name:"",dates:"",description:""
          events: [] 
        };
        this.addActivity = this.addActivity.bind(this);
     //   this.deleteActivity = this.deleteActivity.bind(this);
    }

    addActivity(){
        let e = {name:this.state.name, dates:this.state.dates,description:this.state.description}; 
        this.setState({events: this.state.events.concat(e)});
    }

    // deleteActivity(i){
    //     console.log("hey");
    //     // let delE = this.state.events.filter((event, index) => index!==i);
    //     // console.log("new events " + delE);
    //     // this.setState({events:delE}); 
    // }

    render(){
    // let that = this;
    //Create table rows with array map method
    let tableRows = this.state.events.map(function(event,i){
    return <tr key={i}><td><button /*onClick={that.deleteActivity.bind(that,i)}*/>Delete</button></td>
                  <td>{event.name}</td>
                  <td>{event.dates}</td>
                  <td>{event.description}</td></tr>;
    })


    return <>
    <h1 style={{marginTop:"100px"}}>Manage Activities</h1>
    
    <form>
        <label>Name</label>
        <input type="text" required 
        value={this.state.name}
        onInput={(event) => this.setState({ name: event.target.value })}/>
        <label>Date</label>
        <input type="text" required 
        value={this.state.dates}
        onInput={(event) => this.setState({ dates: event.target.value })}/>
        <label>Description</label>
        <input type="text" required 
        value={this.state.description}
        onInput={(event) => this.setState({ description: event.target.value })}/>        
        <button type="button" onClick={this.addActivity.bind(this)}>Add Activity</button>
    </form>

    <table>
    <caption>Club Activities Table</caption>
    <thead>
        <tr><th></th><th>Name</th><th>Dates</th><th>Description</th></tr>
                </thead>
                <tbody id="ActTable">
                {tableRows}
                </tbody>
    </table>
    </>;
}
}


export default AdminActivity;

