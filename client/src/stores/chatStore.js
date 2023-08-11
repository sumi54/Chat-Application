import {defineStore} from 'pinia';

export const useChatStore = defineStore("chat",{

    
    state: () => {
        return{
            onlineusers: [],
            id: [],
            messages:[],
            room:[],
            name:"",
            CurrentUser:"",
            CurrentId:""
            
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
        },
        getCurrentUser(state){
            return state.CurrentUser
        },
        getCurrentId(state){
            return state.CurrentId
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
        setMessages(message,roomId,from,isRead){
            let room = this.messages.find(room => room.id == roomId)
            if(room){
                room.message.push({
                    content : message,
                    from : from,
                    isRead : isRead
                })
            }else{
                this.messages.push({
                    id : roomId,
                    message : [
                        {
                            content : message,
                            from : from,
                            isRead : isRead
                        }
                    ]
                })
            }
        },
        setCurrentUser(name){
            this.CurrentUser=name
        },
        setCurrentId(id){
            this.CurrentId=id
        }
    }

    
})