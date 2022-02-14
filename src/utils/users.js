const user = {};

const addUser = ({id, username, roomname}) =>{
    const username = username.trim();
    const roomname = roomname.trim();

    if(!username||!roomname){
        return {
            error: "Invalid Username or Room",
        }
    }
}