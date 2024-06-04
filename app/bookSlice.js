import { createSlice } from '@reduxjs/toolkit'

/**
 * redux slice used to create reducer and store that will hold data in local storage.
 * updating this state will cause it to force an update anywhere this data is used.
 * Also defines the interactions of Adding, removing and rating
 */
export const bookSlice = createSlice({
  name: 'books',
  initialState: {
    bookList: [],
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes.
    // Also, no return statement is required from these functions.

    /**
     * Add a book object to the booklist in local storage 
     * so a copy is made
     * and makes the chnage in the copy then sets the state to new copy
     * @param {current state in localStorage} state 
     * @param {payload to change state based on} action 
     */
    addBook: (state, action) => {
        let newArray = state.bookList.slice() 
        newArray.splice(newArray.length, 0, action.payload) // add book to end of book list
        state.bookList = newArray;
    },
    /**
     * Rate a book object in the booklist in local storage,
     * find the book based on its isbn, update its rating in a copy 
     * and set the new state to the copy
     * @param {current state in localStorage} state 
     * @param {payload to change state based on} action 
     */
    rateBook: (state, action) => {

      let newArray = state.bookList.map((book, index) => {
        if (book.isbn !== action.payload.isbn) {
          // This isn't the item we care about - keep it as-is
          return book
        }
    
        // Otherwise, this is the one we want - return an updated value
        return {
          ...book,
          rating: action.payload.rating
        }
      })
      state.bookList = newArray;
    },
    /**
     * Remove a book object from booklist in local storage,
     * find book based on isbn, and remove it from the list,
     * set state to new array
     * @param {current state in localStorage} state 
     * @param {payload to change state based on} action 
     */
    removeBook: (state, action) => { //remove based on isbn number (unique identifier)
        state.bookList = state.bookList.filter((book) => book.isbn !== action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addBook, rateBook, removeBook } = bookSlice.actions

export default bookSlice.reducer