// const getFile = file => () => {
//   try{
//     return import('@/views/' + file + '.vue');
//   }catch(err){
//     return null
//   }
// }

const getFile = file => {
  try{ 
    let router =  resolve => require(['@/views/' + file + '.vue'], resolve);
    return  router;
  }catch(err){
    return null
  }
}

export default getFile;

