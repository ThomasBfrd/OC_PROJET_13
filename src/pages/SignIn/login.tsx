import {FC, useActionState, useEffect} from 'react';
import './login.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchInfosUser, fetchTokenUser, UserLogin} from "../../core/userSlicer.ts";
import {useNavigate} from "react-router-dom";
import {AppDispatch} from "../../core/store.ts";
import {userInfos, userToken} from "../../core/selectors.ts";

const Login: FC = () => {
    const [state, formAction, isPending] = useActionState(validForm, {
        success: false,
        message: "",
        error: null,
    });
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(userToken)
    const userInfoStored = useSelector(userInfos)

    useEffect(() => {
        if (state.success && token) {
            const todayDate = new Date();
            todayDate.setUTCDate(todayDate.getDate() + 1);
            dispatch(fetchInfosUser(token));
        }

        if (userInfoStored.id) {
            navigate(`/user/${userInfoStored.id}`)
        }
    }, [state.success, token, userInfoStored])

    function validForm(previousState: any, data: any) {
        const email = data.get('email');
        const password = data.get('password');
        const isValidEmail = email.includes('@');

        console.log(email);
        console.log(password);

        new Promise(success => setTimeout(success, 2000));

        if (!isValidEmail) {
            return {
                success: false,
                message: 'Impossible de se connecter',
                error: 'Email invalide',
            };
        }

        console.log(formAction)

        const userForm: UserLogin = {
            email: data.get('email'),
            password: data.get('password')
        };

        if (previousState) {
        previousState = userForm;
        }
        dispatch(fetchTokenUser(userForm))

        return {
            success: true,
            message: 'Données correctes, authentification...',
            error: null,
        };
    }

    return (
        <main className="main bg-dark sign-in">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign-in</h1>
                <form action={formAction}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <button className="sign-in-button" type="submit" disabled={isPending}>
                        {isPending ? 'Connexion en cours...' : 'Sign In'}
                    </button>
                </form>
                {state.error && <p className="error">{state.error}</p>}
                {state.success && <p className="success">{state.message}</p>}
            </section>
        </main>
    );
};

export default Login;
