/*
 * @Author: Allen OYang
 * @Date: 2021-04-22 09:23:10
 * @Descripttion: 
 * @LastEditTime: 2021-04-22 14:17:23
 * @FilePath: /ts-vp/src/testStore/store.tsx
 */


import React from 'react';

const initialState = { count: 0 };


const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Context = React.createContext<any>('');
export default Context;

// <AppContext.Provider></AppContext.Provider>

const useStore = () => {
  return React.useContext(Context);
}


const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Context.Provider value= { [state, dispatch]}> { children } </Context.Provider>
   )
 }


export { useStore, StoreProvider };