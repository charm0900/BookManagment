import Image from "next/image";
import { useDispatch } from 'react-redux'
import { removeBook } from '../app/bookSlice'
import { Stars }  from "./Stars"



/**
 * Takes a book object, sets up the rate and remove features, and 
 * builds the jsx for the book to display as a component
 * @param {takes a book object} item 
 * @returns JSX 
 */
const Book = ({item}) => {
    const dispatch = useDispatch(); // used to call redux store actions (removeBook, rateBook)

    /**
     * removes the book in the book listed that correspondes to the book that clicked on in the ui
     * @param {takes the isbn number of the item clicked} isbn 
     */
    const removeOnClick = (isbn) => {
        dispatch(removeBook(isbn));
    }

    return (
          <li key={item.isbn} className={"bookItem"}>
            <div className="bookDivider">
                <Image
                    src={item.coverUrl}
                    // defaultValue={} // have defualt value if no book
                    alt={`Cover of book: /${item.title}`}
                    width={125}
                    height={200}
                />
                <div className="bookInfo">
                    <h2>{item.title}</h2> 
                    Author: {item.author.join(' & ')} 
                    <br />
                    ISBN: {item.isbn} 
                    <Stars item={item} />
                    <button className="removeButton" onClick={() => {removeOnClick(item.isbn)}}>Remove</button>
                </div>

            </div>
          </li>
    )
  }

module.exports = {
    Book: Book
};