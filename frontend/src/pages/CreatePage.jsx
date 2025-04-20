import React, {useState} from 'react';
import {Box, Button, Container, Heading, Input, useColorModeValue, VStack} from "@chakra-ui/react";

const CreatePage = props => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });

    const handleAddProduct = () => {
        console.log(newProduct)
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={8} rounded={"lg"} shadow={"lg"}>
                    <VStack spacing={4}>
                        <Input placeholder={"Product name"} name={"name"} value={newProduct.name}
                               onChange={e => setNewProduct({...newProduct, name: e.target.value})}/>
                        <Input placeholder={"Price"} name={"price"} value={newProduct.price} type={"number"}
                               onChange={e => setNewProduct({...newProduct, price: e.target.value})}/>
                        <Input placeholder={"Image URL"} name={"image"} value={newProduct.image} type={"url"}
                               onChange={e => setNewProduct({...newProduct, image: e.target.value})}/>

                        <Button colorScheme={"blue"} onClick={handleAddProduct} w={"full"}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

CreatePage.propTypes = {};

export default CreatePage;