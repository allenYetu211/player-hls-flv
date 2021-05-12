/*
 * @Author: Allen OYang
 * @Date: 2021-05-10 16:39:37
 * @Descripttion: 
 * @LastEditTime: 2021-05-12 10:02:25
 * @FilePath: /ts-vp/src/store/index.tsx
 */

import React from 'react';

const initialState = {
  volume: 1,
  controlState: true,
};


const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case "setVolume":  {
      return {
        ...state,
        volume: action.volume
      }
    }

    case 'setControlState' : {
      return {
        ...state,
        controlState: action.controlState
      }
    }
    default:
      throw new Error();
  }
}

const Context = React.createContext<any>(initialState);
export default Context;

// <AppContext.Provider></AppContext.Provider>

const useStore = () => {
  return React.useContext(Context);
}


const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}> {children} </Context.Provider>
  )
}


export { useStore, StoreProvider };