//get user id from url
const uid = location.search.split('=')[1];
console.log(uid);

//reference database
const db = firebase.database();

//get user id from users child
const ref = db.ref('users').child(uid);

//firebase event, any change to database
ref.on('value', updateUser);

const profileDisplayName = document.getElementById('profile-display-name');


function updateUser(snapshot) {
    const user = snapshot.val();
    profileDisplayName.textContent = user.displayName;
    console.log(user);
}
