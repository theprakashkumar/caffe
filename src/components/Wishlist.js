import "./Wishlist.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { CartContext } from "../contexts/CartContext";
// import { data } from "../data";

// const foundProduct = (id, arr) => {
//     const found = arr.find((item) => item.id == id);
//     console.log({ found }); 
//     return found;
// };
const Wishlist = () => {
    const { id, token } = useContext(AuthContext);
    const { data } = useContext(DataContext);
    console.log("Data From Wishlist Context", data);
    const { state, dispatch: wishlistDispatch } = useContext(WishlistContext);
    const { dispatch: cartDispatch } = useContext(CartContext);

    // load data from the server
    const getWishlist = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/wishlist/${id}`,
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            if (response.data.success) {
                console.log(response.data.wishlist.wishlistItems);
                addToWishlist(response.data.wishlist.wishlistItems);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // send the data to context
    const addToWishlist = (arr) => {
        for (const product of arr) {
            wishlistDispatch({
                type: "ADD_TO_WISHLIST",
                payload: {
                    product: product.product,
                },
            });
        }
    };
    // delete the data from the server
    // dispatch the delete request context
    // make server request to delete product
    // dispatch the delete request to the server
    useEffect(() => {
        getWishlist();
    }, []);

    return (
        // <>
        // <div>wishlist</div>
        // {
        //     state[0] ? state[0].id : <p>wihlist em</p>
        // }
        // </>
        <div>
            {state[0]
                ? state.map((item) => {
                    console.log("item is", item.product.discount);
                    //   let product = foundProduct(item.id, state);
                    //   console.log("found:", product);
                      return (
                          <div class="card-wishlist">
                              <div class="card-wishlist__image__wrapper">
                                  <img
                                      src={item.product.image}
                                      class="card-wishlist__image"
                                      alt="Product Image"
                                  />
                              </div>
                              <div class="card-wishlist__description">
                                  <div class="card-wishlist__description__title">
                                      {item.product.name}
                                  </div>

                                  <div class="card-wishlist__price__wrapper">
                                      <div class="card-wishlist__price">
                                          {"\u20B9"} {item.product.price}
                                      </div>
                                      <strike class="card-wishlist__price__crossed ml-2">
                                          {"\u20B9"} {item.product.mrp}{" "}
                                      </strike>
                                      <div class="card-wishlist__price__discount ml-2">
                                          {item.product.discount} off
                                      </div>
                                  </div>

                                  <div class="card-wishlist__control__wrapper">
                                      <button
                                          class="btn btn--icon btn--sm card-wishlist__control__button"
                                          onClick={() =>
                                              wishlistDispatch({
                                                  type: "REMOVE_FROM_WISHLIST",
                                                  payload: { id: item.product.id },
                                              })
                                          }
                                      >
                                          <span class="material-icons-outlined btn--icon__icon">
                                              delete
                                          </span>
                                          DELETE
                                      </button>

                                      <button
                                          class="btn btn--icon btn--sm card-wishlist__control__button"
                                          onClick={() => {
                                              cartDispatch({
                                                  type: "ADD_TO_CART",
                                                  payload: { id: item.product.id },
                                              });
                                              wishlistDispatch({
                                                  type: "REMOVE_FROM_WISHLIST",
                                                  payload: { id: item.product.id },
                                              });
                                          }}
                                      >
                                          <span class="material-icons-outlined btn--icon__icon">
                                              shopping_bag
                                          </span>
                                          MOVE TO BAG
                                      </button>
                                  </div>
                              </div>
                          </div>
                      );
                  })
                : "Your Wishlist is Empty :("}
        </div>
    );
};

export default Wishlist;
