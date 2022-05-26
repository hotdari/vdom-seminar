const fetchButton = document.querySelector(".fetch");
const timeArea = document.querySelector(".time");
fetchButton.addEventListener('click', (e) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {method: 'GET'})
        .then(res => {
            if (res.status === 200) return res.json()
            else console.error(res.statusText);
        }).then(res => {
            let html = '';
            for (let i = 0; i<res.length; i++) {
                html += `<li>
                        <p class="post_title">${res[i].title}</p>
                        <p class="post_body">${res[i].body}</p>
                    </li>`;
            }
            return html;
        }).then(res => {
            document.querySelector('ul').innerHTML = res;
        })
})