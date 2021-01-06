const searchForm = document.querySelector('#search-form')

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const searchText = document.querySelector('#search-text').value
    if(isAMatch(searchText, books)){ //<<< איך אני מושכת לפה את הספרים

    }
    console.log(searchText);
    
})

let booksFound = []
const isAMatch = (searchBook, books) => {
    searchBook = searchBook.trim().toLowerCase() 
    
    let isAMatch = false
    booksFound = []

    books.forEach(book => {
        lowerCaseBook = book.toLowerCase()
        if(lowerCaseBook.indexOf(searchBook)>=0){
            booksFound.push(book)
            isAMatch = true
        }
    });

    return isAMatch; 
}






