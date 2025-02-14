import './App.css'
import HomePage from '../pages/Home/home-page'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Login from '../pages/SignIn/login.tsx'
import UserPage from '../pages/User/user-page'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import {useEffect} from "react";

function App() {


  useEffect(() => {




  }, [])

  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/user/:id' element={<UserPage />}></Route>
        <Route
            path='*'
            element={<Navigate to="/" />}>
        </Route>
      </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
