import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        userRole: 0,
        stroke: {
            width: 4,
            color: 'red',
            opacity: 1
        },
        tool: 'none'
    },
    mutations: {

        updateRole(state, role) {
            state.userRole = role;
        },

        updateStrokeColor(state, color) {
            state.stroke.color = color;
        },

        updateStrokeWidth(state, width) {
            state.stroke.width = width;
        },

        updateTool(state, tool) {
            if (state.tool === tool) {
                state.tool = 'none';
            } else {
                state.tool = tool;
            }
        },

        updateStrokeOpacity(state, opacity) {
            state.stroke.opacity = opacity;
        }
    }
})

export default store