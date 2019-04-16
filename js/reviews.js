const reviewsDiv = document.getElementById('reviews');
const reviewRef = firebase.database().ref('reviews');

ref.on('child_added', function (snapshot) {
    createReview(snapshot.val());
});

function el(tag, clas) {
    const element = document.createElement(tag);
    element.classList.add(clas);
    return element;
}

function createReview(review) {
    const reviewDiv = el('div', 'review');
    const reviewText = el('div', 'review-text');
    reviewText.textContent = review.text;
    reviewDiv.appendChild(reviewText);

    const reviewInfo = el('div', 'review-info');

    const author = el('span', 'author');
    author.textContent = review.displayName;

    const date = el('span', 'date');
    date.textContent = review.date.split(' ').slice(0, 4).join(' ');

    reviewInfo.innerHTML += "by ";
    reviewInfo.appendChild(author);
    reviewInfo.innerHTML += "on ";
    reviewInfo.appendChild(date);

    reviewDiv.appendChild(reviewInfo);
    reviewsDiv.insertBefore(reviewDiv, reviewsDiv.firstElementChild);
}
