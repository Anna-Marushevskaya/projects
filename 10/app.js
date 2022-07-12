const root = document.getElementById('root');
const twoThousand = 2000;
const minusOne = -1;
const one = 1;
const oneHundredFourty = 140;

let tweetts = [];

document.getElementById('modifyItem').style.display = 'none';

window.onload = function () {
    if (localStorage.getItem('tweetts')) {
        tweetts = JSON.parse(localStorage.getItem('tweetts'));
    }
    showTweets();
};

window.onpopstate = function () {
    if (parent.location.hash === '#/main') {
        showTweets();
    } else if (parent.location.hash === '#/add') {
        document.getElementById('modifyItem').style.display = 'block';
        document.getElementById('tweetItems').style.display = 'none';
    } else if (parent.location.hash === '#/liked') {
        showLikedTweets();
    } else if (parent.location.hash.indexOf('edit') !== minusOne) {
        document.getElementById('modifyItem').style.display = 'block';
        document.getElementById('tweetItems').style.display = 'none';
        let hash = parent.location.hash.split('/');
        let ind = hash[hash.length - one];
        document.getElementById('modifyItemInput').value = tweetts[ind].text;
        currentTweet = Number(tweetts[ind].id);
    }
};

let addTweet = document.getElementsByClassName('addTweet');
addTweet[0].onclick = addTweetFuncion;

function addTweetFuncion () {
    history.pushState({
        page: 'add'
    }, 'add', '#/add');
    let addTweetsPage = document.createElement('div');
    addTweetsPage.id = 'likedTweetsPage';
    addTweetsPage.innerHTML = '<h1>Add Tweet</h1';
    let addTextArea = document.createElement('textarea');
    addTextArea.id = 'addTextArea';
    addTweetsPage.appendChild(addTextArea);
    let divButtonsAddTweet = document.createElement('div');
    let cancelModifiAddTweet = document.createElement('button');
    cancelModifiAddTweet.innerHTML = 'Cancel';
    cancelModifiAddTweet.onclick = showTweets;
    let saveModifiAddTweet = document.createElement('button');
    saveModifiAddTweet.innerHTML = 'Save Changes';
    saveModifiAddTweet.onclick = addNewTweet;
    divButtonsAddTweet.appendChild(cancelModifiAddTweet);
    divButtonsAddTweet.appendChild(saveModifiAddTweet);
    addTweetsPage.appendChild(divButtonsAddTweet);
    document.getElementById('modifyItem').style.display = 'block';
    document.getElementById('tweetItems').style.display = 'none';
    document.getElementById('modifyItem').style.display = 'none';
    root.appendChild(addTweetsPage);
}

function addNewTweet() {
    let textTweet = document.getElementById('addTextArea').value;
    if (textTweet === '' || textTweet.length > oneHundredFourty) {
        return;
    }
    for (let i = 0; i < tweetts.length; i++) {
        if (tweetts[i].text === textTweet) {
            document.getElementById('alertMessage').style.display = 'block';
            document.getElementById('alertMessageText').innerHTML = 'Error! You can`t tweet about that';
            setTimeout(function () {
                document.getElementById('alertMessage').style.display = 'none';
            }, twoThousand);
            return;
        }
    }
    if (currentTweet !== minusOne) {
        tweetts[currentTweet].text = textTweet;
    } else {
        tweetts.push({
            'id': tweetts.length,
            'text': textTweet,
            'isLiked': false
        });
    }
    currentTweet = minusOne;
    document.getElementById('addTextArea').value = '';
    localStorage.setItem('tweetts', JSON.stringify(tweetts));
    showTweets();
}

let saveModifiedItem = document.getElementById('saveModifiedItem');
saveModifiedItem.onclick = saveTweet;

function saveTweet() {
    let text = document.getElementById('modifyItemInput').value;
    if (text === '' || text.length > oneHundredFourty) {
        return;
    }
    for (let i = 0; i < tweetts.length; i++) {
        if (tweetts[i].text === text) {
            document.getElementById('alertMessage').style.display = 'block';
            document.getElementById('alertMessageText').innerHTML = 'Error! You can`t tweet about that';
            setTimeout(function () {
                document.getElementById('alertMessage').style.display = 'none';
            }, twoThousand);
            return;
        }
    }
    if (currentTweet !== minusOne) {
        tweetts[currentTweet].text = text;
    } else {
        tweetts.push({
            'id': tweetts.length,
            'text': text,
            'isLiked': false
        });
    }
    currentTweet = minusOne;
    document.getElementById('modifyItemInput').value = '';
    localStorage.setItem('tweetts', JSON.stringify(tweetts));
    showTweets();
}

function showTweets() {
    history.pushState({
        page: 'main'
    }, 'main', '#/main');
    if (document.getElementById('likedTweetsPage')) {
        root.removeChild(document.getElementById('likedTweetsPage'));
    }
    document.getElementById('tweetItems').style.display = 'block';
    document.getElementById('modifyItem').style.display = 'none';
    let ul = document.getElementById('list');
    ul.innerHTML = '';
    let isLikedTweets = false;
    for (let i = 0; i < tweetts.length; i++) {
        let liTweet = document.createElement('li');
        let spanLiTweet = document.createElement('span');
        spanLiTweet.id = tweetts[i].id;
        spanLiTweet.textContent = tweetts[i].text;
        spanLiTweet.onclick = editTweet;
        let remove = document.createElement('button');
        remove.className = 'remove';
        remove.id = tweetts[i].id;
        remove.onclick = removeTweet;
        remove.innerHTML = 'remove';
        let like = document.createElement('button');
        like.className = 'like';
        like.id = tweetts[i].id;
        like.onclick = likeTweet;
        like.innerHTML = 'like';
        if (tweetts[i].isLiked) {
            like.innerHTML = 'unlike';
            isLikedTweets = true;
        }
        liTweet.appendChild(spanLiTweet);
        liTweet.appendChild(remove);
        liTweet.appendChild(like);
        ul.appendChild(liTweet);
    }
    let navigationButtons = document.getElementById('navigationButtons')
    if (document.getElementById('goToLiked')) {
        navigationButtons.removeChild(document.getElementById('goToLiked'));
    }
    if (isLikedTweets) {
        let goToLiked = document.createElement('button');
        goToLiked.id = 'goToLiked';
        goToLiked.innerHTML = 'Go to liked';
        goToLiked.onclick = showLikedTweets;
        navigationButtons.appendChild(goToLiked);
    }
}

let cancelModification = document.getElementById('cancelModification');
cancelModification.onclick = showTweets;

let currentTweet = -1;

function editTweet(e) {
    document.getElementById('modifyItem').style.display = 'block';
    document.getElementById('tweetItems').style.display = 'none';
    let findId = tweetts.filter(function (k) {
        return k.id === Number(e.target.id);
    });
    history.pushState({
        page: 'edit'
    }, 'edit', '#/edit/' + findId[0].id);
    document.getElementById('modifyItemInput').value = findId[0].text;
    currentTweet = Number(findId[0].id);
}

function removeTweet(e) {
    tweetts.splice(e.target.id, 1);
    if (document.getElementById('likedTweetsPage')) {
        root.removeChild(document.getElementById('likedTweetsPage'));
        showLikedTweets();
    } else {
        showTweets();
    }
    localStorage.setItem('tweetts', JSON.stringify(tweetts));
}

function likeTweet(e) {
    let findId = tweetts.filter(function (k) {
        return k.id === Number(e.target.id);
    });
    let id = tweetts.indexOf(findId[0]);
    tweetts[id].isLiked = !tweetts[id].isLiked;
    if (e.target.innerText === 'like') {
        e.target.innerHTML = 'unlike';
        document.getElementById('alertMessage').style.display = 'block';
        document.getElementById('alertMessageText').innerHTML = `Hooray! You liked 
        tweet with id ` + tweetts[id].id + `!`;
        setTimeout(function () {
            document.getElementById('alertMessage').style.display = 'none';
        }, twoThousand);
    } else if (e.target.innerText === 'unlike') {
        e.target.innerHTML = 'like';
        document.getElementById('alertMessage').style.display = 'block';
        document.getElementById('alertMessageText').innerHTML = `Sorry you no longer like 
        tweet with id ` + tweetts[id].id + `!`;
        setTimeout(function () {
            document.getElementById('alertMessage').style.display = 'none';
        }, twoThousand);
    }
    if (document.getElementById('likedTweetsPage')) {
        root.removeChild(document.getElementById('likedTweetsPage'));
        showLikedTweets();
    } else {
        showTweets();
    }
    localStorage.setItem('tweetts', JSON.stringify(tweetts));
}

function showLikedTweets() {
    history.pushState({
        page: 'liked'
    }, 'liked', '#/liked');
    document.getElementById('tweetItems').style.display = 'none';
    let likedTweetsPage = document.createElement('div');
    likedTweetsPage.id = 'likedTweetsPage';
    likedTweetsPage.innerHTML = '<h1>Liked Tweets</h1';
    let navLikedTweetsPage = document.createElement('div');
    navLikedTweetsPage.id = 'navLikedTweetsPage';
    let backButton = document.createElement('button');
    backButton.id = 'backButton';
    backButton.innerHTML = 'back';
    backButton.onclick = showTweets;
    let ulLikedTweetsPage = document.createElement('ul');
    ulLikedTweetsPage.id = 'ulLikedTweetsPage';
    let remove = document.createElement('button');
    remove.id = 'remove';
    remove.onclick = removeTweet;
    remove.innerHTML = 'remove';
    ulLikedTweetsPage.appendChild(remove);
    navLikedTweetsPage.appendChild(backButton);
    likedTweetsPage.appendChild(navLikedTweetsPage);

    ulLikedTweetsPage.innerHTML = '';
    for (let i = 0; i < tweetts.length; i++) {
        if (tweetts[i].isLiked) {
            let liTweet = document.createElement('li');
            let spanLiTweet = document.createElement('span');
            spanLiTweet.id = tweetts[i].id;
            spanLiTweet.textContent = tweetts[i].text;
            spanLiTweet.onclick = editTweet;
            let remove = document.createElement('button');
            remove.id = tweetts[i].id;
            remove.onclick = removeTweet;
            remove.innerHTML = 'remove';
            let like = document.createElement('button');
            like.id = tweetts[i].id;
            like.onclick = likeTweet;
            like.innerHTML = 'unlike';
            liTweet.appendChild(spanLiTweet);
            liTweet.appendChild(remove);
            liTweet.appendChild(like);
            ulLikedTweetsPage.appendChild(liTweet);
        }
    }
    likedTweetsPage.appendChild(ulLikedTweetsPage);
    root.appendChild(likedTweetsPage);
}