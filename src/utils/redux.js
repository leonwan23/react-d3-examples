export const request = action => {
    return {
        type: action
    };
};

export const success = (action, payload = null) => {
    return {
        type: action,
        payload
    };
};

export const failure = (action, err) => {
    return {
        type: action,
        payload: err
    };
};