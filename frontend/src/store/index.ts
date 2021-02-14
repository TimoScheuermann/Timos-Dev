/* eslint-disable */
import { convertFileSize } from '@/utils/functions';
import {
  IAWSFile,
  INewsExtended,
  IProject,
  IUser,
  IWord
} from '@/utils/interfaces';
import { UpdateSectionsDTO } from '@/utils/models';
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
    projects: null,
    words: null,
    news: null,
    driveFiles: null
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
    },
    words: (state: any): IWord[] | null => {
      const words: IWord[] | null = state.words;
      if (!words) return null;
      return words.sort((a, b) => a.acronym.localeCompare(b.acronym));
    },
    news: (state: any): INewsExtended[] | null => {
      const news: INewsExtended[] | null = state.news;
      if (!news) return null;
      return news.sort((a, b) => b.timestamp - a.timestamp);
    },
    driveFiles: (state: any): IAWSFile[] | null => {
      return state.driveFiles;
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
    },
    updateSections(state: any, dto: UpdateSectionsDTO) {
      if (state.projects) {
        state.projects = state.projects.map((x: IProject) => {
          if (x._id === dto._id) return x;
          return {
            ...x,
            sections: dto.sections
          } as IProject;
        });
      }
    },
    setWords(state: any, words: IWord[]) {
      state.words = words;
    },
    addWord(state: any, word: IWord | null) {
      if (word) {
        if (!state.words) state.words = [];
        const words: IWord[] = state.words;
        if (!words.map(x => x._id).includes(word._id)) {
          state.words.push(word);
          return;
        }
        state.words = words.map(x => {
          if (x._id !== word._id) return x;
          else return word;
        });
      }
    },
    removeWord(state: any, id: string) {
      if (id && state.words) {
        state.words = state.words.filter((x: IWord) => x._id !== id);
      }
    },
    setNews(state: any, news: INewsExtended[]) {
      state.news = news;
    },
    addNews(state: any, news: INewsExtended | null) {
      if (news) {
        if (!state.news) state.news = [];
        const everyNews: INewsExtended[] = state.news;
        if (!everyNews.map(x => x._id).includes(news._id)) {
          state.news.push(news);
          return;
        }
        state.news = everyNews.map(x => {
          if (x._id !== news._id) return x;
          else return news;
        });
      }
    },
    removeNews(state: any, id: string) {
      if (id && state.news) {
        state.news = state.news.filter((x: INewsExtended) => x._id !== id);
      }
    },
    addDriveFile(state: any, file: IAWSFile) {
      if (file) {
        if (typeof file.size === 'number') {
          file.size = convertFileSize(file.size);
        }
        if (!state.driveFiles) state.driveFiles = [];
        const files: IAWSFile[] = state.driveFiles;
        if (!files.map(x => x._id).includes(file._id)) {
          state.driveFiles.push(file);
          return;
        }
        state.driveFiles = files.map(x => {
          if (x._id !== file._id) return x;
          else return file;
        });
      }
    },
    removeDriveFile(state: any, id: string) {
      if (state.driveFiles) {
        state.driveFiles = state.driveFiles.filter(
          (f: IAWSFile) => f._id !== id
        );
      }
    }
  }
});

export default store;
