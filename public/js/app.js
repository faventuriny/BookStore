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
try {
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
} catch (error) {
    
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
        if(booksFounded.length === 0){
            let p = document.createElement('p')
            let node = document.createTextNode("Sorry! We cann't found the book you're looking for");
            p.appendChild(node)
            p.classList.add("not-found")
            bookContainer.appendChild(p)
        } else {
            setUpHomePage(booksFounded)
        }
        
    })
})

//Create new user

const creatNewUserForm= document.querySelector('#creat-new-user-form')

creatNewUserForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    try {
        var data = JSON.stringify({
            "name": document.querySelector('#name').value,
            "email": document.querySelector('#mail').value,
            "password": document.querySelector('#password').value
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
        }
        });

        xhr.open("POST", "http://localhost:3000/users");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

        window.location.href = "http://localhost:3000"

        
        
    } catch (error) {
        alert(error)
    }


    // xhr.send(JSON.stringify({
    //     name: 'Sandy',                  
    //     mail: 'sandy@example.com',      
    //     password: 'Sandy123!'                      
    // }));
    //document.querySelector('#name').value,
    //document.querySelector('#mail').value,
    //document.querySelector('#password').value
    
    
})

//Login




