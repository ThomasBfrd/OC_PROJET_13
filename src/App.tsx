import './App.scss'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Header from './features/components/header/header.tsx'
import Footer from './features/components/footer/footer.tsx'
import {lazy} from "react";

const HomePage = lazy(() => import('./features/pages/Home/home-page.tsx'));
const Login = lazy(() => import('./features/pages/SignIn/login.tsx'));
const UserPage = lazy(() => import('./features/pages/User/user-page.tsx'));

function App() {
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
