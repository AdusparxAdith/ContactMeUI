import React, { createContext, useContext, useReducer } from 'react';
import { v4 } from 'uuid';
import Notification from './Notification';

const NotificationContext = createContext();

// I IMPORTED THE NOTIFICATION MODULE FROM AN EXISTING GIT REPO

const NotificationProvider = (props) => {
  const [state, notify] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [...state, { ...action.payload }];
      case 'REMOVE_NOTIFICATION':
        return state.filter((notification) => notification.id !== action.id);
      default:
        return state;
    }
  }, []);

  return (
    <NotificationContext.Provider value={notify}>
      <div className={'notification-wrapper'}>
        {state.map((note) => {
          return <Notification notify={notify} key={note.id} {...note} />;
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const notify = useContext(NotificationContext);

  return (props) => {
    notify({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: v4(),
        ...props
      }
    });
  };
};

export default NotificationProvider;
