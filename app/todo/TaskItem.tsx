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
      削除
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
    let sinceString = type == TimeLegendType.Completion ? "に完了 " : "";
    var timeString = "";
    if (diffInHours > 48) {
      const days = Math.round(diffInHours / 24);
      timeString += `${days}日前`;
    } else if (diffInHours > 24) {
      timeString += "昨日";
    } else if (diffInHours > 1) {
      const hours = Math.round(diffInHours);
      const hrsString = hours == 1 ? "時" : "時";
      timeString += `${hours}${hrsString}前`;
    } else {
      const mins = Math.round(diffInHours * 60);
      const minsString = mins == 1 ? "分" : "分";
      timeString += `${mins}${minsString}前`;
    }
    sinceString = timeString + sinceString;
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
        label={
          <span className="text-pretty md:text-balance break-words">
            {label}
          </span>
        }
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
        title="タスクを削除"
        message={`「${label}」のタスクを削除してもよろしいですか？`}
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
