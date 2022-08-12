import {
  Button,
  Flex,
  Input,
  Heading,
  Box,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { AddIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm, useFieldArray } from "react-hook-form";
import { httpClient } from "../utils/http.util";
import { useRouter } from "next/router";
import Link from "next/link";
import { Task } from "../utils/model.utli";
import { useSelector, useDispatch } from "react-redux";

import { setTaskLoading, updateTask, addTask } from "../store/slices/task";

export default function TaskForm({ task }: { task?: Task | null }) {
  const dispatch = useDispatch();

  const { loading: taskLoading } = useSelector((state: any) => state.task);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      actions: task?.actions || ["action 1"],
      task_name: task?.task_name || "",
      task_date: task?.task_date || "",
    },
  });

  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "actions",
  });

  const onSubmit = async (body: any) => {
    dispatch(setTaskLoading(true));

    const method = task ? "PATCH" : "POST";

    const url = task ? `tasks/${task.id}` : "tasks";

    httpClient(url, { method, body })
      //  onSuccess:
      .then((res) => {
        task ? dispatch(updateTask(res)) : dispatch(addTask(res));

        router.push("/tasks");
      })
      .finally(() =>
        setTimeout(() => {
          dispatch(setTaskLoading(false));
        }, 2000)
      );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        flexDirection="column"
        background="gray.100"
        p={10}
        gap={5}
        rounded={20}
      >
        <Heading color="brand.400">Task Form</Heading>
        <Input
          placeholder="Task Name"
          focusBorderColor="brand.400"
          {...register("task_name", { required: true })}
        />

        <Input
          type="date"
          placeholder="Task Date"
          focusBorderColor="brand.400"
          {...register("task_date", { required: true })}
        />

        <Box borderWidth="1px" borderRadius="lg" p={5}>
          {fields.map((field, index) => (
            <InputGroup key={field.id} mb={2}>
              <Input
                placeholder="Action"
                focusBorderColor="brand.400"
                {...register(`actions.${index}`)}
                defaultValue="ddd"
              />

              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => remove(index)}>
                  <DeleteIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          ))}
          <Button
            m={2}
            color="brand.400"
            onClick={() => append(`action ${fields.length + 1}`)}
          >
            <AddIcon mx={1} />
            Add Action
          </Button>
        </Box>

        <Stack direction="row">
          <Button
            type="submit"
            bgColor="brand.400"
            colorScheme="brand"
            isLoading={taskLoading}
            loadingText="Saving..."
          >
            <AddIcon mr={2} />
            Save Task
          </Button>
          <Link href="/tasks">
            <Button>
              <CloseIcon mr={2} />
              Cancel
            </Button>
          </Link>
        </Stack>
      </Flex>
    </form>
  );
}
