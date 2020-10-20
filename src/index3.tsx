import React, { useContext, useReducer } from 'react';

import { PrivateComponent } from './store';

import DemoComponent from './demo';


const VPlayer = (props: any) => {
  return (
    <div style={{ paddingTop: '50px' }}>
      <PrivateComponent {...props}>
        <DemoComponent />
      </PrivateComponent>
    </div>
  )
}
export default VPlayer;


