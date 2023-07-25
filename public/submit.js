
console.log("EVENT REGISTER")


function getData() {
    const URL = '/foodsearch';
    const param = new URLSearchParams()
    param.append('searchbar', document.getElementById('query').value)
    if (document.getElementById('query').value == "") {
        return;
    }
    fetch(URL+'?'+param.toString()).then((res) => {
        if (res.ok) {
            console.log("RES OK")
            return res.json()
        }
    console.log("RES NOT OK")
        return Promise.reject(res)
    })
    .then((reply) => {
        console.log("WORKING WITH JSON")
        document.getElementsByClassName('cardcontainer')[0].innerText = reply['results'][0].label;
    })
    .catch((error) => {
        console.log("Something went wrong.", error);
    }) 
}
document.getElementsByClassName('searchbutton')[0].addEventListener("click", getData)