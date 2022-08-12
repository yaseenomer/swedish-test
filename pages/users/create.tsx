import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { motion } from "framer-motion";
import React from "react";
import TaskForm from "../../components/taskForm";
import UserForm from "../../components/userForm";

export default function UserCreate() {
  return (
    <motion.div
      initial={{ y: "-10vw", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", delay: 0.2, stiffness: 50 }}
    >
      <Head>
        <title>Create Task</title>
      </Head>

      <Flex flexDirection="column" alignItems="center">
        <UserForm user={null} />
      </Flex>
    </motion.div>
  );
}
