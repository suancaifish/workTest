import { Message } from "element-ui";
const message =  function(message,type="warning",time=1500){
    Message({
			message:message,
			type: type,
      duration:time,
      showClose:true,
    }) 
  }
  export default message;