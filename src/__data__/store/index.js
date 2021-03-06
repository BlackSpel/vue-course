import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { MUTATION_TYPES } from '../constants/mutation-types'
import { API_URLS } from '../constants/api-urls'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        players: [],
        playerMatches: [],
        selectedPlayer: '',
        showDialog: false,
        matches: []
    },
    actions: {
        async getProPlayers({commit}) {
            try {
                const res = await axios.get(API_URLS.OPENDOTA_MAIN_URL + 'proPlayers/', {
                    params: {}
                });
                
                if(res){
                    commit(MUTATION_TYPES.GET_PRO_PLAYERS, res.data)
                }
            } catch (e) {
                console.log(e)
            }
        },

        async getPlayerMatches({commit}, params) {
            try {
                const res = await axios.get(API_URLS.OPENDOTA_MAIN_URL + 'players/' + params.account_id + '/matches', {
                    params: {
                        limit: params.limit,
                        win: params.win
                    }
                });
                
                if(res){
                    commit(MUTATION_TYPES.GET_PLAYER_MATCHES, res.data)
                    commit(MUTATION_TYPES.SET_SELECTED_PLAYER, params.account_id)
                }
            } catch (e) {
                console.log(e)
            }
        },

        showDialog({commit}, showDialog) {
            commit(MUTATION_TYPES.SHOW_DIALOG, showDialog)
        },

        async getProMatches({commit}) {
            try {
                const res = await axios.get(API_URLS.OPENDOTA_MAIN_URL + 'proMatches/', {
                    params: {}
                });
                
                if(res){
                    commit(MUTATION_TYPES.GET_PRO_MATCHES, res.data)
                }
            } catch (e) {
                console.log(e)
            }
                
        },
    },
    mutations: {
        [MUTATION_TYPES.GET_PRO_PLAYERS](state, results) {
            state.players = results;
        },

        [MUTATION_TYPES.GET_PLAYER_MATCHES](state, results) {
            state.playerMatches = results;
        },

        [MUTATION_TYPES.SHOW_DIALOG](state, results) {
            state.showDialog = results;
        },

        [MUTATION_TYPES.SET_SELECTED_PLAYER](state, results) {
            state.selectedPlayer = results;
        },

        [MUTATION_TYPES.GET_PRO_MATCHES](state, results) {
            state.matches = results;
        },
    },
    getters: {
        getProPlayers: (state) => state.players,

        getProPlayersSlice: (state) => lenght => {
            return state.players.slice(0, lenght)
        },

        getPlayerMatches: (state) => state.playerMatches,

        getShowDialog: (state) => state.showDialog,

        getSelectedPlayer: (state) => state.selectedPlayer,

        getProMatchesSlice: (state) => lenght => {
            return state.matches.slice(0, lenght)
        }
    }
})