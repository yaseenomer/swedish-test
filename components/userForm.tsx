import {
  Button,
  Flex,
  Input,
  Heading,
  Stack,
  Select,
  Switch,
  FormControl,
  FormLabel,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { AddIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm, useFieldArray } from "react-hook-form";
import { httpClient } from "../utils/http.util";
import { useRouter } from "next/router";
import Link from "next/link";
import { User } from "../utils/model.utli";
import { useSelector, useDispatch } from "react-redux";

import { addUser, updateUser, setUserLoading } from "../store/slices/user";

export default function UserForm({
  user,
  id,
}: {
  user?: User["userData"] | null;
  id?: number;
}) {
  const dispatch = useDispatch();

  const [actions, setActions] = React.useState([]);

  const { loading: userLoading } = useSelector((state: any) => state.user);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_name: user?.user_name || "",
      password: user?.password || "",
      user_type: user?.user_type || "",
      active: user?.active || "",
      create_data: user?.create_date || Date.now().toString(),
      activate_date: user?.activate_date || "",
      deactivate_date: user?.deactivate_date || "",
      update_date: Date.now().toString(),
    },
  });

  //   const onChangeTask = async (e: any) => {
  //     const { value } = e.target;
  //     console.log(value);
  //     const task = await tasks.find((task: any) => task.id === +value);

  //     console.log(task);

  //     setActions(task?.actions);
  //   };

  const router = useRouter();

  const onSubmit = async (data: any) => {
    dispatch(setUserLoading(true));

    const method = user ? "PATCH" : "POST";

    const url = user ? `users/${id}` : "users";

    httpClient(url, { method, body: { userData: data } })
      //  onSuccess:
      .then((res) => {
        user ? dispatch(updateUser(res)) : dispatch(addUser(res));

        router.push("/users");
      })
      .finally(() =>
        setTimeout(() => {
          dispatch(setUserLoading(false));
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
          placeholder="User Name"
          focusBorderColor="brand.400"
          {...register("user_name", { required: true })}
        />

        <Input
          type="password"
          placeholder="Password"
          focusBorderColor="brand.400"
          {...register("password", { required: true })}
        />

        <Select
          placeholder="User Type"
          focusBorderColor="brand.400"
          {...register("user_type", { required: true })}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>

        <FormControl as={SimpleGrid} columns={{ base: 2 }}>
          <Switch
            isChecked={user?.active}
            colorScheme="green"
            {...register("active")}
          />
          <FormLabel htmlFor="active">Status</FormLabel>
        </FormControl>

        {/* <Select
          placeholder="Task"
          focusBorderColor="brand.400"
          {...register("user_type", { required: true })}
          onChange={onChangeTask}
        >
          {tasks.map((task: any) => (
            <option key={task.id} value={task.id}>
              {task.task_name}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Task Actions"
          focusBorderColor="brand.400"
          {...register("action", { required: true })}
          multiple
          size="lg"
        >
          {actions?.map((action: any) => (
            <option key={action} value={action}>
              {action}
            </option>
          ))}
        </Select> */}

        {/* <Box borderWidth="1px" borderRadius="lg" p={5}>
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
        </Box> */}

        <Stack direction="row">
          <Button
            type="submit"
            bgColor="brand.400"
            colorScheme="brand"
            isLoading={userLoading}
            loadingText="Saving..."
          >
            <AddIcon mr={2} />
            Save User
          </Button>
          <Link href="/users">
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
