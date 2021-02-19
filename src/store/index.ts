import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albumsData: "",
    genres: [
      {
        id: 1,
        name: "rock",
        bands: [1, 2],
      },
      {
        id: 2,
        name: "pop",
        bands: [3, 4],
      },
    ],
    bands: [
      {
        id: 1,
        name: "rock band1",
        albums: [1, 2],
      },
      {
        id: 2,
        name: "rock band2",
        albums: [3, 4],
      },
      {
        id: 3,
        name: "pop band1",
        albums: [5, 6],
      },
      {
        id: 4,
        name: "pop band2",
        albums: [7, 8],
      },
    ],
    musicians: [
      {
        id: 1,
        name: "rock guy1",
      },
      {
        id: 2,
        name: "rock guy2",
      },
      {
        id: 3,
        name: "rock guy3",
      },
      {
        id: 4,
        name: "rock guy4",
      },
      {
        id: 5,
        name: "pop guy1",
      },
      {
        id: 6,
        name: "pop guy2",
      },
      {
        id: 7,
        name: "pop guy3",
      },
      {
        id: 8,
        name: "pop guy4",
      },
    ],
  },
  mutations: {
    setAlbumsData: (state, data) => {
      state.albumsData = data;
    },
  },
  actions: {
    storeAlbums(context, data) {
      context.commit("setAlbumsData", data);
    },
  },
  modules: {},
});
