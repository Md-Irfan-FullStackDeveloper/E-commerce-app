import React from 'react'
import ProductPage from './ProductPage'

export const womensCategoryList = [
    'ladies_camidresses',
    'ladies_top',
    'ladies_jumpsuits',
    'ladies_trousers',
    'ladies_shoes',
    'ladies_bags',
    'ladies_sandal',
    'ladies_sweatshirts',
    'ladies_shortdresses',
    'ladies_tshirts',
    'ladies_jeans',
    'Ladies_shorts',
    'Ladies_skirts',
    'ladies_jackets',
    'ladies_denim'
]

const WomensPage = () => {
    return (
        <>
            <ProductPage categoryList={womensCategoryList} heading='Womens Fashion' dataType='/women' />
        </>
    )
}

export default WomensPage