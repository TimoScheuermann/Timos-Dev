/* eslint-disable */
import { IProject, IUser } from '@/utils/interfaces';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isDesktop: false,
    darkmode: false,
    routeTransition: 'slide-left',
    user: {} as IUser,
    userValidated: false,
    projects: null
  },
  getters: {
    isDesktop: (state: any): boolean => {
      return state.isDesktop;
    },
    darkmode: (state: any): boolean => {
      return state.darkmode;
    },
    routeTransition: (state: any): string => {
      return state.routeTransition;
    },
    valid: (state: any): boolean => {
      return state.userValidated;
    },
    user: (state: any): IUser => {
      return state.user;
    },
    projects: (state: any): IProject[] | null => {
      const projects: IProject[] | null = state.projects;
      if (!projects) return null;
      return projects.sort((a, b) => a.title.localeCompare(b.title));
    }
  },
  mutations: {
    isDesktop(state: any, isDesktop: boolean): void {
      state.isDesktop = isDesktop;
    },
    darkmode(state: any, darkmode: boolean): void {
      state.darkmode = darkmode;
    },
    routeTransition(state: any, trans: string) {
      state.routeTransition = trans;
    },
    signOut(state: any) {
      state.userValidated = false;
      state.user = undefined;
    },
    signIn(state: any, user: IUser) {
      if (user && user.group === 'Admin') {
        state.user = user;
        state.userValidated = true;
      }
    },
    updateProjects(state: any, projects: IProject[] | null) {
      if (projects) {
        state.projects = projects;
      }
    }
  }
});

export default store;
