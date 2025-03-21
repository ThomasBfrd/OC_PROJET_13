import {FC, useEffect, useState} from 'react'
import './header.scss';
import {Link, NavLink, PathMatch, useMatch} from "react-router-dom";
import {UserInformationInterface} from "../../core/interfaces/user-interface.ts";
import {useDispatch, useSelector} from "react-redux";
import {userInfos, userToken} from "../../core/selectors.ts";
import {AppDispatch} from "../../core/store.ts";
import {logout} from "../../core/userSlicer.ts";

const Header: FC = () => {
    const [userInfo, setUserInfo] = useState<UserInformationInterface | undefined>(undefined);
    const userInfoStored: UserInformationInterface = useSelector(userInfos);
    const isUserProfileMatch: PathMatch<string> | null = useMatch(`/user/:id`);
    const dispatch: AppDispatch = useDispatch();
    const token = useSelector(userToken)

    useEffect(() => {

        if (userInfoStored.id) {
            setUserInfo(userInfoStored);
        } else {
            setUserInfo(undefined);
        }

    }, [userInfoStored, token, userInfo]);

    function onLogOut() {
        dispatch(logout())
    }

    return (
        <>
            <nav className="header main-nav">
                <div className="main-nav-logo">
                    <Link to={'/'}>
                        <img
                            className="main-nav-logo-image"
                            src="/img/argentBankLogo.png"
                            alt="Argent Bank Logo"
                        />
                        <h1 className="sr-only">Argent Bank</h1>
                    </Link>
                </div>
                <div className="main-nav-items">
                    {userInfo?.id && token ? (
                        <NavLink to={`/user/${userInfo?.id}`}
                                 className="main-nav-item">
                                <i className="fa fa-user-circle"></i>
                                <span className={isUserProfileMatch && token ? "nav-a active" : "nav-a"}>{userInfo?.firstName}</span>
                        </NavLink>
                    ) : null}

                    {userInfo?.id && token ? (
                        <div className="main-nav-item" onClick={() => onLogOut()}>
                            <i className="fa fa-sign-out"></i>
                            <span className="nav-a">Sign Out</span>
                        </div>

                    ) : (
                        <Link to={'/login'}>
                            <div className="main-nav-item">
                                <i className="fa fa-user-circle"></i>
                                <span className="nav-a">Sign In</span>
                            </div>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Header;