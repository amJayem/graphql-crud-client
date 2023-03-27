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
import React from 'react'

const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $input: UpdateProduct!
    $updateProductInput2: UpdateProduct!
  ) {
    updateProduct(input: $updateProductInput2) {
      name
      price
      id
      description
      image
      onSale
    }
  }
`

const EditModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [updateProduct] = useMutation(UPDATE_PRODUCT)

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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
                placeholder='Product name'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product price</FormLabel>
              <Input type={'number'} placeholder='Product price' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Description</FormLabel>
              <Textarea type={'number'} placeholder='Product Description' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
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
