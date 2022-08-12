import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  Select,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { setTasks, updateTask } from "../store/slices/task";
import { updateUser } from "../store/slices/user";
import { getTasks, httpClient } from "../utils/http.util";
import { Task, User } from "../utils/model.utli";

export default function UserTaskForm({
  userId,
  userTask,
}: {
  userId?: number | string;
  userTask: User["userTask"];
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const dispatch = useDispatch();

  const { tasks } = useSelector((state: any) => state.task);

  const [actions, setActions] = React.useState([]);

  const { register, handleSubmit } = useForm();

  const toast = useToast();

  React.useEffect(() => {
    getTasks().then((tasks: Task[]) => dispatch(setTasks(tasks)));
  }, [dispatch]);

  const getTaskById = (id: number | string) => {
    return tasks.find((task: Task) => task.id === +id);
  };

  const onChangeTask = async (e: any) => {
    const { value } = e.target;

    const task = await getTaskById(value);

    setActions(task?.actions);
  };

  const onSubmit = (data: any) => {
    const { task_name, task_date } = getTaskById(data.id);

    const body = {
      task_name,
      task_date,
      ...data,
    };

    httpClient(`users/${userId}`, {
      method: "PATCH",
      body: {
        userTask: userTask && userTask.length ? [...userTask, body] : [body],
      },
    }).then((data) => {
      dispatch(updateUser(data));

      toast({
        title: "Success",
        description: "User task added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    });
  };

  return (
    <>
      <Button mt={4} onClick={onOpen}>
        <AddIcon color="brand.400" mr={2} />
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDirection="column" p={10} gap={5} rounded={20}>
                <Select
                  placeholder="Select Task"
                  focusBorderColor="brand.400"
                  {...register("id", { required: true })}
                  onChange={onChangeTask}
                >
                  {tasks.map((task: any) => (
                    <option key={task.id} value={task.id}>
                      {task?.task_name}
                    </option>
                  ))}
                </Select>

                <Select
                  placeholder="Task Actions"
                  focusBorderColor="brand.400"
                  {...register("actions", { required: true })}
                  multiple
                  size={50}
                >
                  {actions?.map((action: any) => (
                    <option key={action} value={action}>
                      {action}
                    </option>
                  ))}
                </Select>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={2}>
                Close
              </Button>
              <Button type="submit" colorScheme="brand">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
