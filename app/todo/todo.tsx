import * as React from "react";
import toDoLogo from "../resources/logo2.png";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import ConfirmationDialog from "~/components/ConfirmationDialog";
import { motion, AnimatePresence } from "framer-motion";

import TaskItem from "./TaskItem";

type TaskObject = {
  text: string;
  createdAt: Date;
  completedAt: Date | null;
  finished: boolean;
};

type RawTaskObject = {
  text: string;
  createdAt: string;
  completedAt: string;
  finished: boolean;
};

interface IToDoState {
  tasks: { [key: string]: TaskObject };
  newTaskInput: string;
  isClearFDialogOpen: boolean;
  isClearUDialogOpen: boolean;
}

const LOCAL_STORAGE_KEY = "tasks";

function getTasksFromLocalStorage(): { [key: string]: TaskObject } {
  var tasks: { [key: string]: TaskObject } = {};
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const rawTasksList: { [key: string]: RawTaskObject } = item
      ? JSON.parse(item)
      : {};
    Object.keys(rawTasksList).map((taskKey) => {
      const rawTask: RawTaskObject = rawTasksList[taskKey];
      tasks[taskKey] = {
        text: rawTask.text,
        createdAt: new Date(rawTask.createdAt),
        completedAt: rawTask.completedAt ? new Date(rawTask.completedAt) : null,
        finished: rawTask.finished,
      };
    });
  } catch (error) {
    console.log("Failed to get tasks from localStorage: " + error);
  }
  return tasks;
}

function saveTasksToLocalStorage(newTasks: {
  [key: string]: TaskObject;
}): boolean {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    return true;
  } catch (error) {
    console.log("Failed to save tasks to localStorage: " + error);
    return false;
  }
}

function ToDo() {
  const [state, setState] = React.useState<IToDoState>({
    tasks: {},
    newTaskInput: "",
    isClearUDialogOpen: false,
    isClearFDialogOpen: false,
  });

  // On mount, retrieve data from localStorage
  React.useEffect(() => {
    var tasks = getTasksFromLocalStorage();
    console.log("Loading to state: ");
    console.log(tasks);
    setState({
      tasks: tasks,
      newTaskInput: "",
      isClearUDialogOpen: false,
      isClearFDialogOpen: false,
    });
  }, []);

  const updateTaskList = (taskKey: string, newTask: TaskObject) => {
    const newTasks = { ...state.tasks, [taskKey]: newTask };
    saveTasksToLocalStorage(newTasks);
    setState({
      ...state,
      tasks: newTasks,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({
      ...state,
      newTaskInput: event.target.value,
    });

  const addNewTask = () => {
    const newTaskText = state.newTaskInput.trim();
    if (newTaskText.length === 0) {
      setState({ ...state, newTaskInput: "" });
      return;
    }
    const now = new Date();
    const taskKey = now.getTime().toString();
    const newTask = {
      text: state.newTaskInput,
      createdAt: now,
      completedAt: null,
      finished: false,
    };
    const newTasks = { ...state.tasks, [taskKey]: newTask };
    saveTasksToLocalStorage(newTasks);
    setState({
      ...state,
      newTaskInput: "",
      tasks: newTasks,
    });
  };

  const deleteTasks = (tasksKeys: string[]) => {
    const newTasks: { [key: string]: TaskObject } = {};
    Object.keys(state.tasks).map((taskKey: string) => {
      if (tasksKeys.includes(taskKey)) {
        return;
      }
      newTasks[taskKey] = state.tasks[taskKey];
    });
    saveTasksToLocalStorage(newTasks);
    setState({
      ...state,
      tasks: newTasks,
      isClearUDialogOpen: false,
      isClearFDialogOpen: false,
    });
  };

  const unfinishedTasksKeys = new Array<string>();
  const unfinishedTasks = Object.keys(state.tasks)
    .map((taskKey) => {
      const task = state.tasks[taskKey];
      if (task.finished) {
        return;
      }
      unfinishedTasksKeys.push(taskKey);
      return (
        <AnimatePresence>
          <motion.div key={taskKey} layout transition={{ duration: 0.8 }}>
            <TaskItem
              name={`ti-${taskKey}`}
              label={task.text}
              createdAt={task.createdAt}
              completedAt={task.completedAt}
              finished={task.finished}
              updateTaskList={updateTaskList}
              deleteTasks={deleteTasks}
            />
          </motion.div>
        </AnimatePresence>
      );
    })
    .filter((x) => !!x);

  const finishedTasksKeys = new Array<string>();
  const finishedTasks = Object.keys(state.tasks)
    .map((taskKey) => {
      const task = state.tasks[taskKey];
      if (!task.finished) {
        return;
      }
      finishedTasksKeys.push(taskKey);
      return (
        <AnimatePresence>
          <motion.div key={taskKey} layout transition={{ duration: 0.8 }}>
            <TaskItem
              name={`ti-${taskKey}`}
              label={task.text}
              createdAt={task.createdAt}
              completedAt={task.completedAt}
              finished={task.finished}
              updateTaskList={updateTaskList}
              deleteTasks={deleteTasks}
            />
          </motion.div>
        </AnimatePresence>
      );
    })
    .filter((x) => !!x);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={toDoLogo}
              alt="Todo Logo"
              className="block w-3/5 mx-auto"
            />
          </div>
        </header>
        <Box sx={{ display: "flex-col", width: 1 / 2 }}>
          <div className="flex-row">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center font-extrabold">
              とても便利なあなたのToDoリスト
            </p>
          </div>
          <div className="flex-row text-center">
            <FormControl sx={{ m: 5 }} component="fieldset" variant="standard">
              <FormGroup id="new-task-form" key="new-task-form">
                <div className="flex flex-row items-center gap-2">
                  <Input
                    type="text"
                    id="new-task-input"
                    name="new-task-input"
                    value={state.newTaskInput}
                    onChange={handleInputChange}
                    placeholder="新しいタスクを追加"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        addNewTask();
                      }
                    }}
                  />
                  <IconButton
                    onClick={addNewTask}
                    id="new-task-button"
                    name="new-task-button"
                  >
                    <AddCircleOutlineIcon color="primary" />
                  </IconButton>
                </div>
              </FormGroup>
            </FormControl>
          </div>
          <div
            className="flex-row"
            style={unfinishedTasksKeys.length > 0 ? {} : { display: "none" }}
          >
            <FormControl
              fullWidth
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel sx={{ color: "whitesmoke" }}>未完了のタスク</FormLabel>
              <FormGroup id="unfinished-tasks" key="unfinished-tasks">
                {unfinishedTasks}
                <Button
                  onClick={() =>
                    setState({ ...state, isClearUDialogOpen: true })
                  }
                >
                  削除
                </Button>
              </FormGroup>
            </FormControl>
            <ConfirmationDialog
              open={state.isClearUDialogOpen}
              onClose={() => setState({ ...state, isClearUDialogOpen: false })}
              onConfirm={() => deleteTasks(unfinishedTasksKeys)}
              title="未完了のタスクを削除"
              message={`すべての${unfinishedTasksKeys.length}未完了したタスクを削除してもよろしいですか？`}
            />
          </div>
          <div
            className="flex-row"
            style={finishedTasksKeys.length > 0 ? {} : { display: "none" }}
          >
            <FormControl
              fullWidth
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel sx={{ color: "whitesmoke" }}>完了のタスク</FormLabel>
              <FormGroup id="finished-tasks" key="finished-tasks">
                {finishedTasks}
                <Button
                  onClick={() =>
                    setState({ ...state, isClearFDialogOpen: true })
                  }
                >
                  削除
                </Button>
              </FormGroup>
            </FormControl>
            <ConfirmationDialog
              open={state.isClearFDialogOpen}
              onClose={() => setState({ ...state, isClearFDialogOpen: false })}
              onConfirm={() => deleteTasks(finishedTasksKeys)}
              title="完了のタスクを削除"
              message={`すべての${finishedTasksKeys.length}完了したタスクを削除してもよろしいですか？`}
            />
          </div>
        </Box>
      </div>
    </main>
  );
}

export { ToDo };
export type { TaskObject };
