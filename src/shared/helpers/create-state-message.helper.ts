import {StateMessage} from "../interfaces/state-message-interface.ts";

export function createStateMessage(success: boolean, message: string, error: string | null): StateMessage {
    return {
        success: success,
        message: message,
        error: error,
    }
}