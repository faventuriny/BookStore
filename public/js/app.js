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
            setUpHomePage(jsonObj)
            addEventclickOnCart()
            addEventClickOnPic()
        })
        .catch((err)=>{
            console.log(err); 
        })
    }
}

if(document.querySelector('.indexAdmin') !== null){
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
            setUpHomePage(jsonObj)

            addEventclickOnCart()
            addEventClickOnPicAdmin()
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

                    window.location.href = "http://localhost:3000"
                } catch(e){
                    alert(a)
                }
            }
            });
    
            xhr.open("POST", "http://localhost:3000/users");
            xhr.setRequestHeader("Content-Type", "application/json");
    
            xhr.send(data);
            
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
                    let isAdmin = JSONRes.admin

                    sessionStorage.setItem('userName', userName)
                    sessionStorage.setItem('userToken', token)
                    sessionStorage.setItem('isAdmin', isAdmin)

                    console.log("userName",sessionStorage.getItem('userName'));
                    console.log("suserToken", sessionStorage.getItem('userToken'));
                    window.location.href = "http://localhost:3000"

                }
            });

            xhr.open("POST", "http://localhost:3000/users/login");
            
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);

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
// open new page when click on book's pic ADMIN
const addEventClickOnPicAdmin = ()=>{
    document.querySelectorAll('.book-img').forEach(pic=>{
        pic.addEventListener('click', (e)=>{
            e.preventDefault()
            const bookID = pic.getAttribute('_id')
            sessionStorage.setItem('bookID', bookID)
            window.location.href = "http://localhost:3000/single-book-admin"
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
    document.querySelector('.bookDescription').innerHTML = jsonObj.bookDescription
    document.querySelector('.PublicationDate').innerHTML = jsonObj.PublicationDate
    document.querySelector('.format').innerHTML = jsonObj.Format
    document.querySelector('.book-price').innerHTML = jsonObj.bookPrice
    
}

// load single book page admin
// load single book page
if(document.querySelector('.singleBookClassAdmin') !== null){
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
            
            setUpSingleBookPageAdmin(jsonObj)
            addEventclickOnCart()
        })
        .catch((err)=>{
            console.log(err); 
        })
    }
}

const setUpSingleBookPageAdmin = (jsonObj)=>{
    changeLoginToUserName()
    
    console.log('All books obj:', jsonObj); //<< 
    document.querySelector('.book-img').src = jsonObj.img

    document.querySelector('.book-name').placeholder = jsonObj.bookName
    document.querySelector('.book-author').placeholder = jsonObj.bookAuthor
    document.querySelector('.bookDescription').innerHTML = jsonObj.bookDescription
    document.querySelector('.PublicationDate').placeholder = jsonObj.PublicationDate
    document.querySelector('.format').placeholder = jsonObj.Format
    document.querySelector('.book-price').placeholder = jsonObj.bookPrice
    document.querySelector('.bookPic').placeholder = jsonObj.img
    
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

//load cart from DB
if(document.querySelector('.ShoppingCartClass') !== null){
    window.onload = (e)=>{
        try {
            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText);
                setCartPage(JSON.parse(this.responseText))
                addEventListenerToBinIcon()
            }
            });
      
            xhr.open("GET", 'http://localhost:3000/users/books');
            xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('userToken'));
            xhr.send();

        } catch (error) {
            console.log(error); 
        }
    }
}

// set cart page 
const setCartPage = (jsonObj)=>{
    changeLoginToUserName()
    console.log(jsonObj);
    
    let sum = 0
    let total = document.querySelector('#total')


    let items = document.querySelector('.items')
    jsonObj.books.forEach(book=>{
        let item = document.createElement('div')
        item.classList.add('item')
        items.appendChild(item)

        let img = document.createElement('img')
        img.classList.add('book-img')
        img.src = book.img
        item.appendChild(img)

        let h1 = document.createElement('h1')
        h1.classList.add('book-name')
        h1.innerHTML = book.bookName
        item.appendChild(h1)

        let p = document.createElement('p')
        p.classList.add('book-price')
        p.innerHTML = book.bookPrice
        item.appendChild(p)
        sum += parseInt(book.bookPrice)
        total.innerHTML = sum


        let imgBin = document.createElement('img')
        imgBin.classList.add('bin')
        imgBin.src = "../pic/bin.png"
        imgBin.setAttribute('_id',book._id)
        item.appendChild(imgBin)
    })
    
}

// event listקner for bin icon
const addEventListenerToBinIcon = ()=>{
    let bins = document.querySelectorAll('.bin')
    bins.forEach(bin=>{
        bin.addEventListener('click',(e)=>{
            e.preventDefault()

            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText);
                window.location.href = "http://localhost:3000/shopping-cart"
            }
            });

            xhr.open("DELETE", "http://localhost:3000/users/books/" + bin.getAttribute('_id'));
            xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('userToken'));

            xhr.send();

        })
    })
}


 









