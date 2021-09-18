import React  from 'react';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import './App.css';
import { useGetChuckNoraApproved } from './hooks/use-get-chuck-nora-approved';

function App() {
    const [{ isLoading, hookData }, doFetch] = useGetChuckNoraApproved();
    return (
        <div className='App'>
            <Flex justifyContent={ 'center' } mt={ '20px' } flexDir={ 'column' } alignItems={ 'center' }>
                <Box mb={ '20px' } _hover={{cursor: 'pointer'}}>
                    <img src={ '/assets/chucknorris.png' } alt={ 'Chuck Noris logo' } width={ '200px' } onClick={() => {doFetch({});}} />
                </Box>
                <Box border={ '1px dotted gray' } p={ '20px' } minW={'200px'}>
                    {
                        isLoading ? <Spinner /> : <Text>{ hookData?.value }</Text>
                    }
                </Box>
            </Flex>
        </div>
    );
}

export default App;
