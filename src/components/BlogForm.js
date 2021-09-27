import { Modal, ModalContent, ModalCloseButton, ModalBody, ModalHeader,Button,Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
  
    Image, } from "@chakra-ui/react";

export default function BlogForm(props) {
    return (

        <Modal isOpen={props.model} onClose={()=>props.hidingModel()} >

            <ModalContent pb={5}>
                <ModalHeader>why do you love working with us ?</ModalHeader>
                <ModalCloseButton onClick={()=>props.hidingModel()} />
                <ModalBody>
                <Stack  direction={{ base: 'column', md: 'row' }}>
        <Flex >
          <Stack spacing={4} w={'full'} >
            <Heading fontSize={'2xl'}> </Heading>
            <FormControl id="email">
              <FormLabel>Role</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Post Description</FormLabel>
              <Input />
            </FormControl>
            <Stack spacing={6}>
             
              <Button colorScheme={'blue'} variant={'solid'}>
               Post 
              </Button>
            </Stack>
          </Stack>
        </Flex> 
        <Flex flex={4}>
          <Image 
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBj5fzx7tOJyLPXfby43X_oaz6C-_XITaEw&usqp=CAU'
            }
          />
        </Flex>
      </Stack>
  
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

      
  