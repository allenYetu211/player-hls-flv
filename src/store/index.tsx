import React, { createContext, useReducer } from 'react';

import reducer from './reducer';


type MixStateAndDispatch = {
  store: any,
  dispatch?: React.Dispatch<any>
}


const GlobalContext = createContext<MixStateAndDispatch>({store: {}})

const PrivateComponent = (props: any) => {


  const {children, ...other} = props;

  const [store, dispatch] = useReducer(reducer, { ...other })

  return (
    <GlobalContext.Provider value={{store, dispatch}}>
      {children}
    </GlobalContext.Provider>
  )

}


export  { GlobalContext, PrivateComponent }