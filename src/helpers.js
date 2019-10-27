export const changeHandler = (event, targetObject) => {
    const placeholder = event.currentTarget.placeholder;
    const value = event.currentTarget.value;
    
    switch(placeholder){
      case 'Name':
        targetObject.name = value;
          break;
      case 'Price':
        targetObject.price = parseFloat(value).toFixed(2);
          break;   
        case 'Address':
            targetObject.address = value;
            break;
        case 'Phone':
            targetObject.phone = value;
            break;            
    }
    return targetObject;
}