import {FC, FormEvent, useActionState, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../core/store.ts";
import {userInfos, userToken} from "../../core/selectors.ts";
import "./edit-user.scss";
import {getUserInfos, setUserInfos} from "../../core/userSlicer.ts";
import {EditUserInformation} from "../../core/interfaces/user-edit-interface.ts";
import {EditAction} from "../../shared/interfaces/edit-user-interface.ts";
import { checkInput } from "../../shared/helpers/checkInput.helper.ts";
import {createStateMessage} from "../../shared/helpers/create-state-message.helper.ts";

const EditUser: FC<EditAction> = ({handleOpen, handleConfirm}) => {
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
            dispatch(getUserInfos(token));
            setIsUpdating(false);
            handleOpen(false);
        }
    }, [state.success, token, isUpdating, user, confirmModal, handleOpen, validationError, handleConfirm]);

    function checkLength(value: string): boolean {
        return !(!value || value.trim().length < 2 || value.trim().length > 31);
    }

    function validForm(_: any, data: any) {

        const body: EditUserInformation = {
            userToken: token,
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
        }

        new Promise(success => setTimeout(success, 2000)).then();

        if (!body) {

            return createStateMessage(false, "Cannot modify the profile, please check your changes", "Error");
        }

        if (!(body.firstName.length > 0) || !(body.lastName.length > 0)) {

            return createStateMessage(false, "Invalid changes", "Error");
        }

        dispatch(setUserInfos(body));
        setIsUpdating(true);
        setConfirmModal(false);

        return createStateMessage(true, "Profile updated successfully", null);
    }

    function handleConfirmEditUserInfos(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formRef.current) {
            const formData: FormData = new FormData(formRef.current);
            const firstName: string | null = formData.get('firstName') as string;
            const lastName: string | null = formData.get('lastName') as string;

            if (!checkInput(firstName) || !checkInput(lastName)) {
                setValidationError("The firstname or lastname must not contain special characters.");
                return;
            }

            if (!checkLength(firstName) || !checkLength(lastName)) {
                setValidationError("The firstname or lastname must have between 2 and 29 characters.");
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

    function handleClick() {
        handleOpen(false);
    }

    function handleConfirmModal() {
        handleConfirm(true);
    }

    function closeModal() {
        setConfirmModal(false);
        handleOpen(false);
    }

    return (
        <>
            {confirmModal ? (
            <div className="confirm-modal">
                <div className="confirm-modal-content">
                <h3>Are you sure to update your informations ?</h3>
                    <div className="edit-buttons confirm-buttons">
                        <button className="confirm-edit-button cancel" type="button" onClick={closeModal}>No</button>
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
                </button>
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