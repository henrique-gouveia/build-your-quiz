import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPage: 'questions',
        isCollapsed: false,
    },
    mutations: {
        toggleMenu(state): void {
            state.isCollapsed = !state.isCollapsed;
        },
        setcurrentPage(state, item): void {
            state.currentPage = item;
        }
    },
    actions: {
    }
});
