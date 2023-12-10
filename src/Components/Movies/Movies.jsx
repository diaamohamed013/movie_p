import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Movies() {
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  let baseImgUrl = `https://image.tmdb.org/t/p/w500`;
  let apiKey = `c259800f17162ab5e5a6fa0da3f52860`;
  let nums = new Array(10).fill(1).map((ele, index) => index + 1);

  async function getTrending(pageNum) {
    setCurrentPage(pageNum);
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`);
    setTrendingMovies(data.results);
    setLoading(false);
  }

  useEffect(() => {
    getTrending(1);

  }, [])

  return (
    <>
      {loading === true
        ?
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <i className='fas fa-spinner fa-spin fa-4x'></i>
        </div>
        :
        <>
          <div className="backBtn d-inline-block">
            <Link className="bg-info py-2 px-3 my-3 rounded" to="/home">Back Home</Link>
          </div>
          <div className="home">
            <div className="row py-4 gy-4 align-items-center justify-content-center">
              {
                trendingMovies.map((movie) =>
                  <div key={movie.id} className="col-md-2" role="button">
                    <div className="movie">
                      <Link to={`/details/${movie.id}/movie`}>
                        <div className="movie-poster">
                          {movie.poster_path !== null ?
                            <img src={baseImgUrl + movie.poster_path} className="w-100" alt="" />
                            :
                            <img src="img-not.jpg" className='w-100 errImg' alt="" />
                          }
                          {movie.poster_path === undefined ?
                            <img src="img-not.jpg" className='w-100 errImg' alt="" />
                            :
                            ''
                          }
                          <div className="details text-info">
                            show more details
                          </div>
                          <div className="vote bg-info d-flex justify-content-center align-items-center">
                            <span>{movie.vote_average.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="movie-title my-3">
                          <h2 className='h6'>
                            {movie.title}
                          </h2>
                        </div>
                      </Link>

                    </div>
                  </div>
                )
              }
              <>
                <nav aria-label="Page navigation example" className='d-flex justify-content-center my-3'>
                  <ul className="pagination overflow-auto">
                    {
                      nums.map((num) =>
                        <li onClick={() => getTrending(num)} key={num} className="page-item">
                          <a className={currentPage === num ? `page-link text-dark bg-danger` : `page-link text-white bg-transparent`} role="button">{num}
                          </a>
                        </li>
                      )
                    }
                  </ul>
                </nav>
              </>
            </div>
          </div>
        </>
      }
    </>
  )
}
