const logWrapper = targetClass =>{
    const orignRender = targetClass.prototype.render;
    targetClass.prototype.render = function(){
        console.log("wrap log begin")
        orignRender.apply(this);//防止this指向改变了
        console.log("wrap log end")
    }
    return targetClass;
}

@logWrapper

class App {
    get state(){
        return 666
    }
    render(){
        console.log("this is App's render func,state is "+ this.state);
    }
}
new App().render();
