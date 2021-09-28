import {
    Avatar,
    Box,
    chakra,
   
    Flex,
    Icon,
    SimpleGrid,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  const staff = [
    {
      name: 'Brandon P.',
      role: 'Chief Marketing Officer',
      content:
        'It really saves me time and effort. It is exactly what our business has been lacking. HRMACT is the most valuable business resource we have EVER purchased',
      avatar:
        'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    },
    {
      name: 'Krysta B.',
      role: 'Social Media Manager',
      content:
        "I didn't even need training. We've used HRMACT for the last five years. I have gotten at least 50 times the value from HٌRMACT I made back the purchase price in just 48 hours!",
      avatar:
        'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    },
    {
      name: 'Darcy L.',
      role: 'Sales Assistant',
      content:
        "Thank you for making it painless, pleasant and most of all, hassle free! I'm good to go. No matter where you go, HRMACT is the coolest, most happening thing around! I love HRMACT!",
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
    },
  
  ];
  
 
  
  

  
  function Card(props) {
    // const { name, role, content, avatar } = props;
    return (
      <Flex
        boxShadow={'lg'}
        maxW={'640px'}
        direction={{ base: 'column-reverse', md: 'row' }}
        width={'full'}
        rounded={'xl'}
        p={10}
        justifyContent={'space-between'}
        position={'relative'}
        bg={useColorModeValue('white', 'gray.800')}
       >
        <Flex
          direction={'column'}
          textAlign={'left'}
          justifyContent={'space-between'}>
          <chakra.p
            fontFamily={'Inter'}
            fontWeight={'medium'}
            fontSize={'15px'}
            pb={4}>
            {props.content}
          </chakra.p>
          <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
            {props.name}
            <chakra.span
              fontFamily={'Inter'}
              fontWeight={'medium'}
              color={'gray.500'}>
              {' '}
              - {props.role}
            </chakra.span>
          </chakra.p>
        </Flex>
        <Avatar
          src={props.avatar}
          height={'80px'}
          width={'80px'}
          alignSelf={'center'}
          m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
        />
      </Flex>
    );
  }
  
  export default function Blog(props) {
    return (
      <Flex
        textAlign={'center'}
        pt={10}
        margin={10}
        justifyContent={'center'}
        direction={'column'}
        >
        <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
          <chakra.h3
            fontFamily={'Work Sans'}
            fontWeight={'bold'}
            fontSize={20}
            textTransform={'uppercase'}
            color={'purple.400'}>
            We do Care about Our Employees 
          </chakra.h3>
          <chakra.h1
            py={5}
            fontSize={48}
            fontFamily={'Work Sans'}
            fontWeight={'bold'}
            color={useColorModeValue('gray.700', 'gray.50')}>
            You're in a good company
          </chakra.h1>
          <chakra.h2
            margin={'auto'}
            width={'70%'}
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={useColorModeValue('gray.500', 'gray.400')}>
            See why over{' '}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
              300+
            </chakra.strong>{' '}
            employees joined Our family and we are growing more and more !
          </chakra.h2>
        </Box>
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing={'20'}
          mt={16}
          mx={'auto'}>
          {props.blog.map((cardInfo, index) => (
            <Card name={cardInfo.name}  content={cardInfo.content}  avatar={cardInfo.avatar}  role={cardInfo.role}  index={index} />
          ))}
        </SimpleGrid>
        <Box margin={5}>
          
           <Button 
            colorScheme={'messenger'}
           onClick = {()=>props.showingModel()}>Add your own post</Button>
    
        </Box>
      </Flex>
    );
  }
  
  