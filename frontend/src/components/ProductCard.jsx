import React, {useState} from 'react';
import {
    Box, Button,
    Heading,
    HStack,
    IconButton,
    Image, Input,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast, VStack
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import numeral from 'numeral';

import {useProductStore} from "../store/product.js";

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const {deleteProduct, updateProduct} = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (id) => {
        const {success, message} = await deleteProduct(id);
        if (!success) {
            toast({title: message, status: "error", duration: 5000, isClosable: true});
        } else {
            toast({title: message, status: "success", duration: 5000, isClosable: true});
        }
    };

    const handleUpdateProduct = async (id, updatedProduct) => {
        const {success, message} = await updateProduct(id, updatedProduct);
        if (!success) {
            toast({title: message, status: "error", duration: 5000, isClosable: true});
        } else {
            toast({title: message, status: "success", duration: 5000, isClosable: true});
            onClose();
        }
    };

    return (
        <Box shadow={"lg"} rounded={"lg"} overflow={"hidden"} transition={"all .3s"} cursor={"pointer"}
             _hover={{transform: "translateY(-5px)", shadow: "xl"}} bg={bg}>
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"}/>

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                    {numeral(product.price).format("$0,0.00")}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon/>} colorScheme={"blue"} onClick={onOpen}/>
                    <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct(product._id)}
                                colorScheme={"red"}/>
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        Update Product
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder={"Product name"} name={"name"} value={updatedProduct.name}
                                   onChange={e => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                            <Input placeholder={"Price"} name={"price"} type={"number"} value={updatedProduct.price}
                                   onChange={e => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                            <Input placeholder={"Image URL"} name={"image"} type={"url"} value={updatedProduct.image}
                                   onChange={e => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme={"blue"} mr={3}
                                onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update Product
                        </Button>
                        <Button variant={"ghost"} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;