const Users = [{
        username: "abc",
        pass: "123"
    },
    {
        username: "def",
        pass: "456"
    },
    {
        username: "ghi",
        pass: "789"
    }
];

function findUserByUsername(username) {
    return Users.find((user) => user.username === username);
};

const fakeApi = (username, password) => {
    console.log(username, password);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundUser = findUserByUsername(username);
            if (password === foundUser.pass) {
                resolve({
                    success: true,
                    status: 200
                });
            }
            reject({
                success: false,
                status: 401
            });
        }, 1000);
    });
};

export default fakeApi;