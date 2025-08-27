import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";

import type { TaskObject } from "./todo";
import ConfirmationDialog from "~/components/ConfirmationDialog";

interface ITaskItemParams {
  name: string;
  label: string;
  createdAt: Date;
  completedAt: Date | null;
  finished: boolean;
  updateTaskList: Function;
  deleteTasks: Function;
}

function TaskItem({
  name,
  label,
  createdAt,
  completedAt,
  finished,
  updateTaskList,
  deleteTasks,
}: ITaskItemParams) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const taskKey = name.split("-")[1];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    const completionTime = isChecked ? new Date() : null;
    const newTask: TaskObject = {
      text: label,
      createdAt: createdAt,
      completedAt: completionTime,
      finished: isChecked,
    };
    updateTaskList(taskKey, newTask);
  };

  const deleteText = (
    <span
      className="absolute bottom-1 right-2 text-xs text-red-500"
      onClick={() => setDialogOpen(true)}
    >
      Delete
    </span>
  );

  const timeLegend = () => {
    const type =
      completedAt !== null
        ? TimeLegendType.Completion
        : TimeLegendType.Creation;
    const now = new Date();
    const date: Date = completedAt ? completedAt : createdAt;
    const diff = now.valueOf() - date.valueOf();
    const diffInHours = diff / 1000 / 60 / 60;
    let sinceString = type == TimeLegendType.Completion ? "Finished " : "";
    if (diffInHours > 48) {
      const days = Math.round(diffInHours / 24);
      sinceString += `${days} days ago`;
    } else if (diffInHours > 24) {
      sinceString += "Yesterday";
    } else if (diffInHours > 1) {
      const hours = Math.round(diffInHours);
      const hrsString = hours == 1 ? "hr" : "hrs";
      sinceString += `${hours}${hrsString} ago`;
    } else {
      const mins = Math.round(diffInHours * 60);
      const minsString = mins == 1 ? "min" : "mins";
      sinceString += `${mins}${minsString} ago`;
    }
    return (
      <span className="absolute top-1 right-2 text-xs text-gray-500">
        {sinceString}
      </span>
    );
  };

  return (
    <div className="relative flex flex-col px-4 pt-3 pb-2 my-1 border rounded-lg">
      <FormControlLabel
        className="text-lg"
        aria-label={`task-element-${label.slice(0, 10)}`}
        label={label}
        control={
          <Checkbox checked={finished} onChange={handleChange} name={name} />
        }
      />
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => {
          deleteTasks([taskKey]);
          setDialogOpen(false);
        }}
        title="Task Delete"
        message={`Are you sure you want to delete the task "${label}"?`}
      />
      {timeLegend()}
      {deleteText}
    </div>
  );
}

export default TaskItem;

enum TimeLegendType {
  Creation,
  Completion,
}
