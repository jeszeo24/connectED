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
     * Private method for internal use only
     * general "do a fetch" function
     **/

      static async _doFetch(url, method = 'GET', body = null) {
        // Prepare fetch() options
        // What you see in the payload, is the options below
        let options = { 
            method,
            headers: {}
        };

        // Add token to headers if it exists in localStorage
        let token = Local.getToken();
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }

        // Add the body if one is supplied
        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        // Do the fetch() and store the results in a "unified" myresponse obj
        let myresponse = { ok: false, data: null, status: 0, error: '' };
        try {
            let response = await fetch(url, options);
            console.log(options);
            if (response.ok) {
                myresponse.ok = true;
                myresponse.data = await response.json();
                myresponse.status = response.status;
            } else {
                myresponse.status = response.status;
                myresponse.error = response.statusText;
            }
        } catch (err) {
            myresponse.error = err.message;
        }
        return myresponse;
    }


   // Log in a user
    static async loginUser(username, password) {
        let body = { username, password };

        return await this._doFetch('/login', 'POST', body);
    }

    //  register a user
    static async newUser(email, username, password, isStaff) {
        let body = { email, username, password, isStaff };

        return await this._doFetch("/register", "POST", body);
    }
    
    // Get all users 
    static async getUsers() {
        return await this._doFetch('/users');
    }

    // Get data for user with ID 'userId'
    static async getUser(userId) {
        return await this._doFetch(`/users/${userId}`);
    }

    // General purpose GET (for URLs like /members-only)
    static async getContent(url) {
        return await this._doFetch(url);
    }

    // Get a group by id?
    static async getGroupChat(groupId) {
    return await this._doFetch(`/chat/${groupId}`);
  }

  // Add Note
  // NOTE: function calls the back-end
  // Backend says, call me at the addres "/note"
  // Send me the info, and I will do the post
  
  static async addNote(note) { // the note here has to match the one below
    // what you are expecting to receive
      return await this._doFetch("/note", "POST", note)
      // what we're doing with what we received
  }
  // QUESTION: How does it know what properties are in the body/note?

  // NOTE: Alternatively the below:
//   static async addNote(noteDate, title, note, user_id) {
//       let body = { noteDate, title, note, user_id }
//     return await this._doFetch("/note", "POST", body)
// }

}

export default Api;