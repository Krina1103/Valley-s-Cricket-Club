import React from 'react';
import ReactDOM from 'react-dom';


class Register extends React.Component {

    constructor(props) {
    super(props);

    this.state = { name: "", email: "", password: "", level: "never played before", comments: "", dialogClass: "hide" };
    }

    submitApplication() {
        // In a real application we'd actually send data to a server here
        // But all we'll do here is show the welcome/thanks dialog
        this.setState({ dialogClass: "show" })
    }

    render(){
    let message = null;
    if (this.state.password.length < 8 ) {
        message = <p>Password too short!</p>
    } else { // Everything is good create a welcome message
        message = <p>Welcome <em>{this.state.name}</em>,{" "}
        your email is <em>{this.state.email}</em>,{" "}
        your level is <em>{this.state.level}</em>{" "}
        and you had the following comments: <em>{this.state.comments}</em></p>
    }


    return <main> 
        <h1> Apply Now! </h1>      
        <form>
            <label>Name:</label>
            <input id="name" type="text" required minLength="3" maxLength="30"
            value={this.state.name}
            onInput={(event) => this.setState({ name: event.target.value })} />
            
            <label>Email ID:</label>
            <input id="email" type="email" required minLength="8" maxLength="30" 
            value={this.state.email}
            onInput={(event) => this.setState({ email: event.target.value })} />

            <label>Password:</label>
            <input id="password" type="password" required minLength="8" maxLength="30" 
            value={this.state.password}
            onInput={(event) => this.setState({ password: event.target.value })}/>

            <label>Level:</label>
            <select id="level" name="level" required value={this.state.level}
            onInput={(event) => this.setState({ level: event.target.value })}>

                <option value="never played before">Never played before</option>
                <option value="beginner">Beginner</option>
                <option value="average player">Average player</option>
                <option value="pro player">Pro player</option>
            </select>
            <label>Comments:</label>
            <textarea name="comments" required value={this.state.comments}
            onInput={(event) => this.setState({ comments: event.target.value })}></textarea>
            <button id="submit" type="button" onClick={this.submitApplication.bind(this)}>Sign Me Up!</button>
        </form>

        <section id="ThanksDialog" className={this.state.dialogClass}>
          <div className="message">
            <h3>Thanks for Signing Up</h3>
            {message}
            <button onClick={(event) => this.setState({ dialogClass: "hide" })}>
              Close
            </button>
          </div>
        </section>

    </main> ;  
}

}

export default Register;