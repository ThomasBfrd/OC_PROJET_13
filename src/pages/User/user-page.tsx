import {FC, useEffect, useState} from 'react'
import './user-page.scss';
import {useSelector} from "react-redux";
import {userInfos, userToken} from "../../core/selectors.ts";
import {useNavigate} from "react-router-dom";
import ArgentBank from "../../components/argent-bank/argent-bank.tsx";
import EditUser from "../../components/edit-user/edit-user.tsx";

const UserPage: FC = () => {
    const token = useSelector(userToken);
    const userInfo = useSelector(userInfos);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isConfirmModal, setIsConfirmModal] = useState(false);

    useEffect(() => {
        if (!token && !userInfo.id) {
            navigate('/login')
        }
    }, [token, userInfo]);

    function handleParent(data: boolean) {
        setIsEditing(data);
        setIsConfirmModal(data);
    }

    return (
        <main className="bg-dark main user-page">
            {isConfirmModal ? (
            <div className="overlay"></div>
            ) : null}
            <div className="user-page-header">
                <h1>Welcome back<br/>{userInfo.firstName} {userInfo.lastName}!</h1>
                {!isEditing ? (
                <button className="edit-button"
                        onClick={() => setIsEditing(true)}>
                    Edit Name
                </button>
                ) : (
                <EditUser handleOpen={handleParent} handleConfirm={handleParent} />
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <ArgentBank title={'Argent Bank Checking (x8349)'} amount={'2,082.79'}
                        description={'Available Balance'}/>
            <ArgentBank title={'Argent Bank Savings (x6712)'} amount={'10,928.42'}
                        description={'Available Balance'}/>
            <ArgentBank title={'Argent Bank Credit Card (x8349)'} amount={'184.30'}
                        description={'Current Balance'}/>
        </main>
    )
}

export default UserPage;