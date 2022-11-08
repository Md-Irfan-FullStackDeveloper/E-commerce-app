import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Pagination = ({ page, setPage }) => {

  return (
    <Flex w='100%' gap={5} justify='flex-end'>
      <Button
        _hover={'none'}
        disabled={page === 1}
        borderRadius={'none'}
        bg='teal.500'
        color='white'
        size='sm'
        fontWeight='400'
        onClick={() => setPage((prev) => {
          if (prev !== 1) {
            return prev - 1
          }
        })}
      >
        Previous
      </Button>

      <Text> {page} </Text>

      <Button
        disabled={page === 7}
        _hover={'none'}
        onClick={() => setPage((prev) => {
          if (prev < 7) {
            return prev + 1
          }
        })}
        borderRadius={'none'}
        bg='teal.500'
        color='white'
        size='sm'
        fontWeight='400'
      >
        Next
      </Button>

    </Flex >

  )
}

export default Pagination