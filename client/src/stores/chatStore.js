import {defineStore} from 'pinia';

export const useChatStore = defineStore("chat",{

    state: () => {
        return{
            onlineusers: [],
            id: [],
            messages: []
        }
    },
    getters : {

        getUserId(state){
            return state.id
        },
        getActiveUsers(state) {
            return state.onlineusers
        }
    },
    actions : {
        setUserId(userId){
            this.id = userId
        }
    }

})