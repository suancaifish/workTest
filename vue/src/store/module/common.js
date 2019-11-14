const common = {
    state: {
      breadCrumb: []
    },
    mutations: {
      SET_BREAD_CRUMB: (state, breadCrumb) => {
        state.breadCrumb = breadCrumb;
      }
    },
    actions: {
      setBreadCrumb({ commit }, breadCrumb) {
        commit('SET_BREAD_CRUMB', breadCrumb)
      }
    },
    getters: {
      breadCrumb: state => state.breadCrumb,
    }
  }
  
export default common
  