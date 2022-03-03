import { SSL_OP_SINGLE_DH_USE } from "constants";
import React from "react";
import ReactDOM from "react-dom";
import events from "./eventData.json";
import Menu from "./menu";
import Home from "./home";
import Activities from "./activities";
import Login from "./login";
import Register from "./register";
import AdminActivity from "./AdminActivity";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { role: "guest", show: "home" };
    this.menuHandler = this.menuHandler.bind(this);
  }

  menuHandler(menuItem, event) {
    this.setState({ show: menuItem });
  }

  addActivity(e) {
    this.setState({ events: this.state.events.concat(e) });
  }

  render() {
    let content = <Home />;
    // statements/logic to set the content variable based on state
    switch (this.state.show) {
      case "home":
        content = <Home role={this.state.role} />;
        break;
      case "register":
        content = <Register role={this.state.role} />;
        break;
      case "login":
        content = <Login role={this.state.role} />;
        break;
      case "activities":
        content = <Activities /*activities={events}*/ role={this.state.role} />;
        break;
      case "adminactivity":
        content = <AdminActivity role={this.state.role} />;
        break;
      default:
        content = (
          <h1 style={{ marginTop: "200px" }}>Something went wrong!!!</h1>
        );
    }

    return (
      <>
        <Menu
          menuHandler={this.menuHandler}
          role={this.state.role}
          show={this.state.show}
        />
        {content}{" "}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
