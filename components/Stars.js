import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { useDispatch } from 'react-redux'
import { rateBook } from '../app/bookSlice'

    /**
     * maps the number of filled stars to the number of the rating, the rest is unfilled
     * gives stars on click event assoicted to its index
     * @param {takes book item} item 
     * @returns JSX to display stars
     */
     const Stars = ({item}) => {
        const dispatch = useDispatch(); // used to call redux store actions (removeBook, rateBook)

        let stars = []
        
        /**
         * 
         * @param {*} num 
         */
        const starOnClick = (num, isbn) => {
            dispatch(rateBook({rating: num, isbn: isbn}));
    }
    
        for (let i = 1; i <= 5; i++) {
            if (item.rating >= i){
              stars.push(<FaStar size={15} onClick={()=>{starOnClick(i, item.isbn)}} key={i} color='yellow' /> )
            }else{
              stars.push(<FaRegStar size={15} onClick={()=>{starOnClick(i, item.isbn)}} key={i} color='yellow' />)
            }
        }
    
        return (
            <div className="stars">
                {stars}
            </div>
        );
    }

    module.exports = {
        Stars: Stars
    };