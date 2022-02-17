const users = [];

const addUser = ({ id, username, roomname }) => {
    username = username.trim();
    roomname = roomname.trim();

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

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    return users.find((user) => {
        return user.id === id;
    })
}

const getUserInRoom = (roomname) => {
    roomname = roomname.trim();
    const userList = users.filter((user) => {
        if (user.roomname===roomname){
            return user;
        }
    })

    return userList;
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom,
};
