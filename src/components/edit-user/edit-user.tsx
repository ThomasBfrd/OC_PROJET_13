import {FC, FormEvent, useActionState, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../core/store.ts";
import {fetchEditUserInfos, fetchInfosUser} from "../../core/userSlicer.ts";
import {userInfos, userToken} from "../../core/selectors.ts";
import "./edit-user.scss";
import {UserEditInformations} from "../../core/interfaces/user-edit-informations-interface.ts";

interface EditUserProps {
    handleOpen: (value: boolean) => void;
    handleConfirm: (value: boolean) => void;
}

const EditUser: FC<EditUserProps> = ({handleOpen, handleConfirm}) => {
    const [state, formAction, isPending] = useActionState(validForm, {
        success: false,
        message: "",
        error: null,
    });
    const dispatch: AppDispatch = useDispatch();
    const token = useSelector(userToken);
    const user = useSelector(userInfos);
    const [isUpdating, setIsUpdating] = useState(false);
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const [validationError, setValidationError] = useState<string>("");
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success && token && isUpdating) {
            console.log('profile modifié');
            dispatch(fetchInfosUser(token));
            setIsUpdating(false);
            handleOpen(false);
        }
    }, [state.success, token, isUpdating, user, confirmModal, handleOpen, validationError, handleConfirm]);

    function validForm(_: any, data: any) {
        const body: UserEditInformations = {
            userToken: token,
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
        }

        new Promise(success => setTimeout(success, 2000)).then();

        if (!body) {
            return {
                success: false,
                message: "Impossible de modifier le profile",
                error: "Error"
            }
        }

        if (!(body.firstName.length > 0) || !(body.lastName.length > 0)) {
            return {
                success: false,
                message: "Invalid changes",
                error: "Error"
            }
        }

        dispatch(fetchEditUserInfos(body));
        setIsUpdating(true);
        setConfirmModal(false);

        return {
            success: true,
            message: "Profil modifié avec succès",
            error: null,
        }
    }

    function handleConfirmEditUserInfos(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formRef.current) {
            const formData: FormData = new FormData(formRef.current);
            const firstName: string | null = formData.get('firstName') as string;
            const lastName: string | null = formData.get('lastName') as string;

            if (!firstName || firstName.trim().length < 2 && firstName.trim().length > 30) {
                setValidationError("The firstname must constain at least 2 caracters.");
                return;
            }

            if (!lastName || lastName.trim().length < 2 && lastName.trim().length > 30) {
                setValidationError("The lastname must constain at least 2 caracters.");
                return;
            }
        }

        setValidationError("");
        handleConfirmModal();
        setConfirmModal(true);
    }

    function handleEditUserInfos() {
        if (formRef.current) {
        const formData: FormData = new FormData(formRef.current);
        formAction(formData);
        }
    }

    function handleCancelConfirm() {
        setConfirmModal(false);
    }

    function handleClick() {
        handleOpen(false);
    }

    function handleConfirmModal() {
        handleConfirm(true);
    }

    return (
        <>
            {confirmModal ? (
            <div className="confirm-modal">
                <div className="confirm-modal-content">
                <h3>Are you sure to update your informations ?</h3>
                    <div className="edit-buttons confirm-buttons">
                        <button className="confirm-edit-button cancel" type="button" onClick={handleCancelConfirm}>No</button>
                        <button className="confirm-edit-button" type="button" onClick={handleEditUserInfos}>Yes</button>
                    </div>
                </div>
            </div>
            ) : null}
            <form ref={formRef} onSubmit={handleConfirmEditUserInfos}>
                <div className="edit-user">
                <div className="input-wrapper">
                    <label htmlFor="firstName">Firstname</label>
                    <input type="text" id="firstName" name="firstName" defaultValue={user.firstName}/>
                </div><div className="input-wrapper">
                    <label htmlFor="lastName">Lastname</label>
                    <input type="text" id="lastName" name="lastName" defaultValue={user.lastName}/>
                </div>
                </div>
                {validationError && <p className="error">{validationError}</p>}
                <div className="edit-buttons">
                <button className="edit-profile-button cancel" type="button" onClick={handleClick}>
                    Cancel
                </button>f
                <button className="edit-profile-button" type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save'}
                </button>
                </div>
            </form>
            {state.error && <p className="error">{state.message}</p>}
            {state.success && <p className="success">{state.message}</p>}
        </>
    );
};

export default EditUser;