import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components//SearchBox";
import Scroll from "../components//Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ""
    };
    // console.log("1: constructor");
  }

  componentDidMount() {
    // console.log("2: componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = event => {
    // console.log(event.target.value);
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading...</h1>
    ) : (
      //   console.log("3: render");
      <div className="tc">
        <h1 className="f1">Robo-Friends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

export default App;

/* 
'
Before using class based component
'
const App = () => {
    return (
        <div className='tc'>
          <h1>Robo-Friends</h1>
          <SearchBox />
          <CardList robots={robots}/>
        </div>
    );
}

export default App;
*/
