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
  mutation addProduct($input: AddProduct!) {
    addProduct(input: $input) {
      name
      price
      onSale
    }
  }
`

const AddProduct = ({ refetch }) => {
  const [name, setProductName] = useState('')
  const [price, setProductPrice] = useState(0)
  // const [description, setProductDescription] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [addProduct] = useMutation(ADD_PRODUCT)

  refetch()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button
        margin={'10px'}
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
              <FormLabel>Description</FormLabel>
              <Textarea
                type={'text'}
                placeholder='Product description'
                // onChange={(e) => setProductDescription(e.target.value)}
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
                      onSale: true
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
