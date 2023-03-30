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

const ADD_PRODUCT = gql`
  mutation addProduct($input: ProductInput!) {
    addProduct(input: $input) {
      name
      price
      onSale
      categoryId
      id
      description
      image
      quantity
    }
  }
`

const AddProduct = ({ refetch }) => {
  const [name, setProductName] = useState('')
  const [price, setProductPrice] = useState(0)
  const [onSale, setOnSale] = useState(true)
  const [categoryId, setCategoryId] = useState(1)
  const [description, setProductDescription] = useState('')
  const [image, setImage] = useState('')
  const [quantity, setQuantity] = useState(1)

  const { isOpen, onOpen, onClose } = useDisclosure()
  // console.log(isOpen, onOpen, onclose)

  const [addProduct] = useMutation(ADD_PRODUCT)

  refetch()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button
        margin={'15px'}
        variant='solid'
        colorScheme='blue'
        onClick={onOpen}>
        Add Product
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product name</FormLabel>
              <Input
                type={'text'}
                ref={initialRef}
                placeholder='Product name'
                onChange={(e) => setProductName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Price</FormLabel>
              <Input
                type={'number'}
                placeholder='Price'
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Category Id</FormLabel>
              <Input
                type={'number'}
                placeholder={`CategoryID (1-3) : ${categoryId}`}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Quantity</FormLabel>
              <Input
                type={'number'}
                placeholder={`Quantity : ${quantity}`}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>On-sale Status</FormLabel>
              <Input
                type={'text'}
                placeholder={`Product onSale : ${onSale}`}
                onChange={(e) => setOnSale(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image Link</FormLabel>
              <Input
                type={'text'}
                placeholder='Product image'
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                type={'text'}
                placeholder='Product description'
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() =>
                addProduct({
                  variables: {
                    input: {
                      name: name,
                      price: Number(price),
                      onSale: Boolean(onSale),
                      categoryId: Number(categoryId),
                      description: description,
                      image: image,
                      quantity: Number(quantity)
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

export default AddProduct
