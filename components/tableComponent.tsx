import Link from "next/link";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  Button,
  Switch,
  Badge,
  useToast,
  Spinner,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";

import React from "react";
import { httpClient } from "../utils/http.util";
import { useDispatch, useSelector } from "react-redux";

import { setUsers, setUserLoading, deleteUser } from "../store/slices/user";
import UserTaskForm from "./userTaskForm";

export default function TableComponent() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: any) => state.user);
  const toast = useToast();

  React.useEffect(() => {
    dispatch(setUserLoading(true));
    httpClient("users")
      .then((res) => dispatch(setUsers(res)))
      .finally(() => dispatch(setUserLoading(false)));
  }, [dispatch]);

  const onDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(setUserLoading(true));
      httpClient(`users/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast({
            title: "User Deleted",
            description: "We've Deleted User for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          dispatch(deleteUser(id));
        })
        .finally(() =>
          setTimeout(() => {
            dispatch(setUserLoading(false));
          }, 2000)
        );
    }
  };

  const onToggleStatus = (id: number, active: boolean) => {
    dispatch(setUserLoading(true));
    httpClient(`users/${id}`, {
      method: "PATCH",
      body: { active: !active },
    })
      .then(() => {
        toast({
          title: "User Updated",
          description: "We've Updated User for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(setUserLoading(false));
      })
      .catch(() => {
        toast({
          title: "User Update Failed",
          description: "We've Failed to Update User for you.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() =>
        setTimeout(() => {
          dispatch(setUserLoading(false));
        }, 2000)
      );
  };

  return (
    <div className="p-2">
      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      <Table size="sm" p={10} colorScheme="brand">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>User Type</Th>
            <Th>Status</Th>
            <Th>Task</Th>
            <Th>Oprations</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user: any, x: number) => (
            <Tr key={`users-${x}`}>
              <Td>{user?.userData?.user_name}</Td>
              <Td>
                <Badge
                  variant="subtle"
                  colorScheme={
                    user?.userData?.user_type == "admin" ? "brand" : "purple"
                  }
                >
                  {user?.userData?.user_type}
                </Badge>
              </Td>
              <Td>
                <Switch
                  value={user?.active}
                  defaultChecked={user?.userData?.active}
                  onChange={() =>
                    onToggleStatus(user?.id, user?.userData?.active)
                  }
                  colorScheme="green"
                />
              </Td>
              <Td>
                <OrderedList>
                  {user?.userTask?.map((task: any, x: number) => (
                    <div key={`task-${x}`}>
                      <ListItem>{task.task_name}</ListItem>
                      {task?.actions && (
                        <UnorderedList>
                          {task?.actions?.map((action: any, x: number) => (
                            <ListItem key={`action-${x}`}>{action}</ListItem>
                          ))}
                        </UnorderedList>
                      )}
                    </div>
                  ))}
                </OrderedList>

                <UserTaskForm userId={user.id} userTask={user?.userTask} />
              </Td>
              <Td>
                <ButtonGroup spacing={4}>
                  <Link href={`/users/edit/${user.id}`}>
                    <Button>
                      <EditIcon color="green" />
                    </Button>
                  </Link>

                  <Button onClick={() => onDeleteUser(user.id)}>
                    <DeleteIcon color="brand.400" />
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <div className="h-4" />
    </div>
  );
}
