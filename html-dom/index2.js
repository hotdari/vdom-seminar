const fetchButton = document.querySelector(".fetch");
const postLi = document.createElement("li");
const postTitle = document.createElement("p");
const postBody = document.createElement("p");

fetchButton.addEventListener('click', (e) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {method: 'GET'})
        .then(res => {
            if (res.status === 200) return res.json()
            else console.error(res.statusText);
        }).then(res => {
            const text = document.createTextNode(res[0].title)
            postTitle.appendChild(text)
            document.querySelector('ul').appendChild(postTitle)
        })
})