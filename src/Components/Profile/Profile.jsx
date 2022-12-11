import React  from 'react'
import './Profile.scss'
export default function Profile(props) {
  return (
    <>
      {props.userData !== null ?
        <div className="row align-items-center py-5">
          <div className="col-md-4">
            <div className="profile-img">
              <img src="profile.png" className='w-100' alt="" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="profile-info overflow-auto">
              <h2 className='h4 my-3 d-flex flex-wrap align-items-baseline'>
                User_Name:
                <span className='mx-2 h5 text-info'>{props.userData.first_name}</span>
              </h2>
              <h2 className='h4 my-3 d-flex flex-wrap align-items-baseline'>
                User_Age:
                <span className='mx-2 h5 text-info'>{props.userData.age}</span>
              </h2>
              <h2 className='h4 my-3 d-flex flex-wrap align-items-baseline'>
                User_Email:
                <span className='mx-2 h5 text-info '>{props.userData.email}</span>
              </h2>
            </div>
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
