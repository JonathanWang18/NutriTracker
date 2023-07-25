const URL = '/foodsearch';

fetch(URL).then((res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(res)
})
.then((reply) => {
    document.getElementsByClassName('cardcontainer').innerText = reply[0].label;
})
.catch((error) => {
    console.log("Something went wrong.", error);
}) 