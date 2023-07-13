import {defineStore} from 'pinia';

export const useChatStore = defineStore("chat",{


    // messages: [
    //     {
    //         id : "123456",
    //         messages : [
    //             "selam",
    //             "deneme"
    //         ]
    //     },
    //     {
    //         id : "46677",
    //         message : [
    //             "asdasd",
    //             "sdfsdf",
    //             "son mesaj"
    //         ]
    //     }
    // ]

    
    state: () => {
        return{
            onlineusers: [],
            id: [],
            messages : [],
            room:[]
        }
    },
    getters : {

        getUserId(state){
            return state.id
        },
        getActiveUsers(state) {
            return state.onlineusers
        },
        getRoom(state){
            return state.room
        }
        
    },
    actions : {
        setUserId(userId){
            this.id = userId
        },
        setRoom(userid){
            this.room=userid
        }
    }

    
})