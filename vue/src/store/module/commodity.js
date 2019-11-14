const commodity = {
        state: {
            sourceId: '',
            upDateSourceId: false
        },
        mutations: {
            SET_SOURCE_ID: (state, sourceId) => {
                state.sourceId = sourceId;
            },
            SET_UPDATE_SOURCE_ID: (state, upDateSourceId) => {
                state.upDateSourceId = upDateSourceId;
            }
        },
        actions: {
            setSourceId({ commit }, sourceId) {
                commit('SET_SOURCE_ID', sourceId)
            },
            setUpDateSourceId({ commit }, upDateSourceId) {
                commit('SET_UPDATE_SOURCE_ID', upDateSourceId)
            },
        },
        getters: {
            sourceId: state => state.sourceId,
            upDateSourceId: state => state.upDateSourceId,
        }
    }
  
export default commodity
  