import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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

const getAllProducts = gql`
  query GetAllProducts($amount: Int) {
    getAllProducts(amount: $amount) {
      categoryId
      description
      id
      image
      name
      onSale
      price
      quantity
      reviews {
        comment
        title
      }
    }
  }
`

const AllProducts = () => {
  const { data, loading, refetch } = useQuery(getAllProducts)
  // console.log(data)
  // const products = data?.products
  // console.log(products?.image)

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
    <Box bg='teal.400'>
      <SearchButton />
      <AddProduct refetch={refetch} />
      {data?.getAllProducts?.map((product) => (
        <Flex justify={'center'} flexDirection='row' key={product.id}>
          <Box margin='5' boxShadow='lg'>
            <Card maxW='md' bg='blue.100'>
              <CardBody>
                <Image
                  src={product?.image}
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
              <Divider />
              <br />
              {/* <Accordion /> */}
              {product.reviews.map((review) => (
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: 'tomato', color: 'white' }}>
                        <Box as='span' flex='1' textAlign='left'>
                          {review.title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>{review.comment}</AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
            </Card>
          </Box>
        </Flex>
      ))}
    </Box>
  )
}

export default AllProducts
