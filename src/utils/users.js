const users = {};

const addUser = ({ id, username, roomname }) => {
    const username = username.trim();
    const roomname = roomname.trim();

    if (!username || !roomname) {
        return {
            error: "Invalid Username or Room",
        }
    }

    const existingUser = users.find((user) => {
        return user.roomname === roomname && user.username === username;
    })

    if (existingUser) {
        return {
            error: "Username already in use!"
        }
    }

    const user = { id, username, roomname };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id;
    })

    if(index!==-1){
        return users.splice(index, 1)[0];
    }
}