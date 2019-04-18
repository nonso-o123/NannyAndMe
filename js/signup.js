//sign up
const signupButton = document.getElementById('signup');
const signupUsername = document.getElementById('signup-username');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');

console.log(signupButton, signupUsername, signupEmail, signupPassword);


function updateUser(credential) {
    const userInfo = {
        displayName: signupUsername.value
    };
    credential.user.updateProfile(userInfo);
    authState(credential.user);


    // add user to database
    const db = firebase.database();
    const ref = db.ref('users').child(credential.user.uid);
    ref.set(userInfo);
}


function createUser() {
    const email = signupEmail.value;
    const password = signupPassword.value;
    console.log(email, password);
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    promise.then(updateUser);
    promise.catch(function (error) {
        console.log(error);
        alert(error.message);
    });
}

signupButton.onclick = createUser;
