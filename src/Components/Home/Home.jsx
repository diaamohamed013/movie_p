import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
export default function Home() {
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingTv, setTrendingTv] = useState([]);
  let [trendingPeople, setTrendingPeople] = useState([]);
  let [loading, setLoading] = useState(false);

  let baseImgUrl = `https://image.tmdb.org/t/p/w500`;
  let apiKey = `c259800f17162ab5e5a6fa0da3f52860`;

  async function getTrending(mediaType, callBack) {
    setLoading(true);
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${apiKey}`);
    callBack(data.results.slice(0, 10));
    setLoading(false);
  }

  useEffect(() => {
    getTrending('movie', setTrendingMovies);
    getTrending('tv', setTrendingTv);
    getTrending('person', setTrendingPeople);

  }, [])


  return (
    <>
      {
        loading === false ?
          <div className="home">
            <div className="row py-4 gy-4 align-items-center">
              <div className="col-md-4">
                <div className="item">
                  <div className="brdr w-25 my-5"></div>
                  <h2>Trending</h2>
                  <h2>Movies</h2>
                  <h2>To Watch Now</h2>
                  <p className='text-muted'>Most Watched Movies By Days</p>
                  <div className="brdr w-100 my-5"></div>
                </div>
              </div>
              {
                trendingMovies.map((movie) =>
                  <div key={movie.id} className="col-md-2 my-2" role="button">
                    <div className="movie">
                      <Link to={`/details/${movie.id}/${movie.media_type}`}>
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
            </div>
            <div className="row py-4 gy-4 align-items-center">
              <div className="col-md-4">
                <div className="item">
                  <div className="brdr w-25 my-5"></div>
                  <h2>Trending</h2>
                  <h2>Tv</h2>
                  <h2>To Watch Now</h2>
                  <p className='text-muted'>Most Watched Tv Shows By Days</p>
                  <div className="brdr w-100 my-5"></div>
                </div>
              </div>
              {
                trendingTv.map((tv) =>
                  <div key={tv.id} className="col-md-2 my-2" role="button">
                    <div className="movie">
                      <Link to={`/details/${tv.id}/${tv.media_type}`}>
                        <div className="movie-poster">
                          {tv.poster_path !== null ?
                            <img src={baseImgUrl + tv.poster_path} className="w-100" alt="" />
                            :
                            <img src="img-not.jpg" className='w-100 errImg' alt="" />
                          }
                          {tv.poster_path === undefined ?
                            <img src="img-not.jpg" className='w-100 errImg' alt="" />
                            :
                            ''
                          }
                          <div className="details text-info">
                            show more details
                          </div>
                          <div className="vote bg-info d-flex justify-content-center align-items-center">
                            <span>{tv.vote_average.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="movie-title my-3">
                          <h2 className='h6'>
                            {tv.name}
                          </h2>
                        </div>
                      </Link>

                    </div>
                  </div>
                )
              }
            </div>
            <div className="row py-4 gy-4 align-items-center">
              <div className="col-md-4">
                <div className="item">
                  <div className="brdr my-5 w-25"></div>
                  <h2>Trending</h2>
                  <h2>People</h2>
                  <h2>To Watch Now</h2>
                  <p className='text-muted'>Most Watched People By Days</p>
                  <div className="brdr my-5 w-100"></div>
                </div>
              </div>
              {
                trendingPeople.map((person) =>
                  <div key={person.id} className="col-md-2 my-2" role="button">
                    <div className="movie">
                      <Link to={`/details/${person.id}/${person.media_type}`}>
                        <div className="movie-poster">
                          {person.profile_path !== null ?
                            <img src={baseImgUrl + person.profile_path} className="w-100" alt="" />
                            :
                            <img src="img-not.jpg" className='w-100 errImg' alt="" />
                          }
                          {person.profile_path === undefined ?
                            <img src="img-not.jpg" className='w-100 errImg' alt="" />
                            :
                            ''
                          }
                          <div className="details text-info">
                            show more details
                          </div>
                          <div className="vote bg-info d-flex justify-content-center align-items-center">
                            <span>{person.popularity.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="movie-title my-3">
                          <h2 className='h6'>
                            {person.name}
                          </h2>
                        </div>
                      </Link>

                    </div>
                  </div>
                )
              }
            </div>
          </div>
          :
          <div className='d-flex justify-content-center align-items-center vh-100'>
            <i className='fas fa-spinner fa-spin fa-4x'></i>
          </div>
      }

    </>
  )
}
