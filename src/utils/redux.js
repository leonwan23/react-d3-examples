export const request = (action, param = null) => {
  return {
    type: action,
    param
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
