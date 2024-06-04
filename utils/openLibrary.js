const { coversFileType, coversUrl } = require("../config/constants");

  /**
   * Makes an http get request to open library full book search to get data about a book with that isbn.
   * a valid  isbn must be isbn 10 or isbn 13, and have passed their respectives checksums
   * @param {a valid isbn to request with} isbn 
   * @param {a callback function to send results back to} isbnCallback 
   */
  function isbnSearch(isbn, isbnCallback){
    fetch(`https://openlibrary.org/search.json?isbn=/${isbn}`, { // gets everything about the book based on isbn
        method: "GET",
        headers: {

        },
      })
        .then((response) => {
          if (response.ok){
            return response.json()
          }
          throw new Error(response.status)
        })
        .then((data) => {
            if (data.docs.length === 0){ // nothing found under that isbn
              throw new Error(404)
            }
            isbnCallback(
              {
                success: true,  
                book : { 
                  isbn: isbn, 
                  isbnArray: data.docs[0].isbn, 
                  title: data.docs[0].title, 
                  author: data.docs[0].author_name, 
                  coverUrl: coversUrl.concat(isbn, coversFileType), 
                  rating: 0}
                }
            );
        })
        .catch((errorStatus) => {
            let errorMessage;
            switch (errorStatus) {
              case 400:
                errorMessage = '400 Bad Request, error in input';
                break;
              case 403:
                errorMessage = '403 Forbidden, not allowed to modify';
                break;
              case 404:
                errorMessage = '404 Not Found, requested resource is not found';
                break;
              case 500:
                errorMessage = '500 Internal Server Error, handling the request causes any internal errors';
                break;
              default:
                errorMessage = '404 Not Found, requested resource is not found';
                break;
            }

            isbnCallback({errorMessage, success: false, errorStatus});
        });
  }

module.exports = {
    isbnSearch: isbnSearch,
};