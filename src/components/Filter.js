import "./Filter.css";
import { useContext, useState } from "react";
import { FilterContext } from "../contexts/FilterContext";

const Filter = () => {
    const [show, setShow] = useState(false);
    const { state, dispatch } = useContext(FilterContext);

    const clickHandler = () => setShow(!show);
    const clearAllFilters = () => {
        console.log("clearing");
        dispatch({
            type: "CLEAR_ALL",
        });
    };
    return (
        <div className="filters mt-2">
            <div className="filters__button-container">
                <button onClick={clickHandler} className="filters__btn">
                    <span className="material-icons-outlined filters__btn__icon">
                        filter_alt
                    </span>
                    <span className="filters__btn__text">Filters</span>
                </button>
                <button className="filters__btn" onClick={clearAllFilters}>
                    Clear Filters
                </button>
                <div className="input-dropdown-wrapper">
                    <label style={{ display: "none" }}>Sort By:</label>
                    <select
                        onChange={(e) =>
                            dispatch({
                                type: "SORT_BY",
                                payload: e.target.value,
                            })
                        }
                        className="input-dropdown"
                    >
                        <option value="PRICE_LOW_TO_HIGH">
                            Price: Low to High
                        </option>
                        <option value="PRICE_HIGH_TO_LOW">
                            Price: High to Low
                        </option>
                    </select>
                </div>
            </div>

            {show ? (
                <div className="filters__inputs">
                    <div className="input-checkbox-wrapper">
                        <input
                            onChange={() => {
                                dispatch({
                                    type: "CATEGORY",
                                    payload: {
                                        newCategory: "Dark Roast",
                                    },
                                });
                            }}
                            type="checkbox"
                            className="input-checkbox"
                            id="checkbox-dark"
                            checked={state.categories.some(
                                (value) => value === "Dark Roast"
                            )}
                        />
                        <label htmlFor="checkbox-dark">Dark Roast Only</label>
                    </div>
                    <div className="input-checkbox-wrapper">
                        <input
                            onChange={() => {
                                dispatch({
                                    type: "CATEGORY",
                                    payload: {
                                        newCategory: "Medium Dark Roast",
                                    },
                                });
                            }}
                            type="checkbox"
                            className="input-checkbox"
                            id="checkbox-medium-dark"
                            checked={state.categories.some(
                                (value) => value === "Medium Dark Roast"
                            )}
                        />
                        <label htmlFor="checkbox-medium-dark">
                            Medium Dark Roast Only
                        </label>
                    </div>
                    <div className="input-checkbox-wrapper">
                        <input
                            onChange={() => {
                                dispatch({
                                    type: "CATEGORY",
                                    payload: {
                                        newCategory: "Medium Roast",
                                    },
                                });
                            }}
                            type="checkbox"
                            className="input-checkbox"
                            id="checkbox-medium"
                            checked={state.categories.some(
                                (value) => value === "Medium Roast"
                            )}
                        />
                        <label htmlFor="checkbox-medium">
                            Medium Roast Only
                        </label>
                    </div>
                    <div className="input-checkbox-wrapper">
                        <input
                            onChange={() => {
                                dispatch({
                                    type: "CATEGORY",
                                    payload: {
                                        newCategory: "Light Roast",
                                    },
                                });
                            }}
                            type="checkbox"
                            className="input-checkbox"
                            id="checkbox-light"
                            checked={state.categories.some(
                                (value) => value === "Light Roast"
                            )}
                        />
                        <label htmlFor="checkbox-light">Light Roast Only</label>
                    </div>

                    <div className="input-checkbox-wrapper">
                        <input
                            onChange={() => {
                                dispatch({ type: "TOOGLE_INVENTORY" });
                            }}
                            type="checkbox"
                            className="input-checkbox"
                            id="inventory"
                            checked={state.showAll}
                        />
                        <label htmlFor="inventory">Include Out of Stock</label>
                    </div>

                    <div className="input-checkbox-wrapper">
                        <input
                            onChange={() => {
                                dispatch({ type: "TOOGLE_FASTDELIVERY" });
                            }}
                            type="checkbox"
                            className="input-checkbox"
                            id="fast-delivery"
                            checked={state.fastDeliveryOnly}
                        />
                        <label htmlFor="fast-delivery">
                            Show Fast Delivery Only
                        </label>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default Filter;
