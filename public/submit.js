

let results = []
let currentQuery = ''
const pageTotal = 10;
let currentPage = ''


const appendPageNum = (index) => {
    const pageNum = document.createElement('button')
    pageNum.className = 'pagination-number'
    pageNum.innerHTML = index
    pageNum.setAttribute('page-index', index)
    pageNum.setAttribute('aria-label', 'Page ' + index)
    if (pageNum.getAttribute('page-index') == 1) {
        pageNum.classList += ' active';
    }
    document.getElementById('pagination-numbers').appendChild(pageNum)
}

const loadPageNumbers = (numPages) => {
  for (i = 1; i <= numPages; i++) {
    appendPageNum(i);
  }  
}

const setCurrentPage = (pageNum) => {
    const total = results.length
    const numPages = Math.ceil(total / pageTotal)
    let pageList = document.getElementsByClassName('pagination-number')
    currentPage = pageNum;
    buildResult(pageTotal, currentPage)
    console.log('setCurrentPage pageNum clicked is ' + currentPage)
    for (i = 0; i < pageList.length; i++) {
        if (pageList[i].classList.contains('active')) {
            pageList[i].classList.remove('active');
        }
        if (pageList[i].getAttribute('page-index') == pageNum) {
            pageList[i].className += " active"
        }
        
    }
};
  
const getCurrentPage = (pageNum) => {
    return currentPage
}

function createCard(index) {
    
    let temp = document.getElementsByTagName("template")[0];
    let clone = temp.content.cloneNode(true);
    let brandName = 'Generic'
    if (results[index].brand == undefined) {
        results[index].brand = brandName
    }
    clone.querySelector('.card-title').innerText = results[index].label
    clone.querySelector('.brandName').innerText = results[index].brand
    clone.querySelector('.proteinstats').innerText = results[index].protein
    clone.querySelector('.carbstats').innerText = results[index].carb
    clone.querySelector('.fatstats').innerText = results[index].fat
    document.getElementsByClassName('cards')[0].appendChild(clone)
}

function buildResult(pageSize, pageNum) {
    console.log('buildResults RAN')

    const total = results.length
    const numPages = Math.ceil(total / pageSize)
    let cardContainer = document.getElementsByClassName('cards')[0]
    let cardList = cardContainer.getElementsByClassName('foodItem')
    let startResultIndex = 0
    let lastResultIndex = ((pageNum * pageSize) -1)

    document.getElementById('pagination-numbers').innerHTML = ''

    while (cardList[0]) {
        cardContainer.removeChild(cardList[0]);
    }
    console.log('CurrentPage: '+ pageNum)

    if (pageNum > 1) { //if currentPage is past page 1 pagination, starting result index will change accordingly
        startResultIndex += 10 * (pageNum - 1)
        console.log('starresultindex CONDITION IS TRUE')
    }

    console.log('creating card indexes from ' + startResultIndex + ' to ' + ((pageNum * pageSize) -1))
    for (let i = startResultIndex; i < lastResultIndex; i++) { //loop from specific result indexes based on current page and results per page
        if (results[i] != undefined) {
            createCard(i)
        }
        else {
            break;
        }
    }
    
    loadPageNumbers(numPages)
    
    
}

function getData() {
    console.log('getData RAN')
    const URL = '/foodsearch';
    const param = new URLSearchParams()
    param.append('searchbar', document.getElementById('query').value)
    if (document.getElementById('query').value == "") {
        return;
    }
    else if (document.getElementById('query').value == currentQuery){
        return
    }
    currentQuery = document.getElementById('query').value
    fetch(URL+'?'+param.toString()).then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(res)
    })
    .then((reply) => {
        let currentPage = 1;
        results = reply['results']
        buildResult(pageTotal, currentPage)
    
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

document.querySelector('.pagination-container').addEventListener('click', function (e) {
    console.log(e.target.id)
    let cardContainer = document.getElementsByClassName('cards')[0]
    let cardList = cardContainer.getElementsByClassName('foodItem')
    if (e.target.classList.contains('pagination-number')) {
        const pageIndex = Number(e.target.getAttribute("page-index"))
        
        setCurrentPage(pageIndex)
    }
    else if (e.target.id == 'prev-button') {
        console.log('Next Button triggered')
        const lastPage = getCurrentPage() - 1;
        if (lastPage >= 1) {
            setCurrentPage(lastPage)
        }
    }
    else if (e.target.id == 'next-button') {
        console.log('Next Button triggered')
        const nextPage = getCurrentPage() + 1;
        const total = results.length
        const numPages = Math.ceil(total / pageTotal)
        if (nextPage <= numPages) {
            setCurrentPage(nextPage)
        }
    }   
  });
