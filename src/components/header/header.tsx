import {FC, useEffect, useState} from 'react'
import './header.scss';
import {Link, useNavigate} from "react-router-dom";
import {UserInformationInterface} from "../../core/interfaces/user-interface.ts";
import {useSelector} from "react-redux";
import {userInfos} from "../../core/selectors.ts";

const Header: FC = () => {
    const [userInfo, setUserInfo] = useState<UserInformationInterface | undefined>(undefined);
    const userInfoStored = useSelector(userInfos);
    const navigate = useNavigate();

    useEffect(() => {

        if (userInfoStored.id) {
          setUserInfo(userInfoStored);
        } else {
          setUserInfo(undefined);
        }

    }, [userInfoStored, userInfo]);

    function onLogOut() {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
      setUserInfo(undefined);
      navigate('/');
      navigate(0);
    }

    return (
        <>
            <nav className="main-nav">
                <div className="main-nav-logo">
                    <Link to={'/'}>
                        <img
                            className="main-nav-logo-image"
                            src="/public/img/argentBankLogo.png"
                            alt="Argent Bank Logo"
                        />
                        <h1 className="sr-only">Argent Bank</h1>
                    </Link>
                </div>
                <div>

                  {userInfo?.id ? (
                      <div className="main-nav-item">
                        <Link to={`/user/${userInfo?.id}`}>
                          <i className="fa fa-user-circle"></i>
                          {userInfo?.firstName}
                        </Link>
                      </div>
                  ) : null}

                    {userInfo?.id ? (
                            <div className="main-nav-item" onClick={() => onLogOut()}>
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </div>

                    ) : (
                        <Link to={'/login'}>
                            <div className="main-nav-item">
                                <i className="fa fa-sign-out"></i>
                                Sign In
                            </div>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Header;