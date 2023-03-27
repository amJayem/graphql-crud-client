import { Button, Center, HStack, Input } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
// import { useLazyQuery } from '@apollo/client'

const SearchButton = () => {
  // const [search, setSearch] = useState('')
  // const [fetchData, { data, error }] = useLazyQuery()
  return (
    <Center w='100%' h='60px' bg='green.300' color='white'>
      <HStack>
        <Center w='auto' h='40px' bg='green.300' color='white'>
          <Input
            type={'text'}
            // onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by product name...'
            size='lg'
          />
        </Center>
        <Button
          // onClick={fetchData}
          bg='green.300'
          type='green'>
          <SearchIcon />
        </Button>
      </HStack>
    </Center>
  )
}

export default SearchButton
