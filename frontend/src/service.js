export {Auth};


const Auth = {
    userData: {},
    error: '',

    init: function() {
        const userData = window.localStorage.getItem('userData')
        if (userData) {
            this.userData = JSON.parse(userData)
        }
    },

    login: function(username, password) {
        fetch('http://localhost:1337/api/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                identifier: username,
                password: password
            })})
        .then(response => { 
            return response.json()
        })
        .then(data => {
            // Handle success.
            console.log('Well done!');
            console.log('Response', data);
            if (data.error) {
                console.log("error condition")
                this.error = data.error.message
            } else {
                this.userData = data;
                this.error = ''
                window.localStorage.setItem('userData', JSON.stringify(this.userData))
            }
            const event = new CustomEvent("userLogin", {detail: this});
            window.dispatchEvent(event);
        })
        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
        });
    },

    getUser: function() {
        if (this.userData) {
            return this.userData.user;
        } else {
            return null;
        }
    },

    getJWT: function() {
        if (this.userData) {
            return this.userData.jwt;
        } else {
            return null;
        }    
    },

    getErrorMessage: function () { 
        if (this.error) {
            return this.error;
        } else {
            return null;
        }
    },

    logout: function() {
        this.userData = {}
        const event = new CustomEvent("userLogin", {detail: this});
        window.dispatchEvent(event);
    }
}
