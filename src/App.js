import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  // ! Component life cycle. (자동으로 진행됨)
  // ! Render: componentWillMount() -> render() -> ComponentDidMount() <- 컴포넌트가 존재할 때(생길때?) 진행하는 과정.
  // ! Update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  // ? 위 싸이클 응용 방법 중 하나 : 업데이트 도중일 땐 componentWillUpdate() 이니까 이 안에 로딩을 알리는 spinner를 돌리다가 didupdate 안에 spinner를 숨기는 작업

  // ! 컴포넌트 내 state가 바뀔 때마다 해당 컴포넌트의 render 함수 다시 실행.
  state = {
  }

  componentDidMount() {
    this._getMovies();
  }

  _renderMoives = () => {
    const movies = this.state.movies.map((movie) => {
      return <Movie
        title={movie.title_english}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres} 
        synopsis={movie.synopsis}
        />
    })

    return movies;
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    //_callApi() 실행완료 전까지 아래 코드는 실행되지 않음
    this.setState({
      movies
    })
    console.log(this.state.movies);
  }

  _callApi = () => {
    // * promise 사용
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
      .then(response => response.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading" }>
        {movies ? this._renderMoives() : 'Loading'}
      </div>
    );
  }
}

export default App;