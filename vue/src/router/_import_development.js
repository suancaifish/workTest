const getFile = file => {
  try{
    return require('@/views/' + file + '.vue').default;
  }catch(err){
    return null
  }
}

export default getFile;

