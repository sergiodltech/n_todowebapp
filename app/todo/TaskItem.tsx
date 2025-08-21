import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";

interface ITaskItemParams {
  name: string;
  label: string;
  createdAt: Date;
  completedAt: Date | undefined;
  finished: boolean;
}

interface IState {
  checked: boolean;
  completedAt: Date | undefined;
}

function TaskItem({
  name,
  label,
  createdAt,
  completedAt,
  finished,
}: ITaskItemParams) {
  const [state, setState] = React.useState<IState>({
    checked: finished,
    completedAt: completedAt,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = !state.checked;
    const completionTime = isChecked ? new Date() : undefined;
    console.log(completionTime);
    setState({
      ...state,
      checked: isChecked,
      completedAt: completionTime,
    });
  };

  const timeLegend = () => {
    const type = state.completedAt
      ? TimeLegendType.Completion
      : TimeLegendType.Creation;
    const now = new Date();
    const date = state.completedAt ? state.completedAt : createdAt;
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
          <Checkbox
            checked={state.checked}
            onChange={handleChange}
            name={name}
          />
        }
      />
      {timeLegend()}
    </div>
  );
}

export default TaskItem;

enum TimeLegendType {
  Creation,
  Completion,
}
