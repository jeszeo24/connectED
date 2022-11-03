// Source from Jim's AuthAutho demo

import Local from "./Local";

/**
 * This is a helper class that places all "knowledge" about doing a fetch() in one place. 
 * Any component that needs to do a fetch() will import this class and call the corresponding method.
 * 
 * All methods call the internal/private _doFetch() method, which does all the work. It returns
 * a "unified" myresponse obj that has four properties:
 *   ok: true if the server response is OK, false otherwise
 *   data: the response data if OK, null otherwise
 *   status: the response status code if the server was reached; 0 otherwise
 *   error: the error message if there was either a server or network error, '' otherwise
 **/

class Api {

    /**
     * Log in a user
     **/

    static async loginUser(username, password) {
        let body = { username, password };

        return await this._doFetch("/login", "POST", body);
    }

    /**
     * Private method for internal use only
     **/

    static async _doFetch(url, method = "GET", body = null) {
        // Prepare fetch() options
        let options = {
            method,
            headers: {}
        };

        // Add token to headers if it exists in localStorage
        // NOTE: localStorage will last until deleted (even if browser/computer closed) versus sessionStorage
        let token = Local.getToken(); 
    }

}