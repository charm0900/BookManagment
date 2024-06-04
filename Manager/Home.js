'use client'
import styles from "../app/page.module.css";
import { useState, useEffect, useCallback } from "react";
import { isbnVaild, isbn10CheckSum, isbn13CheckSum } from "@/utils/isbnValidator";
import { isbnSearch } from "@/utils/openLibrary";
import { coversFileType, coversUrl, isbn13_len } from "@/config/constants";
import { Book } from "../components/Book";
import { useSelector, useDispatch } from 'react-redux'
import { addBook, removeBook } from '../app/bookSlice'

export default function Home() {
  const dispatch = useDispatch()
  const [isbn, setISBN] = useState(''); 
  const [validISBN, setValidISBN] = useState(true); 
  const [errorCode, setErrorCode] = useState(0);
  const [fetching, setfetching] = useState(false);
  
  const bookList = useSelector((state) => state.bookList.booksReducer.bookList)
  
  const notValidISBNMessage = "Not a Vaild ISBN";
  const ibsnThereMessage = "A book with this ISBN is already in list";
  const isbnFormat = "Enter a valid ISBN 13 or ISBN 10 \n ISBN 13 is all digits \n ISBN 10 is all digits but it can also have an X in the last place \n example: 059048348X"


  /* Updates isbn text in state based on users input into field */
  const isbnOnChange = (e) => {
    setISBN(e.target.value);
  }

  /*  */
  const isbnSubmit = () => {
    setfetching(true);
    if (!isbnVaild(isbn)){ // not valid isbn
        setErrorCode(1);
        setValidISBN(false);
        setfetching(false);
        return;
    }

    //check if book already in list based on isbn
    if (findByIsbn(isbn, bookList)){
      setErrorCode(2);
      setValidISBN(false);
      setfetching(false);
      return false;
    }

    setValidISBN(true);

    //get book info and add it to list 
    isbnSearch(isbn, isbnCallback);
  }

  /**
   * Searches an array to find if an isbn value is in any object in the list
   * @param {isbn to find} isbn 
   * @param {array to find isbn in} array 
   * @returns true if isbn in array, false otherwise
   */
  function findByIsbn(isbn, array){
    for (let i = 0; i < array.length; i++) {
      const elm = array[i];
        if (elm.isbnArray.find((bookIsbn) => (bookIsbn === isbn))){
          return true;
        }
    }
    return false;
  }

  const isbnCallback = (data) => {
    if(data.success){
      dispatch(addBook(data.book))
      setISBN('');
    }else{ // display error message  
      setErrorCode(data.errorStatus)
      alert(data.errorMessage)
    }
    setfetching(false);
  }

  return (
    // <main className={styles.main}>
      // <div className={styles.description}>
        <div className={"container"}>
          {/* < */}
          <div className="heading">
            <h1 style={{textAlign: 'center'}}>Book Inventory Manager</h1>
            <div className="errorMessage">
              {!validISBN && 
                <>
                  <p>{errorCode === 2 ? ibsnThereMessage : ""}{errorCode === 1 ? notValidISBNMessage: ""}    </p>
                  <button className="helpButton" onClick={() => {alert(isbnFormat)}}>?</button>
                </>
              }
            </div>
            <div>
              <input placeholder="ISBN" className="input" name="myInput" value={isbn} onChange={isbnOnChange} maxLength={13}/>
              <br />
              <br />
              <button className="addButton" onClick={() => {isbnSubmit()}}>{!fetching ? "Add Book" : "Fetching..."}</button>
            </div>
          </div>
            <ul style={styles.ul}>
              {bookList.map((item) => <Book item={item} /> )}
            </ul>
          </div>
        // </div>
    // </main>
  );
}

