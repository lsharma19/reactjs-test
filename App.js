import React, { Component } from "react";
import axios from "axios";
import MovieDetails from "./movieDetails";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      ismodalOpen: false,
      film: {}
    };
  }

  componentDidMount() {
    const getUrl = "https://ghibliapi.herokuapp.com/films";
    axios.get(getUrl).then(response => {
      this.setState({
        films: response.data
      });
    });
  }

  onOpenModal = film => {
    this.setState(
      {
        ismodalOpen: true,
        film: film,
        display: 'block'
      }
    );
  };

  // onCloseModal = film => {
  //   this.setState({
  //     ismodalOpen: false,
  //     film: {}
  //   });
  // };

  render() {
    const { films } = this.state;
    return (
      <div className="App">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Movie Title</th>
              <th scope="col">Director's Name</th>
              <th scope="col">Movie Rating</th>
              <th scope="col">Movie Poster</th>
            </tr>
          </thead>
          <tbody>
            {films.map(film => {
              return (
                <tr key={film.id}>
                  <td>
                    <button
                      onClick={() => this.onOpenModal(film)}
                    >
                      {film.title}
                    </button>
                  </td>
                  <td>{film.director}</td>
                  <td>{film.rt_score}</td>
                  <td>{film.url}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <MovieDetails value={this.state.films} open={this.state.ismodalOpen} />
      </div>
    );
  }
}

export default App;

