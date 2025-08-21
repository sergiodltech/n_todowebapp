import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";

interface ITaskItemParams {
  name: string;
  label: string;
  createdAt: Date;
  expiresAt: Date;
  finished: boolean;
}

function TaskItem({
  name,
  label,
  createdAt,
  expiresAt,
  finished,
}: ITaskItemParams) {
  const [state, setState] = React.useState({
    checked: finished,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const sinceString = (createdAt: Date) => {
    const now = new Date();
    const diff = now.valueOf() - createdAt.valueOf();
    const diffInHours = diff / 1000 / 60 / 60;
    let sinceString = "";
    if (diffInHours > 48) {
      const days = Math.round(diffInHours / 24);
      sinceString = `${days} days ago`;
    } else if (diffInHours > 24) {
      sinceString = "Yesterday";
    } else if (diffInHours > 1) {
      const hours = Math.round(diffInHours);
      const hrsString = hours == 1 ? "hr" : "hrs";
      sinceString = `${hours}${hrsString} ago`;
    } else {
      const mins = Math.round(diffInHours * 60);
      const minsString = mins == 1 ? "min" : "mins";
      sinceString = `${mins}${minsString} ago`;
    }
    return (
      <span className="absolute top-1 right-2 text-xs text-gray-500">
        {sinceString}
      </span>
    );
  };

  return (
    <div className="relative flex flex-col px-4 py-2 my-2 border rounded-lg">
      <FormControlLabel
        className="text-lg"
        aria-label={`task-element-${label.slice(0, 10)}`}
        label={label}
        control={
          <Checkbox
            checked={state.checked}
            onChange={handleChange}
            name={name}
          />
        }
      />
      {sinceString(createdAt)}
    </div>
  );
}

export default TaskItem;
