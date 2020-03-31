import React from 'react';

export const CurrentUserContext = React.createContext(null);

const initialUserState = {
  currentUser: null,
  currentStatus: 'loading',
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

  React.useEffect( () => {
    fetch('/api/me/profile')
      .then(data => data.json())
      .then(data => {
        console.log('current user ', data.profile);
        changeUser(data.profile);
        changeStatus('idle');
      })

  }, []);

  return(
    <CurrentUserContext.Provider
      value={{
        userState,
        actions: {
          changeUser,
          changeStatus,
        }
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
};

