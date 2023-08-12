

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
        const total = reply['results'].length
        const pageSize = 10;
        const numPages = Math.ceil(total / pageSize)
        if (document.getElementsByClassName('cards')[0].childNodes.length > 0) {
            document.getElementsByClassName('cards')[0].innerHTML = '';
        }
        console.log("WORKING WITH JSON")
        var cardContain = document.getElementsByClassName("cards")[0]
        cardContain.classList.add('cardcontainer')
        for (var i = 0; i < pageSize; i++) {
            var item = document.createElement('div')
            item.classList.add('card')
            item.classList.add('foodItem')
            var body = document.createElement('div')
            body.classList.add('cardbody')
            
            var cardtitle = document.createElement('p')
            cardtitle.classList.add('card-title')
            cardtitle.classList.add('titleStyle')


            var brandItem = reply['results'][i].brand;
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
            var cardtext = document.createElement('div')
            cardtext.classList.add('card-text')

            for (var j = 0; j < statistics.length; j++) {
                var itemtext = document.createElement('p')
                itemtext.classList.add('stats')
                itemtext.appendChild(statistics[j])
                cardtext.appendChild(itemtext)

            }
            body.appendChild(cardtext)
            item.appendChild(body)
            if (i % 2 == 0) {
                item.classList.add("grayBG")
            }
            document.getElementsByClassName('cards')[0].appendChild(item);
        }
        //document.getElementsByClassName('cardcontainer')[0].innerText = reply['results'][0].label;
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