import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import SearchBar from '../Components/SearchBar'
import mensBanner from '../Assets/mensBanner.jpeg'
import womensBanner from '../Assets/womensBanner.jpeg'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <Box>
      <SearchBar />
      <Box cursor='pointer' w={['80%', '70%']} m={['25px auto', '25px auto']}>
        <NavLink to='/products/mens' replace={true}>
          <Image borderRadius={7} w='100%' src={mensBanner} />
        </NavLink>
      </Box>

      <Box cursor='pointer' w={['80%', '70%']} m={['25px auto', '25px auto']}>
        <NavLink to='/products/womens' replace={true}>
          <Image borderRadius={7} w='100%' src={womensBanner} />
        </NavLink>
      </Box>
    </Box>
  )
}

export default Home