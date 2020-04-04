import React from 'react';

export const CurrentUserContext = React.createContext(null);

const initialUserState = {
  currentUser: null,
  currentStatus: 'loading',
  showError: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE-USER':
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case 'CHANGE-STATUS':
      return {
        ...state,
        currentStatus: action.currentStatus,
      };
    case 'SHOW-ERROR':
      return {
        ...state,
        showError: action.showError,
      };
  
    default:
      return;
  }
}

export const CurrentUserProvider = ({children}) => {

  const [userState, dispatch] = React.useReducer(reducer, initialUserState);

  const changeUser = (newUser) => {
    dispatch({
      type: 'CHANGE-USER',
      currentUser: newUser,
    })
  }
  const changeStatus = (newStatus) => {
    dispatch({
      type: 'CHANGE-STATUS',
      currentStatus: newStatus,
    })
  }
  const changeShowError = (newValue) => {
    // console.log('context error ', newValue);
    dispatch({
      type: 'SHOW-ERROR',
      showError: newValue,
    })
  }

  return(
    <CurrentUserContext.Provider
      value={{
        userState,
        actions: {
          changeUser,
          changeStatus,
          changeShowError,
        }
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
};

