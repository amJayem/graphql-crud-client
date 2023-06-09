import { gql, useMutation } from '@apollo/client'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'

import { useProducts } from './useProducts'

// const GET_PRODUCT = gql`
//   query Product($productId: ID!) {
//     product(id: $productId) {
//       categoryId
//       description
//       id
//       image
//       name
//       onSale
//       price
//       quantity
//     }
//   }
// `

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($iD: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $iD, input: $input)
  }
`

const EditModal = () => {
  // console.log(id)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [updatedName, setName] = useState('')
  const [updatedPrice, setPrice] = useState('')
  const [updatedDescription, setDescription] = useState('')
  const [updateProduct] = useMutation(UPDATE_PRODUCT)
  const productId = '6423c8cc8c1d071460998d28'
  const { data } = useProducts(productId)
  // const { name, price, description } = data?.product
  // console.log(name, price, description)

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  // console.log(updatedName)

  return (
    <>
      <Button variant='solid' colorScheme='blue' onClick={onOpen}>
        Edit
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product name</FormLabel>
              <Input
                type={'text'}
                ref={initialRef}
                placeholder='Product Name' //{name}
                defaultValue={data?.product?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product price</FormLabel>
              <Input
                type={'number'}
                placeholder='Product price'
                defaultValue={data?.product?.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Description</FormLabel>
              <Textarea
                type={'number'}
                placeholder='Product Description'
                defaultValue={data?.product?.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() =>
                updateProduct({
                  variables: {
                    input: {
                      id: productId,
                      name: updatedName,
                      price: Number(updatedPrice),
                      description: updatedDescription
                    }
                  }
                })
              }>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditModal
