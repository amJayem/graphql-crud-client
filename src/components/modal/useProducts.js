import { gql, useQuery } from '@apollo/client'

const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      categoryId
      description
      id
      image
      name
      onSale
      price
      quantity
    }
  }
`

export const useProducts = ({ productId }) => {
  const { data, error, loading } = useQuery(GET_PRODUCT, {
    variables: {
      productId
    }
  })
  return { data, error, loading }
}
