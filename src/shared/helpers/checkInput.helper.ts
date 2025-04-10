import {regexForm, regexFormEmail} from "../constants/regex-form";

export function checkInput(value: string): boolean {
    return regexForm.test(value);
}

export function checkEmail(value: string): boolean {
    return regexFormEmail.test(value);
}
