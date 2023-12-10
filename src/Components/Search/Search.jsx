import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Search() {

    let [searchItems, setSearchItems] = useState([]);
    let [loading, setLoading] = useState(false);
    let [searchTerm, setSearchTerm] = useState('');

    let baseImgUrl = `https://image.tmdb.org/t/p/w500`;
    let apiKey = `c259800f17162ab5e5a6fa0da3f52860`;
    let searchApi = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=`

    async function handleOnSubmit(e) {
        e.preventDefault();
        if (searchTerm !== '') {
            setLoading(true);
            let { data } = await axios.get(searchApi + searchTerm);
            // console.log(data.results);
            setSearchItems(data.results);
            setSearchTerm('');
            setLoading(false);
        }

    }
    function handleOnChange(e) {
        setSearchTerm(e.target.value);
        // console.log(e.target.value);
    }

    return (
        <>
            <div className="row">
                <form className="col-md-7 mx-auto" onSubmit={handleOnSubmit}>
                    <div className="d-flex my-3" role="search">
                        <input value={searchTerm} onChange={handleOnChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                </form>
            </div>

            {
                loading === true ?
                    <div className='d-flex justify-content-center align-items-center vh-100'>
                        <i className='fas fa-spinner fa-spin fa-4x'></i>
                    </div>
                    :
                    <>
                        <div className="backBtn d-inline-block">
                            <Link className="bg-info py-2 px-3 my-3 rounded" to="/home">Back Home</Link>
                        </div>
                        <div className="home">
                            <div className="row py-3 align-items-center justify-content-center">
                                {
                                    searchItems.map((item) =>
                                        <div key={item.id} className="col-md-3 my-2" role="button">
                                            <div className="movie">
                                                <Link to={`/details/${item.id}/${item.media_type}`}>
                                                    <div className="movie-poster">
                                                        {item.poster_path !== null ?
                                                            <img src={baseImgUrl + item.poster_path} className="w-100" alt="" />
                                                            :
                                                            <img src="img-not.jpg" className='w-100 errImg' alt="" />
                                                        }
                                                        {item.poster_path === undefined ?
                                                            <img src="img-not.jpg" className='w-100 h-415' alt="" />
                                                            :
                                                            ''
                                                        }
                                                        <div className="details text-info">
                                                            show more details
                                                        </div>
                                                        <div className="vote bg-info d-flex justify-content-center align-items-center">
                                                            <span>{item.vote_average}</span>
                                                        </div>
                                                    </div>
                                                    <div className="movie-title my-3 p-2 d-flex flex-column justify-content-center align-items-center bg-dark">
                                                        <h2 className='h6'>
                                                            {item.title ?? item.name}
                                                        </h2>
                                                        <p>
                                                            Media: <span className='mx-2 text-danger'>{item.media_type}</span>
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </>
            }

        </>
    )
}
