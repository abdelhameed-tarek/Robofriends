import React, { Component } from "react";
import Cardlist from "../components/CardList";
import SearchBox from "../components/SearchBox";
// import { robots } from "./robots";
import Scroll from "../components/Scroll";
import "./App.css";

// const state = { robots: robots, SearchBox: "" };

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        this.setState({ robots: users });
      });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
    // console.log(event.target.value);
  };

  render() {
    const { robots, searchField } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1>Robofriedns</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <Cardlist robots={filteredRobots} />;
        </Scroll>
      </div>
    );
  }
}

// const App = () => {
//   return (
//     <div className="tc">
//       <h1>Robofriedns</h1>
//       <SearchBox />
//       <Cardlist robots={this.state.robots} />;
//     </div>
//   );
// };

export default App;
