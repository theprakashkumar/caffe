import "./Filter.css";
import { useContext, useState } from "react";
import { FilterContext } from "../contexts/FilterContext";

const Filter = () => {
    const [show, setShow] = useState(false);
    const { state, dispatch } = useContext(FilterContext);

    const clickHandler = () => setShow(!show);
    return (
        <div className="filters mt-2">
            <div className="filters__button-container">
                <button onClick={clickHandler} className="filters__btn">
                    <span class="material-icons-outlined filters__btn__icon">
                        filter_alt
                    </span>
                    <span className="filters__btn__text">Filters</span>
                </button>
                <button className="filters__btn ml-2">Clear Filter</button>
            </div>

            {show ? (
                <>
                    <div className="input-checkbox-wrapper">
                        Roast:
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
                        <label htmlFor="checkbox-dark">Dark</label>
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
                            Medium Dark
                        </label>
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
                        <label htmlFor="checkbox-medium">Medium</label>
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
                        <label htmlFor="checkbox-light">Light</label>
                    </div>

                    <div className="input-checkbox-wrapper">
                        <input
                            onChange={() => {
                                dispatch({ type: "TOOGLE_INVENTORY" });
                            }}
                            type="checkbox"
                            className="input-checkbox"
                            id="inventory"
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
                        />
                        <label htmlFor="fast-delivery">
                            Show Fast Delivery Only
                        </label>
                    </div>

                    <div className="input-dropdown-wrapper">
                        <label>
                            {" "}
                            Sort By:
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
                        </label>
                    </div>
                </>
            ) : null}
        </div>
    );
};
export default Filter;
