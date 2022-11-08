/**
 * All localStorage implementation is here
 * // NOTE: localStorage will last until deleted (even if browser/computer closed) versus sessionStorage
 **/

class Local {

    static saveUserInfo(token, user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user)); // stringify to convert to JSON
    }

    static removeUserInfo() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    static getToken() {
        return (localStorage.getItem("token") || "");
    }

    static getUser() {
        let userjson = localStorage.getItem("user");
        return userjson ? JSON.parse(userjson) : null; // parse to convert from JSON to javascript
    }

    static getUserId() {
        let userjson = localStorage.getItem("user");
        if (!userjson) {
            return "";
        }

        let user = JSON.parse(userjson);
        return user.id; // id as defined in users table
    }

    static getUsername() {
        let userjson = localStorage.getItem("user");
        if (!userjson) {
            return "";
        }

        let user = JSON.parse(userjson);
        return user.username; // username as defined in users table
    }

    static getisStaff() {
        let userjson = localStorage.getItem("user");
        if (!userjson) {
            return "";
        }

        let user = JSON.parse(userjson);
        return user.isStaff; // isStaff as defined in users table
    }

}

export default Local;