export default {
  namespace: 'login',
  state: {
    status: '200'
  },
  effect:{
    *fetch(action,{call,put}){
     const {data} =  yield call(function(){
       fetch('http://localhost:8002/user/login',{
         method:'post',
         data: {
           id:1
         }
       })
     })
    }
  },
  reducers: {
    'fetch'(state){
      return (
        <div></div>
      )
    },
  },
};
