const generateBooksList = function(){
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const booksList = document.querySelector('.books-list');
  for(const book of dataSource.books){
    const generatedHTML = template(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(element);
  }
};
generateBooksList();