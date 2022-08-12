import {
  ButtonGroup,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import Head from "next/head";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { httpClient } from "../../utils/http.util";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, setTaskLoading, deleteTask } from "../../store/slices/task";

export default function Tasks() {
  const dispatch = useDispatch();

  const { tasks, loading: taskLoading } = useSelector(
    (state: any) => state.task
  );

  React.useEffect(() => {
    const getTasks = async () => {
      dispatch(setTaskLoading(true));
      httpClient("tasks")
        .then((res) => dispatch(setTasks(res)))
        .finally(() => dispatch(setTaskLoading(false)));
    };
    getTasks();
  }, [dispatch]);

  return (
    <motion.div
      initial={{ y: "10vw", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", delay: 0.2, stiffness: 50 }}
    >
      <Head>
        <title>Tasks</title>
      </Head>
      <div>
        <Flex minWidth="max-content" gap="2">
          <Link href="/tasks/create">
            <Button m={5} bgColor="brand.400" colorScheme="brand">
              <AddIcon mr={2} />
              create new task
            </Button>
          </Link>
        </Flex>
        <Flex justifyContent="center">
          <Flex background="gray.100" p={10} rounded={20}>
            <Table size="sm" p={10} colorScheme="brand">
              <Thead>
                <Tr>
                  <Th>Task Name</Th>
                  <Th>Task Date</Th>
                  <Th>Actions</Th>
                  <Th>Operation</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tasks.map((task, x) => (
                  <Tr key={x}>
                    <Td>{task?.task_name}</Td>
                    <Td>{task?.task_date.toString()}</Td>
                    <Td>
                      <Stack direction="column">
                        {task?.actions.map((action, y) => (
                          <Text key={y}>{action}</Text>
                        ))}
                      </Stack>
                    </Td>
                    <Td>
                      <ButtonGroup spacing={4}>
                        <Link href={`/tasks/edit/${task.id}`}>
                          <Button>
                            <EditIcon color="green" />
                          </Button>
                        </Link>

                        <Button
                          onClick={async () => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this task?"
                              )
                            ) {
                              await httpClient(`tasks/${task.id}`, {
                                method: "DELETE",
                              });
                              dispatch(deleteTask(task.id));
                            }
                          }}
                        >
                          <DeleteIcon color="brand.400" />
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </Flex>
      </div>
    </motion.div>
  );
}
