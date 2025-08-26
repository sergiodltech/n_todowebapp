import * as React from "react";
import toDoLogo from "../resources/logo2.png";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import TaskItem from "./TaskItem";

type TaskObject = {
  text: string;
  createdAt: Date;
  completedAt: Date | undefined;
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
        completedAt: new Date(rawTask.completedAt),
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
  });

  // On mount, retrieve data from localStorage
  React.useEffect(() => {
    var tasks = getTasksFromLocalStorage();
    console.log("Loading to state: ");
    console.log(tasks);
    setState({
      ...state,
      tasks: tasks,
      newTaskInput: "",
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      newTaskInput: event.target.value,
    });
  };

  const addNewTask = (event: React.MouseEvent) => {
    const now = new Date();
    const taskKey = now.getTime().toString();
    const newTask = {
      text: state.newTaskInput,
      createdAt: now,
      completedAt: undefined,
      finished: false,
    };
    const newTasks = { ...state.tasks, [taskKey]: newTask };
    saveTasksToLocalStorage(newTasks);
    setState({
      ...state,
      tasks: newTasks,
    });
  };

  const deleteTask = (taskKey: string) => {
    const { [taskKey]: _, ...newTasks } = state.tasks;
    saveTasksToLocalStorage(newTasks);
    setState({
      ...state,
      tasks: newTasks,
    });
  };

  const unfinishedTasks = Object.keys(state.tasks)
    .map((taskKey) => {
      const task = state.tasks[taskKey];
      if (task.finished) {
        return;
      }
      return (
        <TaskItem
          key={taskKey}
          name={`ti-${taskKey}`}
          label={task.text}
          createdAt={task.createdAt}
          completedAt={task.completedAt}
          finished={task.finished}
          updateTaskList={updateTaskList}
          deleteTask={deleteTask}
        />
      );
    })
    .filter((x) => !!x);
  const finishedTasks = Object.keys(state.tasks)
    .map((taskKey) => {
      const task = state.tasks[taskKey];
      if (!task.finished) {
        return;
      }
      return (
        <TaskItem
          key={taskKey}
          name={`ti-${taskKey}`}
          label={task.text}
          createdAt={task.createdAt}
          completedAt={task.completedAt}
          finished={task.finished}
          updateTaskList={updateTaskList}
          deleteTask={deleteTask}
        />
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
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              Your very useful ToDo checklist
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
                    onChange={handleInputChange}
                  />
                  <IconButton
                    onMouseOut={() => console.log("out")}
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
            style={unfinishedTasks.length > 0 ? {} : { display: "none" }}
          >
            <FormControl
              fullWidth
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel sx={{ color: "whitesmoke" }}>
                Unfinished tasks
              </FormLabel>
              <FormGroup id="unfinished-tasks" key="unfinished-tasks">
                {unfinishedTasks}
              </FormGroup>
            </FormControl>
          </div>
          <div
            className="flex-row"
            style={finishedTasks.length > 0 ? {} : { display: "none" }}
          >
            <FormControl
              fullWidth
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel sx={{ color: "whitesmoke" }}>Finished tasks</FormLabel>
              <FormGroup id="finished-tasks" key="finished-tasks">
                {finishedTasks}
              </FormGroup>
            </FormControl>
          </div>
        </Box>
      </div>
    </main>
  );
}

export { ToDo };
export type { TaskObject };
