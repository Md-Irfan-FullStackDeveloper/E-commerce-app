import React from 'react'
import ProductPage from './ProductPage'

export const sportsCategoryList = [
  'ladies_jackets',
  'ladies_tightleggings',
  'ladies_sportbras',
  'ladies_sporttrousers',
  'ladies_sportshorts',
  'ladies_sportjoggers',
  'ladies_sport',
  'men_sportsaccessories',
  'ladies_sportsbags',
  'ladies_plus',
  'ladies_sporttops'
]
const SportsPage = () => {
  return (
    <>
      <ProductPage categoryList={sportsCategoryList} heading='Sports Fashion' dataType='/sport' />
    </>
  )
}

export default SportsPage