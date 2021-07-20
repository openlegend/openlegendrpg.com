import React, { createContext, useReducer } from 'react';
import { darkTheme, lightTheme } from './Theme';

let SET_THEME

export const darkModeContext = createContext();

export const darkModeReducer = (state, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state, 
        darkMode: action.payload
      }
    default: 
      return state
  }
}
export const DarkModeState = props => {
  const initialState = {
    darkMode: false
  }
  const [state, dispatch] = useReducer(darkModeReducer, initialState);

  const setDarkMode = async bool => {
    dispatch({
      type: SET_THEME,
      payload: bool
    })
  }

  const theme = state.darkMode ? darkTheme : lightTheme;

  return (
    <darkModeContext.Provider
      value={{
        darkMode: state.darkMode,
        setDarkMode,
        theme: theme
      }}
    >
      { props.children}
    </darkModeContext.Provider>
  )
}
