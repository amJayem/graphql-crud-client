import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text
} from '@chakra-ui/react'
import EditModal from './modal/EditModal'
import SearchButton from './search/SearchButton'
import AddProduct from './AddProduct/AddProduct'

const QUERY_ALL_PRODUCTS = gql`
  query AllProducts {
    products {
      name
      price
      id
      description
    }
  }
`

const AllProducts = () => {
  const { data, loading, refetch } = useQuery(QUERY_ALL_PRODUCTS)
  // console.log(data)
  const products = data?.products

  if (loading) {
    return (
      <Box display='flex' flexDirection={'column'} padding='10' margin='10'>
        <Box padding='10' margin='10' boxShadow='lg' bg='white'>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
        <Box padding='10' margin='10' boxShadow='lg' bg='white'>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
        <Box padding='10' margin='10' boxShadow='lg' bg='white'>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
      </Box>
    )
  }

  // if (error) {
  //   return <Heading size='md'>Error occurred!!</Heading>
  // }

  return (
    <div>
      <SearchButton />
      <AddProduct refetch={refetch} />
      {products?.map((product) => (
        <Flex justify={'center'} flexDirection='row' key={product.id}>
          <Box margin='5' boxShadow='lg' bg='white'>
            <Card maxW='md'>
              <CardBody>
                <Image
                  src={product.image}
                  alt={product.name}
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Heading size='md'>{product.name}</Heading>
                  <Text>{product.description}</Text>
                  <Text color='blue.600' fontSize='2xl'>
                    $ {product.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing='2'>
                  <EditModal />
                  <Button variant='outline' colorScheme='red'>
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Box>
        </Flex>
      ))}
    </div>
  )
}

export default AllProducts
