import logo from './logo.svg';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Notfound from './Components/Notfound/Notfound';
import People from './Components/People/People';
import Tvshows from './Components/Tvshows/Tvshows';
import Movies from './Components/Movies/Movies';
import Login from './Components/Login/Login';
import Details from './Components/Details/Details';
import Register from './Components/Register/Register';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Profile from './Components/Profile/Profile';
import Search from './Components/Search/Search';

function App() {
  const [userData, setuserData] = useState(null);
  let navigate = useNavigate();

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken);
    // console.log(decodedToken);
  }

  function logOut() {
    localStorage.removeItem("userToken");
    setuserData(null);
    navigate('/login');
  }

  useEffect(() => {//handle hide nav links when refreshing the page
    if (localStorage.getItem("userToken")) {
      saveUserData()
    }
  }, []);

  function ProtectedRoute(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to="/login" /> // bring component login
    }
    else {
      return props.children
    }
  }

  return (
    // <>
    //   <Navbar userData={userData} logOut={logOut} />
    //   <div className="container">
    //     <Routes>
    //       <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
    //       <Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
    //       <Route path='about' element={<ProtectedRoute><Profile userData={userData} /></ProtectedRoute>}></Route>
    //       <Route path='people' element={<ProtectedRoute><People /></ProtectedRoute>}></Route>
    //       <Route path='tvshows' element={<ProtectedRoute><Tvshows /></ProtectedRoute>}></Route>
    //       <Route path='movies' element={<ProtectedRoute><Movies /></ProtectedRoute>}></Route>
    //       <Route path='details' element={<ProtectedRoute><Details/></ProtectedRoute>}>
    //         <Route path=':id' element={<ProtectedRoute><Details /></ProtectedRoute>}>
    //           <Route path=':mediaType' element={<ProtectedRoute><Details /></ProtectedRoute>}></Route>
    //         </Route>
    //       </Route>
    //       <Route path='search' element={<ProtectedRoute><Search /></ProtectedRoute>}></Route>
    //       <Route path='login' element={<Login saveUserData={saveUserData} />}></Route>
    //       <Route path='register' element={<Register />}></Route>
    //       <Route path='*' element={<Notfound />}></Route>
    //     </Routes>
    //   </div>

    // </>
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='about' element={<Profile userData={userData} />}></Route>
          <Route path='people' element={<People />}></Route>
          <Route path='tvshows' element={<Tvshows />}></Route>
          <Route path='movies' element={<Movies />}></Route>
          <Route path='details' element={<Details />}>
            <Route path=':id' element={<Details />}>
              <Route path=':mediaType' element={<Details />}></Route>
            </Route>
          </Route>
          <Route path='search' element={<Search />}></Route>
          {/* <Route path='login' element={<Login saveUserData={saveUserData} />}></Route> */}
          {/* <Route path='register' element={<Register />}></Route> */}
          <Route path='*' element={<Notfound />}></Route>
        </Routes>
      </div>

    </>
  );
}

export default App;
