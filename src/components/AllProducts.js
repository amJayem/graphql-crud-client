import React from 'react'
import { gql, useQuery } from '@apollo/client'

const QUERY_ALL_PRODUCTS = gql`
  query AllProducts {
    products {
      name
      price
      id
    }
  }
`

const AllProducts = () => {
  const { data } = useQuery(QUERY_ALL_PRODUCTS)
  // console.log(data)
  const { products } = data
  return (
    <div>
      {products.map((product) => (
        <h2>{product.name}</h2>
      ))}
    </div>
  )
}

export default AllProducts
