import Head from "next/head";
import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import TableComponent from "../../components/tableComponent";

export default function users() {
  return (
    <motion.div
      initial={{ y: "10vw", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", delay: 0.2, stiffness: 50 }}
    >
      <Head>
        <title>Users</title>
      </Head>
      <main>
        <Flex minWidth="max-content" gap="2">
          <Link href="/users/create">
            <Button m={5} bgColor="brand.400" colorScheme="brand">
              <AddIcon mr={2} />
              create new User
            </Button>
          </Link>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Flex background="gray.100" p={10} rounded={20}>
            <TableComponent />
          </Flex>
        </Flex>
      </main>
    </motion.div>
  );
}
