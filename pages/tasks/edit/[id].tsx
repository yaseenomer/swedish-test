import React from "react";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { httpClient } from "../../../utils/http.util";
import TaskForm from "../../../components/taskForm";

import { useDispatch } from "react-redux";

import { setTaskLoading } from "../../../store/slices/task";
import { Task } from "../../../utils/model.utli";

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  return {
    props: { id },
  };
}

export default function Edit({ id }: any) {
  const dispatch = useDispatch();

  const [task, setTask] = React.useState<Task | null>(null);

  React.useEffect(() => {
    dispatch(setTaskLoading(true));

    httpClient(`tasks/${id}`)
      .then((res) => setTask(res))
      .finally(() => dispatch(setTaskLoading(false)));
  }, [dispatch, id]);

  if (!task) return null;

  return (
    <motion.div
      initial={{ y: "-10vw", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", delay: 0.2, stiffness: 50 }}
    >
      <Flex flexDirection="column" alignItems="center">
        <TaskForm task={task} />
      </Flex>
    </motion.div>
  );
}
