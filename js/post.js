const postText = document.getElementById('write-post');
const submitPost = document.getElementById('submit-post');

const db = firebase.databse();
const ref = db.ref('posts');

//add a new post to the database
function addPost() {
    const info = {
        text: postText.value,
        date: Date(),
        uid: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName
    };

    const promise = ref.push(info);
    promise.then(function () {
        //indicate that post went through
        postText.value = '';
    });
    promise.catch(function (error) {
        alert(error.message);
    });
}

submitPost.addEventListener('click', addPost);
postText.addEventListener('keydown', function (event) {
    if (event.which == 13 || event.key == 'Enter') {
        addPost();
    }
});
