let results = []


function createCard(index) {
    if (document.getElementsByClassName('cards')[0].childNodes.length > 0) {
        document.getElementsByClassName('cards')[0].innerHTML = '';
    }

    let temp = document.getElementById('cardTemp')
    let cardClone = temp.cloneNode(true)

    cardClone.querySelector(".proteinstats").innerText = results[index].protein
    cardClone.querySelector(".carbstats").innerText = results[index].carb
    cardClone.querySelector(".fatstats").innerText = results[index].fat
    cardClone.querySelector(".fatstats").innerText = results[index].brand
    /*if (index % 2 == 0) {
        cardClone.querySelector(card).add("grayBG") // DOES NOT WORK 
    }*/
    
    document.getElementsByClassName('cards')[0].appendChild(cardClone);


    /*let cardContain = document.getElementsByClassName("cards")[0]
    cardContain.classList.add('cardcontainer')
        let item = document.createElement('div')
        item.classList.add('card')
        item.classList.add('foodItem')
        let body = document.createElement('div')
        body.classList.add('cardbody')
        
        let cardtitle = document.createElement('p')
        cardtitle.classList.add('card-title')
        cardtitle.classList.add('titleStyle')


        let brandItem = reply['results'][i].brand;
        if (brandItem === undefined) {
            brandItem = 'Generic'
        }
        const brandlabel = document.createTextNode(brandItem);
        const titlelabel = document.createTextNode(reply['results'][i].label)
        const calories = document.createTextNode('Calories: ' + reply['results'][i].cal)
        const protein = document.createTextNode('Protein: ' + reply['results'][i].protein)
        const carbs = document.createTextNode('Carbs: ' + reply['results'][i].carb)
        const fat = document.createTextNode('Fat: ' + reply['results'][i].fat)

        const statistics = []
        statistics.push(calories)
        statistics.push(protein)
        statistics.push(carbs)
        statistics.push(fat)

        cardtitle.appendChild(titlelabel);
        
        body.appendChild(cardtitle)
        body.appendChild(brandlabel)
        let cardtext = document.createElement('div')
        cardtext.classList.add('card-text')

        for (let j = 0; j < statistics.length; j++) {
            let itemtext = document.createElement('p')
            itemtext.classList.add('stats')
            itemtext.appendChild(statistics[j])
            cardtext.appendChild(itemtext)

        }
        body.appendChild(cardtext)
        item.appendChild(body)
        if (i % 2 == 0) {
            item.classList.add("grayBG")
        }
        document.getElementsByClassName('cards')[0].appendChild(item);*/
}

function buildResult(pageSize, pageNum) {
    const total = reply['results'].length
    const numPages = Math.ceil(total / pageSize)
    const startPage = 10 * pageNum
    if (pageNum > 0) { //if currentPage is past page 1 pagination, add 1 to starting foodResult index
        startPage += 1
    }
    for (let i = startPage; i < pageSize; i++) {
        createCard(i);
    }
    
}

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
        const pageSize = 10;
        results = reply['results']
        
        buildResult(pageSize, 0) // Page 1 denoted as 0
    })
    .catch((error) => {
        console.log("Something went wrong.", error);
    }) 
}
document.querySelector('#query').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      getData()
    }
})
document.getElementsByClassName('searchbutton')[0].addEventListener("click", getData)