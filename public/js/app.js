// Show All Books at home page

let allBooksURL = "http://localhost:3000/books" 
let hiddenObj

const changeLoginToUserName = ()=>{
    console.log("user name:",sessionStorage.getItem('userName'));
    console.log("token",sessionStorage.getItem('userToken'));
    
    if(sessionStorage.getItem('userName') !== null){ 
        try {
            let loginA = document.querySelector('#loginA')
            loginA.innerHTML = sessionStorage.getItem('userName') + ' is connected'
            loginA.href = 'http://localhost:3000'
        } catch (error) {
            
        }
    }
}

const setUpHomePage = (jsonObj) => {  
    changeLoginToUserName()
    let bookContainer = document.querySelector(".books-inner")
    console.log('All books obj:', jsonObj); //<< 
    
    jsonObj.forEach((book)=>{
        let bookDetails = document.createElement('div') 
        bookDetails.classList.add("book-details")
        bookContainer.appendChild(bookDetails)

        let bookImg = document.createElement('img')
        bookImg.src = book.img
        bookImg.classList.add("book-img")
        bookImg.setAttribute('_id',book._id)
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

        // let a = document.createElement('a')
        // a.href = ""
        // a.classList.add('cartIcon')
        // a.setAttribute('_id',book._id)
        // bookPriceCart.appendChild(a)

        let img = document.createElement('img') 
        img.src = "./pic/cart_pic.png"
        img.classList.add('cartIcon')
        img.setAttribute('_id',book._id)
        bookPriceCart.appendChild(img)
    })
}
window.onload = (e) => {
    changeLoginToUserName()
}

if(document.querySelector('.indexClass') !== null){
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
        .then(async (jsonObj) => {
            await setUpHomePage(jsonObj)
            addEventclickOnCart()
            addEventClickOnPic()
        })
        .catch((err)=>{
            console.log(err); 
        })
    }
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

        const section2 = document.querySelector('#section2')
        section2.innerHTML = '';

        const booksDiv = document.createElement('div')
        booksDiv.classList.add('books')
        section2.appendChild(booksDiv)

        const booksInnerDiv = document.createElement('div')
        booksInnerDiv.classList.add('books-inner')
        booksDiv.appendChild(booksInnerDiv)

        if(booksFounded.length === 0){
            let p = document.createElement('p')
            let node = document.createTextNode("Sorry! We cann't found the book you're looking for");
            p.appendChild(node)
            p.classList.add("not-found")
            booksInnerDiv.appendChild(p)

        } else {
            setUpHomePage(booksFounded)
        }
        
    })
})

// Create new user
if(document.querySelector('.newUserClass') !== null){
    const creatNewUserForm= document.querySelector('#creat-new-user-form')

    creatNewUserForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        
        try {
            let data = JSON.stringify({
                "name": document.querySelector('#name').value,
                "email": document.querySelector('#mail').value,
                "password": document.querySelector('#password').value
            });
    
            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
    
            xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log('responseText:',this.responseText);
                try{
                    let JSONRes = JSON.parse(this.responseText) 

                    let userName =  JSONRes.user.name
                    let token = JSONRes.token

                    sessionStorage.setItem('userName', userName)
                    sessionStorage.setItem('userToken', token)
                } catch(e){
                    alert(a)
                }
            }
            });
    
            xhr.open("POST", "http://localhost:3000/users");
            xhr.setRequestHeader("Content-Type", "application/json");
    
            xhr.send(data);


            setTimeout(() => {
                window.location.href = "http://localhost:3000"
            }, 1500);
            
        } catch (error) {
            alert("Something went wrong. Please try again")
        }
    })
}

//Login
if(document.querySelector('.loginClass') !== null){
    
    const loginForm = document.querySelector("#login-form")
    loginForm.addEventListener('submit', (e)=>{
        
        e.preventDefault()

        try {
            let data = JSON.stringify({
                "email": document.querySelector('#mail').value,
                "password": document.querySelector('#password').value
            });
            
            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
            
                    let JSONRes = JSON.parse(this.responseText) 
                    let userName =  JSONRes.user.name
                    let token = JSONRes.token

                    sessionStorage.setItem('userName', userName)
                    sessionStorage.setItem('userToken', token)

                    console.log("userName",sessionStorage.getItem('userName'));
                    console.log("suserToken", sessionStorage.getItem('userToken'));

                }
            });

            xhr.open("POST", "http://localhost:3000/users/login");
            
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);
            setTimeout(() => {
                window.location.href = "http://localhost:3000"
            }, 1500);
        } catch (error) {
            alert("Something went wrong. The email or password is incorrect")
        }
    })
}

// open new page when click on book's pic
const addEventClickOnPic = ()=>{
    document.querySelectorAll('.book-img').forEach(pic=>{
        pic.addEventListener('click', (e)=>{
            e.preventDefault()
            const bookID = pic.getAttribute('_id')
            sessionStorage.setItem('bookID', bookID)
            window.location.href = "http://localhost:3000/single-book"
        })
    })
}

// load single book page
if(document.querySelector('.singleBookClass') !== null){
    window.onload = (e)=>{
        let url = 'http://localhost:3000/books/' + sessionStorage.getItem('bookID')
        fetch(url, {
            method: 'GET'
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            } else {
                throw new Error(res.status)
            }
        })
        .then(async (jsonObj) => {
            console.log('jsonObj', jsonObj);
            
            await setUpSingleBookPage(jsonObj)
            addEventclickOnCart()
        })
        .catch((err)=>{
            console.log(err); 
        })
    }
}

const setUpSingleBookPage = (jsonObj)=>{
    changeLoginToUserName()
    
    let bookContainer = document.querySelector(".section2-inner")
    console.log('All books obj:', jsonObj); //<< 
    document.querySelector('.book-img').src = jsonObj.img
    document.querySelector('.book-name').innerHTML = jsonObj.bookName
    document.querySelector('.book-author').innerHTML = jsonObj.bookAuthor
    document.querySelector('.book-price').innerHTML = jsonObj.bookPrice
    
}

//push book to cart
const addEventclickOnCart = () => {
    document.querySelectorAll('.cartIcon').forEach(cartIcon=>{
        cartIcon.addEventListener('click',(e)=>{
            e.preventDefault()

            try {
                let xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
                }
                });
                
                const bookID = cartIcon.getAttribute('_id')
                let url = 'http://localhost:3000/users/add-book/' + bookID

                xhr.open("PATCH", url);
                xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('userToken'));
                console.log("before xhr.send");
                xhr.send();
                console.log("after xhr.send");
            } catch (error) {
                console.log(error); 
            }
        })
    })
}



 









