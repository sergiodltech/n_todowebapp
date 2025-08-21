import toDoLogo from "../resources/logo.png";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";

import TaskItem from "./TaskItem";

export function ToDo() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img src={toDoLogo} alt="Todo Logo" className="block w-full" />
          </div>
        </header>
        <Box sx={{ display: "flex-col" }}>
          <div>
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              Your very useful ToDo checklist
              <br />
              <Input id="add-new-task" />
            </p>
          </div>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel sx={{ color: "whitesmoke" }}>
              Uncompleted tasks
            </FormLabel>
            {tasks.map(({ text, createdAt, expires, finished }) => {
              let key = createdAt.getTime();
              return (
                <TaskItem
                  key={key}
                  name={`ti-${key}`}
                  label={text}
                  createdAt={createdAt}
                  expiresAt={expires}
                  finished={finished}
                />
              );
            })}
          </FormControl>
        </Box>
      </div>
    </main>
  );
}

const tasks = [
  {
    text: "Eat",
    createdAt: new Date("2025-08-10 12:20:00"),
    expires: new Date("2025-08-20 13:20:00"),
    finished: true,
  },
  {
    text: "Program",
    createdAt: new Date("2025-08-20 13:30:00"),
    expires: new Date("2025-08-20 15:00:00"),
    finished: true,
  },
  {
    text: "Meeting with Y先生",
    createdAt: new Date("2025-08-21 14:10:00"),
    expires: new Date("2025-08-21 14:50:00"),
    finished: false,
  },
  {
    text: "Practice guitar",
    createdAt: new Date("2025-08-21 15:00:00"),
    expires: new Date("2025-08-21 20:00:00"),
    finished: false,
  },
];
