import {ChangeEvent, FC, useActionState, useEffect, useState} from 'react';
import './login.scss';
import {useDispatch, useSelector} from "react-redux";
import {getUserInfos, getUserToken} from "../../core/userSlicer.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {AppDispatch} from "../../core/store.ts";
import {userInfos, userToken} from "../../core/selectors.ts";
import {UserLogin} from "../../core/interfaces/user-login-interface.ts";
import {UserInformationInterface} from "../../core/interfaces/user-interface.ts";
import {SubmitResult} from "../../shared/interfaces/submit-result-interface.ts";
import {checkEmail} from "../../shared/helpers/checkInput.helper.ts";
import {createStateMessage} from "../../shared/helpers/create-state-message.helper.ts";

const Login: FC = () => {
    const [state, submitAction, isPending] = useActionState<SubmitResult | null, FormData>(submitHandler, null);
    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const token: string | undefined = useSelector(userToken)
    const userInfoStored: UserInformationInterface | undefined = useSelector(userInfos);
    const rememberedEmail: string = localStorage.getItem('rememberUser') ?? '';
    const [rememberCheck, setRememberCheck] = useState<boolean>(rememberedEmail ? !!rememberedEmail : false);

    useEffect(() => {
        if (token) {
            dispatch(getUserInfos(token));
        }

        return () => {};
    }, [token]);

    useEffect(() => {
        if (userInfoStored?.id) {
            setTimeout(() => {
                navigate(`/user/${userInfoStored.id}`);

            }, 2000)
        }

        return () => {};
    }, [userInfoStored]);

    async function submitHandler(_previousState: SubmitResult | null, formData: FormData): Promise<SubmitResult> {
        const email: string = formData.get('email') as string;
        const password: string = formData.get('password') as string;
        const isValidEmail: boolean = email.includes('@');

        if (!isValidEmail) {
            return createStateMessage(false, "The email must contain '@'", "Not a valid email");
        }

        if (isValidEmail && !checkEmail(email)) {
            console.log('email : ', email)
            return createStateMessage(false, "The email must not contain special characters.", "Error");
        }

        const userForm: UserLogin = {
            email: email,
            password: password,
            rememberMe: formData.get('rememberMe') === 'on',
        };

        try {
            await dispatch(getUserToken(userForm)).unwrap();

            return createStateMessage(true, "Succeeded authentication, you will be redirected to the homepage...", null);

        } catch (error) {

            return createStateMessage(false, "Can't connect", 'Wrong email or password, please retry');
        }
    }

    const handleRememberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = event.target.checked;
        setRememberCheck(isChecked);

        if (!isChecked && rememberedEmail) {
            localStorage.removeItem('rememberUser');
        }
    }

    return (
        <main className="main bg-dark login">
            <section className="sign-in-content">
                {state && state.success ? (
                <div className="overlay-login">
                    <svg width="48" height="48" viewBox="0 0 48 48" className="loader">
                        <path d="M24 4 A20 20 0 1 1 4 24" stroke="#12002b" strokeWidth="7" fill="none" strokeLinecap="round" />
                    </svg>
                </div>
                ) : null}
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign-in</h1>
                <form action={submitAction}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" defaultValue={rememberedEmail ? rememberedEmail : ''} disabled={!!userInfoStored?.id} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" disabled={!!userInfoStored?.id} required/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="rememberMe" name="rememberMe" checked={rememberCheck} disabled={!!userInfoStored?.id} onChange={handleRememberChange}/>
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit" disabled={isPending}>
                        {isPending ? 'Connexion...' : 'Sign In'}
                    </button>
                </form>
                {state?.message && <p className="success">{state?.message}</p>}
                {state?.error && <p className="error">{state?.error}</p>}
            </section>
        </main>
    );
};

export default Login;
