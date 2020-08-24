function loadJSON(path) {
    return fetch(path).then(res => res.json());
}

function createPost(data) {
    const title = document.createElement('ptitle');
    const description = document.createElement('description');
    const post = document.createElement('post');

    title.innerHTML = data.title;
    description.innerHTML = data.description;

    post.appendChild(title);
    post.appendChild(description);

    return post;
}

function renderPost(post) {
    container.appendChild(post);
}

const container = document.getElementById('container');

loadJSON("./data/post.json").then((data) => {
    data.forEach((post) => {
        renderPost(createPost(post));
    });
});