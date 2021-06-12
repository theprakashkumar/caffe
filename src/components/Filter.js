// ! Add the multi sider funcanility 
import { useContext, useState } from "react";
import { FilterContext } from "../contexts/FilterContext";

const Filter = () => {
    const [show, setShow] = useState(true);
    const { state, dispatch } = useContext(FilterContext);

    const clickHandler = () => setShow(!show); 
    return(
        <div className="filters">
            <button onClick={clickHandler}>Filters</button> 
            { show ? (
                <>
                <div className="input-checkbox-wrapper">
                <label>
                    <input onChange={() => {dispatch({type: 'TOOGLE_INVENTORY'})}} type="checkbox" className="input-checkbox" />
                    Include Out of Stock
                </label>
            </div>

            <div className="input-checkbox-wrapper">
                <label>
                    <input onChange={() => {dispatch({type: 'TOOGLE_FASTDELIVERY'})}} type="checkbox" className="input-checkbox" />
                    Show Fast Delivery Only
                </label>
            </div>

            <div className="input-dropdown-wrapper">
                <label> Sort By: 
                    <select  onChange={(e) => dispatch({type: 'SORT_BY', payload: e.target.value})} className="input-dropdown">
                        <option value="PRICE_LOW_TO_HIGH">Price: Low to High</option>
                        <option value="PRICE_HIGH_TO_LOW">Price: High to Low</option>
                        <option value="popularity">Popularity</option>
                        <option value="newest-first">Newest First</option>
                    </select>
                </label>
            </div>

            <div className="input-range-wrapper">
                <label>Price Range:</label>
                <input type="range" className="input-range" min="0" max="10" />
            </div>
            </>
            ) : null}
        </div>
    )
}
export default Filter;