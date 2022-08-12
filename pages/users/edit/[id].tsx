import React from "react";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { httpClient } from "../../../utils/http.util";

import { useDispatch } from "react-redux";

import { setUserLoading } from "../../../store/slices/user";
import { User } from "../../../utils/model.utli";
import UserForm from "../../../components/userForm";

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  return {
    props: { id },
  };
}

export default function Edit({ id }: any) {
  const dispatch = useDispatch();

  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    dispatch(setUserLoading(true));

    httpClient(`users/${id}`)
      .then((res) => setUser(res))
      .finally(() => dispatch(setUserLoading(false)));
  }, [dispatch, id]);

  if (!user) return null;

  console.log("user", user);

  return (
    <motion.div
      initial={{ y: "-10vw", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", delay: 0.2, stiffness: 50 }}
    >
      <Flex flexDirection="column" alignItems="center">
        <UserForm user={user["userData"]} id={user.id} />
      </Flex>
    </motion.div>
  );
}
