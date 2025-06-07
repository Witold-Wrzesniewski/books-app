class BooksList{
  constructor (){
    this.favoriteBooks = [];
    this.filters = [];
    this.dom = {};
    this.initData();
    this.getElements();
    this.render();
    this.initFilters();
    this.initActions();
  }
  initData() {
    this.data = dataSource.books;
  }
  getElements(){
    this.dom.template = document.querySelector('#template-book');
    this.dom.booksList = document.querySelector('.books-list');
    this.dom.filters = document.querySelector('.filters');
  }
  render(){
    const template = Handlebars.compile(this.dom.template.innerHTML);
    for(const book of this.data){
      const generatedHTML = template(book);
      const element = utils.createDOMFromHTML(generatedHTML);
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
      
      this.dom.booksList.appendChild(element);
    }
  }
  initFilters(){
    for(const input of this.dom.filters.querySelectorAll('input[name="filter"]')){
      if(input.checked)
        this.filters.push(input.value);
    }
  }
  filterBooks(){
    const renderFilter = function(elemId, action){
      //console.log(this);
      const booksLinkArr = this.dom.booksList.querySelectorAll('.book__image');
      for(const bookLink of booksLinkArr){
        if(bookLink.getAttribute('data-id') == elemId){
          if(action === 'check')
            bookLink.classList.remove('hidden');
          else if(action === 'uncheck')
            bookLink.classList.add('hidden');
        }
      }
    };

    for(const book of this.data){
      for(const detail in book.details){
        const detailVal = book.details[detail];
        if(detailVal && this.filters.indexOf(detail) !== -1){
          renderFilter.call(this, book.id, 'check');
        }else if(detailVal && this.filters.indexOf(detail) === -1){
          renderFilter.call(this, book.id, 'uncheck');
        }
      }
    }
  }
  initActions(){
    const thisObj = this; 
    this.dom.booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      const linkElem = event.target.offsetParent;
      if(linkElem.classList.contains('book__image')){
        if(!linkElem.classList.contains('favorite')){
          thisObj.favoriteBooks.push(linkElem.getAttribute('data-id'));
          linkElem.classList.add('favorite');
        } else{
          const index = thisObj.favoriteBooks.indexOf(linkElem.getAttribute('data-id'));
          thisObj.favoriteBooks.splice(index, 1);
          linkElem.classList.remove('favorite');
        }
      }
      console.log(thisObj.favoriteBooks);
    });
    this.dom.booksList.addEventListener('click', function(event){
      event.preventDefault();
      //console.log(event.detail);
    });

    
    this.dom.filters.addEventListener('click', function(event){
      const clickedElem = event.target;
      if(clickedElem.tagName == 'INPUT'){
        if(clickedElem.checked){
          thisObj.filters.push(clickedElem.value);
        } else{
          const index = thisObj.filters.indexOf(clickedElem.value);
          thisObj.filters.splice(index, 1);
        }

        thisObj.filterBooks();
        console.log(thisObj.filters);
      }
    });
  }
}
const app = new BooksList();
