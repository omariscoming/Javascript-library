const addButton = document.querySelector('.add-book');
const overly = document.querySelector('.overly');
const addBookButton = document.querySelector('.add-btn.book');
const closeButton = document.querySelector('.close');

closeButton.addEventListener('click', () => {
    overly.className = 'overly';
})

addButton.addEventListener('click', (e) => {
    console.log('clicked');
    overly.classList.add('show');
})

document.addEventListener('DOMContentLoaded', (e) => {
    ifEmpty()
})

function ifEmpty(){
    const body = document.querySelector('.body');
    if(body.children.length === 0){
        body.innerHTML = `
            <div class="empty">
        <p><i class="fa-solid fa-folder-open"></i> Your Library is Empty, Add books using <i class="fa-solid fa-plus"></i> Button</p>
    </div>`;
    }
}

function CreateBook(title, author, pages, status, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = id;
}

function addBookToHtml(bookInfo){
    const body = document.querySelector('.body');
    const emptyBox = document.querySelector('.empty')
    if (emptyBox){
        emptyBox.remove()
    }else {

    }
    const book = document.createElement('div');
    book.classList.add('book');
    book.setAttribute('data-book-id', bookInfo.id);
    let statusClass =''
    let statusText = ''
    let className = ''

    if (bookInfo.status === 'read') {
        className = 'read-btn'
        statusClass = 'fa-solid fa-check'
        statusText = 'Read'
    }else {
        className = 'read-btn no'
        statusClass = 'fa-solid fa-times'
        statusText = 'Not Read'
    }

    book.innerHTML = `
        <div class="name"><i class="fa-solid fa-book"></i>${bookInfo.title}</div>
        <div class="author"><i class="fa-solid fa-user"></i>${bookInfo.author}</div>
        <div class="pages"><i class="fa-solid fa-file"></i>${bookInfo.pages}</div>
        <div class="${className}"><i class="${statusClass}"></i>${statusText}</div>
        <div class="remove-btn"><i class="fa-solid fa-circle-xmark"></i>Remove</div>
`

    body.appendChild(book)
}

function addBook(title, author, pages, status, id) {
    let book = new CreateBook(title, author, pages, status, id)
    addBookToHtml(book)
}

addBookButton.addEventListener('click', (e) => {
    event.preventDefault()
    const form = document.querySelector('.form')
    if (form.checkValidity()) {
        const getTitle = document.querySelector('#title').value;
        const getAuthor = document.querySelector('#author').value;
        const getPages = document.querySelector('#pages').value;
        const getStatus = document.querySelector('#reading-status').value;
        const bookId = crypto.randomUUID();

        addBook(getTitle, getAuthor, getPages, getStatus, bookId);
        form.reset();
    } else {
        // Trigger native validation UI
        form.reportValidity();
    }
})

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-btn')) {
        const icon = e.target.querySelector('i');
        const readButtonValue = e.target.textContent
        if (readButtonValue === 'Read') {
            e.target.className = 'read-btn no';
            icon.className = 'fa-solid fa-times'
            e.target.childNodes[1].nodeValue = 'Not Read';
        } else if (readButtonValue === 'Not Read') {
            e.target.className = 'read-btn';
            e.target.childNodes[1].nodeValue = 'Read';
            icon.className = 'fa-solid fa-check'
        }
    }else if (e.target.classList.contains('remove-btn')) {
        const removeButtonParent = e.target.parentNode;
        console.log(removeButtonParent)
        removeButtonParent.remove();
        ifEmpty()
    }
})

