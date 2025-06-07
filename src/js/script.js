const render = function(){
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const booksList = document.querySelector('.books-list');
  for(const book of dataSource.books){
    const generatedHTML = template(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(element);
  }
};
render();

const favoriteBooks = [];
const filters = [];

const filterBooks = function(){

  const renderFilter = function(elemId, action){
    const booksLinkArr = document.querySelector('.books-list').querySelectorAll('.book__image');
    for(const bookLink of booksLinkArr){
      if(bookLink.getAttribute('data-id') == elemId){
        if(action === 'check')
          bookLink.classList.add('hidden');
        else if(action === 'uncheck')
          bookLink.classList.remove('hidden');
      }
    }
  };

  for(const book of dataSource.books){
    for(const detail in book.details){
      const detailVal = book.details[detail];
      if(detailVal && filters.indexOf(detail) !== -1){
        renderFilter(book.id, 'check');
      }else if(detailVal && filters.indexOf(detail) === -1){
        renderFilter(book.id, 'uncheck');
      }
    }
  }
}

const initActions = function(){
  const booksListElem = document.querySelector('.books-list');
  
  booksListElem.addEventListener('dblclick', function(event){
    event.preventDefault();
    const linkElem = event.target.offsetParent;
    if(linkElem.classList.contains('book__image')){
      if(!linkElem.classList.contains('favorite')){
        favoriteBooks.push(linkElem.getAttribute('data-id'));
        linkElem.classList.add('favorite');
      } else{
        const index = favoriteBooks.indexOf(linkElem.getAttribute('data-id'));
        favoriteBooks.splice(index, 1);
        linkElem.classList.remove('favorite');
      }
    }
    console.log(favoriteBooks);
  });
  booksListElem.addEventListener('click', function(event){
    event.preventDefault();
    //console.log(event.detail);
  });

  const filtersElem = document.querySelector('.filters');
  filtersElem.addEventListener('click', function(event){
    const clickedElem = event.target;
    if(clickedElem.tagName == 'INPUT'){
      if(clickedElem.checked){
        filters.push(clickedElem.value);
      } else{
        const index = filters.indexOf(clickedElem.value);
        filters.splice(index, 1);
      }

      console.log(filters);
      filterBooks();
    }
  });
}
initActions();
