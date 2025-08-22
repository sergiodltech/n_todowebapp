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
import { finished } from "stream";

type TaskObject = {
  text: string;
  createdAt: Date;
  completedAt: Date | undefined;
  finished: boolean;
};

interface IToDoState {
  tasks: { [key: string]: TaskObject };
  newTaskInput: string;
}

function ToDo() {
  const [state, setState] = React.useState<IToDoState>({
    tasks: {},
    newTaskInput: "",
  });

  // On mount, retrieve data from localStorage
  React.useEffect(() => {
    setState({
      ...state,
      tasks: tasks,
    });
  }, []);

  const updateTaskList = (taskKey: string, newTask: TaskObject) => {
    tasks[taskKey] = newTask;
    setState({
      ...state,
      tasks: tasks,
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      newTaskInput: event.target.value,
    });
  };
  const addNewTask = (_: React.MouseEvent<SVGSVGElement>) => {
    const now = new Date();
    tasks[now.getTime().toString()] = {
      text: state.newTaskInput,
      createdAt: now,
      completedAt: undefined,
      finished: false,
    };
    setState({
      ...state,
      tasks: tasks,
    });
  };

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
          <div className="flex-row">
            <FormControl sx={{ m: 5 }} component="fieldset" variant="standard">
              <Input
                type="text"
                name="new-task-input"
                onChange={handleInputChange}
              />
              &nbsp;
              <AddCircleOutlineIcon color="primary" onClick={addNewTask} />
            </FormControl>
          </div>
          <div className="flex-row">
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel sx={{ color: "whitesmoke" }}>
                Unfinished tasks
              </FormLabel>
              <FormGroup id="unfinished-tasks" key="unfinished-tasks">
                {Object.keys(state.tasks).map((taskKey) => {
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
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </div>
          <div className="flex-row">
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel sx={{ color: "whitesmoke" }}>Finished tasks</FormLabel>
              <FormGroup id="finished-tasks" key="finished-tasks">
                {Object.keys(state.tasks).map((taskKey) => {
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
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </div>
        </Box>
      </div>
    </main>
  );
}
const tasks: { [key: string]: TaskObject } = {
  [new Date("2025-08-10 12:20:00").getTime().toString()]: {
    text: "Eat",
    createdAt: new Date("2025-08-10 12:20:00"),
    completedAt: new Date("2025-08-20 13:20:00"),
    finished: true,
  },
  [new Date("2025-08-20 13:30:00").getTime().toString()]: {
    text: "Program",
    createdAt: new Date("2025-08-20 13:30:00"),
    completedAt: new Date("2025-08-20 15:00:00"),
    finished: true,
  },
  [new Date("2025-08-21 14:10:00").getTime().toString()]: {
    text: "Meeting with Y先生",
    createdAt: new Date("2025-08-21 14:10:00"),
    completedAt: undefined,
    finished: false,
  },
  [new Date("2025-08-21 15:00:00").getTime().toString()]: {
    text: "Practice guitar",
    createdAt: new Date("2025-08-21 15:00:00"),
    completedAt: undefined,
    finished: false,
  },
};

export { ToDo };
export type { TaskObject };
