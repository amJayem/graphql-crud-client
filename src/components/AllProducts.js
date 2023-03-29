import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
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

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId)
  }
`

const AllProducts = () => {
  const { data, loading, refetch, error } = useQuery(getAllProducts)
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
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

  refetch()

  if (error) {
    console.error(error)
    return (
      <Heading size='md'>
        Error occurred!! Something is not working properly
      </Heading>
    )
  }

  return (
    <Box bg='teal.400'>
      <SearchButton />
      <AddProduct refetch={refetch} />
      {data?.getAllProducts?.map((product) => (
        <Flex justify={'center'} key={product.id}>
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
                  <Text>{product.id}</Text>
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
                  <Button
                    variant='outline'
                    colorScheme='red'
                    onClick={() =>
                      deleteProduct({
                        variables: {
                          deleteProductId: product.id
                        }
                      })
                    }>
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
              <Divider />
              <Text padding={'5'} fontSize={'xl'} as='b'>
                Comments
              </Text>
              {product.reviews.map((review, i) => (
                <Accordion allowToggle key={i}>
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
