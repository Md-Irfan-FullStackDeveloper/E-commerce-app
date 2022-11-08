import React from 'react'
import ProductPage from './ProductPage'

export const mensCategoryList = [
  'men_shirts',
  'men_tshirtstanks',
  'men_trousers',
  'men_jackets',
  'men_cardigans',
  'men_hoodies',
  'men_hatscaps',
  'men_sweatshirts',
  'men_joggers',
  'men_nightwearloungewear',
  'men_shoes',
  'men_rings',
  'men_chinos'
]

const MensPage = () => {

  return (
    <>
      <ProductPage categoryList={mensCategoryList} heading='Mens Fashion' dataType='/men' />
    </>
  )
}

export default MensPage