// Show All Books at home page


let allBooksURL = "http://localhost:3000/books" 
let bookContainer = document.querySelector(".books-inner")

const setUpHomePage = (jsonObj) => {
    console.log(jsonObj);
    jsonObj.forEach((book)=>{
        let bookDetails = document.createElement('div') 
        bookDetails.classList.add("book-details")
        bookContainer.appendChild(bookDetails)

        let bookImg = document.createElement('img')
        bookImg.src = book.img
        bookImg.classList.add("book-img")
        bookDetails.appendChild(bookImg)

        let bookHeader = document.createElement('h1')
        bookHeader.classList.add("book-name")
        let node = document.createTextNode(book.bookName);
        bookHeader.appendChild(node)
        bookDetails.appendChild(bookHeader) //book-name

        let bookPriceCart = document.createElement('div')
        bookPriceCart.classList.add("book-price-cart")
        bookDetails.appendChild(bookPriceCart)

        let bookPrice = document.createElement('p')
        node = document.createTextNode(book.bookPrice);
        bookPrice.appendChild(node)
        bookPrice.classList.add("book-price")
        bookPriceCart.appendChild(bookPrice)

        let dolar = document.createElement('p')
        node = document.createTextNode("$");
        dolar.appendChild(node)
        dolar.classList.add("book-price")
        bookPriceCart.appendChild(dolar)

        let a = document.createElement('a')
        bookPriceCart.appendChild(a)

        let img = document.createElement('img') 
        img.src = "./pic/cart_pic.png"
        a.appendChild(img)
    })
}


window.onload = (e)=>{
    fetch(allBooksURL, {
        method: 'GET'
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        } else {
            throw new Error(res.status)
        }
    })
    .then((jsonObj) => setUpHomePage(jsonObj))
    .catch((err)=>{
        console.log(err); 
    })
}

// search and show a book 
const searchForm = document.querySelector('#search-form')

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let bookToSearch = document.querySelector('#search-text').value
    
    bookToSearch = bookToSearch.trim()
    bookToSearch =bookToSearch.toLowerCase()

    let booksFounded = []

    fetch(allBooksURL, {
        method: 'GET'
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        } else {
            throw new Error(res.status)
        }
    })
    .then((jsonObj)=>{
        jsonObj.forEach(book => {
            let lowerCaseBook = book.bookName.toLowerCase()
            if(lowerCaseBook.indexOf(bookToSearch)>=0){
                booksFounded.push(book)
            }
        })
        bookContainer.innerHTML = ''; //cleanHomePage
        setUpHomePage(booksFounded)
    
    })
})



