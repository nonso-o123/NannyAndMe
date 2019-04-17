//log in
const loginButton = document.getElementById('login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

loginButton.onclick = function () {
    const email = loginEmail.value;
    const password = loginPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password);
};
