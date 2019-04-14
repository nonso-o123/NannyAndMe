const reviewText = document.getElementById('write-review');
const submitReview = document.getElementById('submit-review');

const db = firebase.databse();
const ref = db.ref('reviews');

//add a new review to the database
function addReview() {
    const info = {
        text: reviewText.value,
        date: Date(),
        uid: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName
    };

    const promise = ref.push(info);
    promise.then(function () {
        //indicate that review went through
        reviewText.value = '';
    });
    promise.catch(function (error) {
        alert(error.message);
    });
}

submitReview.addEventListener('click', addReview);
reviewText.addEventListener('keydown', function (event) {
    if (event.which == 13 || event.key == 'Enter') {
        addReview();
    }
});
