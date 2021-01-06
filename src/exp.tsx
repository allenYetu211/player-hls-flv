import React from 'react';
import Multiples from '@g/component/plugIn-multiples/indexCopy';



const defaultListInfo = [{
  text: 'a',
  value: 1,
},
{
  text: 'b',
  value: 2,
}]

export default () => {

  const [multipleList,setMultipleList] = React.useState(defaultListInfo)
  const [multipleIndex,setMultipleIndex] = React.useState(0)

  const onChangeMultipleIndex = (key: number) => {
    setMultipleIndex(key);
  }

  return (
    <div style={{
      position: "absolute",
      top: 300,
      left:0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255,255,255,0.7)',
      zIndex: 10000
    }}>
       <Multiples 
        index={multipleIndex}
        list={multipleList}
        onChangeMultipleIndex={onChangeMultipleIndex}
       ></Multiples>
    </div>
  )
}