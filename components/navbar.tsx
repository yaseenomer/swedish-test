import React from "react";
import {
  Flex,
  Box,
  Button,
  Spacer,
  ButtonGroup,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md" color="brand.400">
          {" "}
          SWEDISH TECHNOLOGY
        </Heading>
      </Box>
      <ButtonGroup>
        <Link href="/">
          <Button variant="link">Home</Button>
        </Link>

        <Link href="/users">
          <Button variant="link">Users</Button>
        </Link>

        <Link href="/tasks">
          <Button variant="link">Tasks</Button>
        </Link>
      </ButtonGroup>
      <Spacer />
      <ButtonGroup gap="2">
        <Button colorScheme="gray">Log Out</Button>
      </ButtonGroup>
    </Flex>
  );
}
