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
/*const initActions = function(){
  const aElementsArr = document.querySelectorAll('.books-list .book__image');
  for(let aElem of aElementsArr){
    aElem.addEventListener('dblclick', function(event){
      event.preventDefault();
      if(!this.classList.contains('favorite')){
        favoriteBooks.push(this.getAttribute('data-id'));
        this.classList.add('favorite');
      } else{
        const index = favoriteBooks.indexOf('favorite');
        favoriteBooks.splice(index, 1);
        this.classList.remove('favorite');
      }
      console.log(favoriteBooks);
    });
  }
}*/
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
          const index = favoriteBooks.indexOf('favorite');
          favoriteBooks.splice(index, 1);
          linkElem.classList.remove('favorite');
        }
      }
      
      console.log(favoriteBooks);
    });
}
initActions();