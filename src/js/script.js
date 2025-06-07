const render = function(){
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const booksList = document.querySelector('.books-list');
  for(const book of dataSource.books){
    const generatedHTML = template(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    //console.log(element.querySelector('.book__rating__fill'));
    const ratingElem = element.querySelector('.book__rating__fill');
    const ratingVal = Math.round(eval(ratingElem.innerHTML) * 100);
    if(ratingVal <= 60)
      ratingElem.style.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    else if(ratingVal > 60 && ratingVal <= 80)
      ratingElem.style.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    else if(ratingVal > 80 && ratingVal <= 90)
      ratingElem.style.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    else if(ratingVal > 90 && ratingVal <= 100)
      ratingElem.style.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';

    ratingElem.style.width = `${ratingVal}%`;
    
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
          bookLink.classList.remove('hidden');
        else if(action === 'uncheck')
          bookLink.classList.add('hidden');
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

const initFilters = function(){
  const filterInputs = document.querySelector('.filters').querySelectorAll('input[name="filter"]');
  for(const input of filterInputs){
    if(input.checked)
      filters.push(input.value);
  }
};
initFilters();

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
