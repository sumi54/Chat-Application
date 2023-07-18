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
    //herkesin id'sini buraya koy ve o id'ye atılan mesajları da al
    
    state: () => {
        return{
            onlineusers: [],
            id: [],
            messages:[],
            room:[],
            name:"",
            
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
            
        },
        getUserName(state){
            return state.name
        },
        getMessages(state){
            return state.messages
        }
        
    },
    actions : {
        setUserId(userId){
            this.id = userId
        },
        setRoom(userid){
            this.room=userid
        },
        setUserName(userName){
            this.name=userName
        },
        setMessages(message,roomId){

            let room = this.messages.find(room => room.id == roomId)

            if(room){
                room.message.push(message)
            }else{
                this.messages.push({
                    id : roomId,
                    message : [message]
                })
            }

            console.log(this.messages);

            // console.log('ASD');
            // console.log(room);
            // console.log(this.messages);
        }
    }

    
})