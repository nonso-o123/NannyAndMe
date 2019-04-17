//document.getElementById shorthand function
function get(id) {
    return document.getElementById(id);
}

//get user id from url
const uid = location.search.split('=')[1];
console.log(uid);

//reference database


//get user id from users child
const userRef = firebase.database().ref('users').child(uid);

//firebase event, any change to database
userRef.on('value', updateUser);

const profileDisplayName = get('profile-display-name');


function updateUser(snapshot) {
    const user = snapshot.val();

    if (user.photo) {
        displayPhoto(user.photo);
    }

    profileDisplayName.textContent = user.displayName;
    //    profileNameInput.placeholder = user.displayName;
    console.log(user);

}

/* update data */
const editButton = get('edit');
const editProfile = get('edit-profile');
const profileNameInput = get('edit-display-name');
const profileEditButton = get('submit-display-name');

editButton.onclick = function () {
    editProfile.style.display = 'block';
};

//profileEditButton.onclick = updateProfile;

function updateProfile() {
    const username = profileNameInput.value;
    if (username.length > 2) {
        userRef.update({
            displayName: username
        });
        editProfile.style.display = 'none';
        profileNameInput.classList.remove('error');
    } else {
        profileNameInput.placeholder = "Name must have 3 characters or more.";
        profileNameInput.classList.add('error');
    }
}

//upload profile photo
const photoInput = get('photo-input');
const photoSubmit = get('submit-photo');

photoSubmit.addEventListener('click', uploadPhoto);

function uploadPhoto() {
    const file = photoInput.files[0];
    if (file) {

        const storage = firebase.storage();
        const photoRef = storage.ref('users').child(uid).child('profile-photo');
        const promise = photoRef.put(file);

        promise.then(function (snapshot) {
            return snapshot.ref.getDownloadUrl();
        }).then(updatePhoto);

    } else {
        alert('Click Choose File');
    }

    function updatePhoto(url) {
        ref.update({
            photo: url
        });
    }

    function displayPhoto(url) {
        const profileImg = get('profile-img');
        profileImg.src = url;
        const addPhoto = get('add-photo');
        addPhoto.style.display = 'none';
    }
}
