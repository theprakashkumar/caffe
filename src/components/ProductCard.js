import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = (props) => {
    const {_id, name, image, price, ratings, mrp, discount} = props.details;
    return(
        <div class="card-product">
                <div class="card-product__image__wrapper">
                    <img src={ image } alt="product" class="card-product__image" />
                    <button class="card-product__icon"
                    >
                        <span class="material-icons md-36">
                            favorite_border
                        </span>
                    </button>
                </div>

                <div class="card-product__name">{ name }</div>

                <div class="card-product__description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus, quo veniam at ipsum
                </div>

                <div class="card-product__rating__wrapper">
                    <div class="card-product__rating__icon__wrapper">
                        <span class="card-product__rating__icon__text">{ ratings }</span>
                        <span class="material-icons-outlined card-product__rating__icon">
                            star
                        </span>
                    </div>
                    <span class="card-product__rating__reviews">342 Ratings & 29 Reviews</span>
                </div>

                <div class="card-product__price__wrapper">
                    <div class="card-product__price">{'\u20B9'} {price}</div>
                    <strike class="card-product__price__crossed ml-2">{'\u20B9'} {mrp} </strike>
                    <div class="card-product__price__discount ml-2">{discount} off</div>
                </div>

                <Link to={`/product/${_id}`}>
                    <button class="btn mt-1">SHOP NOW</button>
                </Link>

            </div>

    )
}

export default ProductCard;