import React, { useState } from 'react';
import { Box, Flex, Input, Spinner, Button } from '@chakra-ui/react';

import { useGetChuckNoraApproved } from './hooks/use-get-chuck-nora-approved';

function App() {
    const [{ isLoading, hookData = {} }, doFetch] = useGetChuckNoraApproved();

    const [search, setSearch] = useState('');

    const [dir, setDir] = useState('ltr');

    const handleSearch = () => {
        doFetch({search});
    };


    const Jokes = () => {
        const {total = 0, result = []} = hookData;
        return(
            <Box>
                <Flex justifyContent={'center'}>Total Jokes: {total}</Flex>
                {
                    result.map((joke: { value: string, id: string }) => {
                        return (
                            <Box data-test-id='jokes' border={ '1px dotted gray' } p={ '20px' } m={'20px'} minW={'200px'} key={joke.id}>
                                {joke.value}
                            </Box>
                            )
                    })
                }
            </Box>
        )
    }
    const handleDirection = () => {
        setDir(dir === 'ltr' ?  'rtl' : 'ltr');
    };

    return (
        <div className='App' dir={dir}>
            <Flex justifyContent={ 'center' } mt={ '20px' } flexDir={ 'column' } alignItems={ 'center' }>
                <Flex alignItems={'center'} width={'100%'} p={'20px'}>
                    <Button onClick={handleDirection}>{dir === 'ltr' ? 'LTR': 'RTL'}</Button>
                </Flex>
                <Flex flexDir={'column'}>
                    <Box mb={ '20px' } _hover={{cursor: 'pointer'}} data-test-id='image-container'>
                        <img src={ '/assets/chucknorris.png' } alt={ 'Chuck Noris logo' } width={ '200px' } />
                    </Box>
                    <Flex mb={ '20px' }>
                        <Input placeholder={'Enter ChukNorras Text'} data-test-id='input-search' onChange={e=>{
                            setSearch(e.target.value);
                        }} />
                        <Button isDisabled={search.length === 0} data-test-id='search-button' onClick={handleSearch}>Search</Button>
                    </Flex>
                </Flex>
                <Flex flex={1} flexDir={'column'}>
                    {
                        isLoading ? <Spinner data-test-id={'spinner'} /> : <Jokes />
                    }
                </Flex>
            </Flex>
        </div>
    );
}

export default App;
