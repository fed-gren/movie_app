import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import LinesEllipsis from "react-lines-ellipsis";

// class Movie extends Component {
//     static propTypes = {
//         title: PropTypes.string.isRequired,
//         poster: PropTypes.string.isRequired
//     };

//     render() {
//         return (
//             <div>
//                 <MoviePoster poster={this.props.poster}/>
//                 <h1>{this.props.title}</h1>
//             </div>
//         )
//     }
// }

function Movie({ title, poster, genres, synopsis }) {
  return (
    <div className="Movie">
      <div className="Movie__Column">
        <MoviePoster poster={poster} alt={title} />
      </div>
      <div className="Movie__Column">
        <h1>{title}</h1>
        <div className="Movie__Genres">
          {genres.map((genre, index) => <MovieGenre genre={genre} key={index} />)}
        </div>
        <div className="Movie__Synopsis">
          {/* {synopsis} */}
          <LinesEllipsis
            text={synopsis}
            maxLine='3'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        </div>
      </div>
    </div>
  );
}

// class MoviePoster extends Component {
//     static propTypes = {
//         poster: PropTypes.string.isRequired
//     };

//     render() {
//         return (
//             <img src={this.props.poster} alt="movie poster"/>
//         )
//     }
// }

/**
 * ! state를 가지지 않는 컴포넌트를 멍청한(dumb) 컴포넌트라고 하며, 이 경우엔 함수형 컴포넌트로 선언한다.
 * 아래 코드는 위 class형 컴포넌트와 동일하다.
 */
function MoviePoster({ poster, alt }) {
  //poster는 props
  return <img src={poster} alt={alt} title={alt} className="Movie__Poster" />;
}

function MovieGenre({ genre }) {
  return (
    <span className="Movie__Genre">{genre}</span>
  )
}

/**
 * ? props 타입을 검사하는 코드는 아래처럼 바뀝니다.
 */

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  synopsis: PropTypes.string.isRequired
}


MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

MovieGenre.propTypes = {
  genre: PropTypes.string.isRequired
}

export default Movie;
