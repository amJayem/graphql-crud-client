import AllProducts from './components/AllProducts'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  }
}

const theme = extendTheme({ colors })

function App() {
  return (
    <div>
      <ChakraProvider theme={theme}>
        <AllProducts />
      </ChakraProvider>
    </div>
  )
}

export default App
