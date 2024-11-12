export const ErrorEnum = {
  INTERNAL_ERROR : 501,
  NOT_FOUNT: 404,
  CUSTOM_ERROR: 600,
}

export const ErrorMap = (code:number) =>{
  switch(code){ 
    case ErrorEnum.INTERNAL_ERROR:
    return new Error('It not you it us we are working on it')
    case ErrorEnum.NOT_FOUNT:
      return new Error('Can not find what you are looking for!!!')
    case ErrorEnum.CUSTOM_ERROR:
      return new Error('Missing Information !!!')
    default:
      return new Error('Looking into the error please hold on!!!')
  }

}