import {
  Modal, ModalContent, ModalCloseButton, ModalBody, ModalHeader, Button, Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  
  
  Stack,

  Image,
} from "@chakra-ui/react";

export default function BlogForm(props) {
  
  function formHandler(event) {
    
    event.preventDefault();
    console.log();
    const formInfo = {
      role: event.target.role.value,
      content:event.target.content.value,
    }
    props.blogInfoHandler(formInfo);

  }

  return (

    <Modal isOpen={props.model} onClose={() => props.hidingModel()} >

      <ModalContent pb={5}>
        <ModalHeader>why do you love working with us ?</ModalHeader>
        <ModalCloseButton onClick={() => props.hidingModel()} />
        <ModalBody>
          <Stack direction={{ base: 'column', md: 'row' }}>
            <Flex >
              <Stack spacing={4} w={'full'} >
                <Heading fontSize={'2xl'}> </Heading>
              
                  <form onSubmit={(event)=>formHandler(event)}> 
                    <FormControl id="role">
                      <FormLabel >Role</FormLabel>
                      <Input type ='text' />
                    </FormControl>
                    <FormControl id="content">
                      <FormLabel >Post Description</FormLabel>
                      <Input  type="text"/>
                    </FormControl>
                   
                      
                      <Button colorScheme={'blue'} variant={'solid'}type = "submit" onClick={() => props.hidingModel()} >
                        Post
                      </Button>
               
                  </form>
              
              </Stack>
            </Flex>
            <Flex flex={4}>
              <Image
                alt={'post Image'}
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


