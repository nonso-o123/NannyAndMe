//auth state
const displayName = document.getElementById('display-name');
const profileLink = document.getElementById('profile-link');

function authState(user) {
    if (user) {
        document.body.classList.add('logged-in');
        displayName.textContent = 'Hello, ' + user.displayName;
        profileLink.href = '/user.html?uid=' + user.uid;
    } else {
        document.body.classList.remove('logged-in');
    }
}

firebase.auth().onAuthStateChanged(authState);


//log out
const logoutButton = document.getElementById('logout');
logoutButton.onclick = function () {
    firebase.auth().signOut();
};
