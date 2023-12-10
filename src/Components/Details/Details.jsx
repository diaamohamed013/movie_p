import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams , Link} from 'react-router-dom'

// userParms to bring any parameter's value from url

export default function Details() {
  let parms = useParams();
  let [itemDetails, setItemDetails] = useState({});
  let [loading, setLoading] = useState(false);

  let baseImgUrl = `https://image.tmdb.org/t/p/w500`;
  let apiKey = `c259800f17162ab5e5a6fa0da3f52860`;

  async function getDetails(mediaType, id) {
    setLoading(true);
    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}&language=en-US`);
    setItemDetails(data);
    setLoading(false);
  }

  useEffect(() => {
    getDetails(parms.mediaType, parms.id);
  }
    , [])

  return (
    <>
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
          <div className="item">
            <div className="row py-4 gy-4">
              <div className="col-lg-3">
                <div className="item-poster">
                  {itemDetails.poster_path !== null ?
                    <img src={baseImgUrl + itemDetails.poster_path} className="w-100" alt="" />
                    :
                    <img src="img-not.jpg" className='w-100 errImg' alt="" />
                  }

                  {itemDetails.profile_path !== null ?
                    <img src={baseImgUrl + itemDetails.profile_path} className="w-100" alt="" />
                    :
                    <img src="img-not.jpg" className='w-100 errImg' alt="" />
                  }

                </div>
              </div>
              <div className="col-lg-9">
                <div className="item-info my-3">
                  <h2>
                    {itemDetails.title ?? itemDetails.name}
                  </h2>
                  <ul className='d-flex list-unstyled my-3 flex-wrap'>
                    {
                      itemDetails && itemDetails.genres ?
                        itemDetails.genres.map((genre) =>
                          <li className='bg-info me-3 py-1 px-3 my-2 rounded' key={genre.id}>{genre.name}</li>

                        )
                        :
                        ""
                    }
                  </ul>
                  {
                    itemDetails.original_language ?
                      <span className='text-warning'>
                        {itemDetails.original_language}
                      </span>
                      :
                      ""
                  }
                  {
                    itemDetails.release_date ?? itemDetails.first_air_date ?
                      <h4 className='h6 my-4'>
                        <span>
                          Air Released:
                          <span className='mx-2 text-muted'>
                            {itemDetails.release_date ?? itemDetails.first_air_date}
                          </span>
                        </span>
                      </h4>
                      :
                      ""
                  }

                  <h4 className='h6 my-4'>
                    {
                      itemDetails.vote_average ?
                        <span>
                          Vote:
                          <span className='mx-2 text-success'>
                            {itemDetails.vote_average?.toString().split("").splice(0, 3).join("")}
                          </span>
                        </span>
                        :
                        <span>
                          Popularity:
                          <span className='mx-2 text-info'>
                            {itemDetails.popularity}
                          </span>
                        </span>
                    }
                  </h4>
                  {
                    itemDetails.vote_count ?
                      <h4 className='h6 my-4'>
                        Vote Count:
                        <span className='mx-2 text-info'>
                          {itemDetails.vote_count}
                        </span>
                      </h4>
                      :
                      ""
                  }


                  <h4 className='h6 my-4'>
                    overView:
                    <p className='my-3 text-muted lh-lg'>
                      {itemDetails.overview ?? itemDetails.biography}
                    </p>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          </>
      }
    </>
  )
}
