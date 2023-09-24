function onSubmit(event) {
    event.preventDefault()
    let users = [
        {
            "userName": "admin",
            "password": "admin"
        },
        {
            "userName": "user1",
            "password": "user1@123"
        },
        {
            "userName": "user2",
            "password": "user2@123"
        }
    ]
    let valid = true;
    let isLoggedIn;
    console.log( document.getElementById('username').value)
    if( document.getElementById('username').value=="") {
        document.getElementById('uerror').innerText = 'UserName is required'
    }
    if( document.getElementById('password').value=="") {
        document.getElementById('perror').innerText = 'Password is required'
    }
    if( document.getElementById('username').value!="" || document.getElementById('password').value!="") {
        const name = document.getElementById('username').value;
        console.log(name)
        sessionStorage.setItem('username', name);
        const password = document.getElementById('password').value;
        const user = users.filter(currUser => currUser.userName === name && currUser.password === password)[0];
        console.log(user)
        if (user) {
            isLoggedIn = 'true';
            sessionStorage.setItem('isLoggedIn', isLoggedIn);
            window.location.replace('products.html');
        } else {
            isLoggedIn = 'false';
            sessionStorage.setItem('isLoggedIn',isLoggedIn);
            valid = false;
            document.getElementById('uerror').innerText = ''
            document.getElementById('perror').innerText = ''
            document.getElementById("error").innerText = 'Invalid Credentials...Please try again...'
        }
    }

}

function cancel() {
    window.location.replace('welcome.html');
}

