import {FC, FormEvent, useActionState, useEffect, useState} from 'react';
import './login.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchInfosUser, fetchTokenUser} from "../../core/userSlicer.ts";
import {useNavigate} from "react-router-dom";
import {AppDispatch} from "../../core/store.ts";
import {userInfos, userToken} from "../../core/selectors.ts";
import {UserLogin} from "../../core/interfaces/user-login-interface.ts";

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
    const [rememberLogin, setRememberLogin] = useState<string>('');
    const [rememberCheck, setRememberCheck] = useState<boolean>(false);

    useEffect(() => {

        if (state.success && token) {
            dispatch(fetchInfosUser(token));
        }

        return () => {}

    }, [state.success, token])

    useEffect(() => {
        if (userInfoStored.id) {
            navigate(`/user/${userInfoStored.id}`)
        }

        return () => {}

    }, [userInfoStored]);

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberUser');

        if (rememberedEmail) {
            setRememberLogin(rememberedEmail);
            setRememberCheck(true);
        }

        return () => {}

    }, [rememberLogin, rememberCheck]);

    function validForm(_: any, data: any) {
        const email = data.get('email');
        const isValidEmail = email.includes('@');

        new Promise(success => setTimeout(success, 2000)).then();

        if (!isValidEmail) {
            return {
                success: false,
                message: "Can't connect",
                error: 'Not a valid email',
            };
        }

        const userForm: UserLogin = {
            email: data.get('email'),
            password: data.get('password'),
            rememberMe: data.get('rememberMe')
        };

        dispatch(fetchTokenUser(userForm));

        return {
            success: true,
            message: 'Succeded authentication, you will be redirected to the homepage...',
            error: null,
        };
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formAction(formData);
    }

    const handleRememberChange = (event: any) => {
        const isChecked: boolean = event.target.checked;
        setRememberCheck(isChecked);

        if (!isChecked && rememberLogin) {
            localStorage.removeItem('rememberUser');
        }
    }

    return (
        <main className="main bg-dark login">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign-in</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" defaultValue={rememberLogin ? rememberLogin : ''} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="rememberMe" name="rememberMe" checked={rememberCheck} onChange={handleRememberChange}/>
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit" disabled={isPending}>
                        {isPending ? 'Connexion...' : 'Sign In'}
                    </button>
                </form>
                {state.error && <p className="error">{state.error}</p>}
                {state.success && <p className="success">{state.message}</p>}
            </section>
        </main>
    );
};

export default Login;
