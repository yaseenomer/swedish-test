import { Flex, Heading, Input, Button } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

export default function Login() {
  return (
    <>
      <Head>
        <title>LOGIN</title>
      </Head>
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Flex
          direction="column"
          background="gray.100"
          p={10}
          gap={5}
          rounded={10}
        >
          <Heading color="brand.400">Loagin</Heading>
          <Input placeholder="user@example.com" focusBorderColor="brand.400" />
          <Input
            placeholder="********"
            type="password"
            focusBorderColor="brand.400"
          />

          <Button bgColor="brand.400" colorScheme="brand">
            Login
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
