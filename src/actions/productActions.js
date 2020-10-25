import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZES, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    });
};

export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZES,
        payload: {
            size,
            items: size === ""
                ? products
                : products.filter(product => product.availableSizes.indexOf(size) >= 0)
        }
    });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice().sort((a, b) => {
        if (sort === "") {
            return a._id > b._id ? 1 : -1;
        } else {
            return sort === "lowest"
                ? a.price > b.price
                    ? 1
                    : -1
                : a.price < b.price
                    ? 1
                    : -1;
            
        }
    });
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort,
            items: sortedProducts
        }
    });
}; 