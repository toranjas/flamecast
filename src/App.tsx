import React from 'react';
import './App.css';
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Flex,
  Text,
  Box
} from '@chakra-ui/react';

function App() {
  return (
    <Flex color="white" h="100%">

      <Box w="70px" bg="gray.700">
        <Text>Tool</Text>
      </Box>

      <Box w="250px" bg="gray.800">
        <Text>Box 2</Text>
      </Box>

      <Box flex="1" bg="gray.900" padding="24px">
        <Heading>Hello FlameCast!</Heading>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
          <FormHelperText>{'We\'ll never share your email.'}</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
}

export default App;
