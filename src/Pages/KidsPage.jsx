import React from 'react'
import ProductPage from './ProductPage'

export const kidsCategoryList = [
  'kids_girls_clothing',
  'kids_girls_clothing_shorts',
  'kids_girls_jackets',
  'kids_girls_clothing_leggingstreggings',
  'kids_girls_clothing_joggerssweatpants',
  'kids_girls_socks',
  'kids_girls_jeans',
  'kids_girls_cardigans',
  'kids_accessories',
  'kids_girls_jumpers',
  'kids_girls_sweatshirts',
  'kids_girls_hoodies',
  'kids_girls_tshirts',
  'kids_girls_shorts'
]
const KidsPage = () => {
  return (
    <>
      <ProductPage categoryList={kidsCategoryList} heading='Kids Fashion' dataType='/kid' />
    </>
  )
}

export default KidsPage