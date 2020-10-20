const reducer = (state: any, action: any) => {
  switch (action.case) {
    case 'add':
      return { ...state, count: action.count }
    case 'less': 
      return { ...state, count: action.count - 1 }
    case 'dispatch': 
      return { ...state, count: action.count };
    default:
      return state
  }
}

export  default reducer;