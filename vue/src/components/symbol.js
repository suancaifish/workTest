
function getUniqueKey (index) {
    let ran = Math.random() + index;
    return Symbol(ran);
}

const uidPlugin = {
    install (Vue) {
        Vue.prototype.$uid = getUniqueKey
    }
}


export { uidPlugin }
