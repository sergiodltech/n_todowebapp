import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { AnimatePresence, motion } from "framer-motion";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(ThemeProvider, {
    theme: darkTheme,
    children: [/* @__PURE__ */ jsx(CssBaseline, {}), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const toDoLogo = "/n_todowebapp/assets/logo2-DQuAk9q0.png";
function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message
}) {
  const _onClose = (_e, _r) => onClose();
  const _onCancel = (_e) => onClose();
  const _onConfirm = (_e) => onConfirm();
  return /* @__PURE__ */ jsxs(
    Dialog,
    {
      open,
      onClose: _onClose,
      "aria-labelledby": "dialog-title",
      "aria-describedby": "dialog-description",
      children: [
        /* @__PURE__ */ jsx(DialogTitle, { id: "dialog-title", children: title }),
        /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsx(DialogContentText, { id: "dialog-description", children: message }) }),
        /* @__PURE__ */ jsxs(DialogActions, { children: [
          /* @__PURE__ */ jsx(Button, { onClick: _onCancel, children: "キャンセル" }),
          /* @__PURE__ */ jsx(Button, { onClick: _onConfirm, autoFocus: true, children: "確認" })
        ] })
      ]
    }
  );
}
function TaskItem({
  name,
  label,
  createdAt,
  completedAt,
  finished,
  updateTaskList,
  deleteTasks
}) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const taskKey = name.split("-")[1];
  const handleChange = (event) => {
    const isChecked = event.currentTarget.checked;
    const completionTime = isChecked ? /* @__PURE__ */ new Date() : null;
    const newTask = {
      text: label,
      createdAt,
      completedAt: completionTime,
      finished: isChecked
    };
    updateTaskList(taskKey, newTask);
  };
  const deleteText = /* @__PURE__ */ jsx(
    "span",
    {
      className: "absolute bottom-1 right-2 text-xs text-red-500",
      onClick: () => setDialogOpen(true),
      children: "削除"
    }
  );
  const timeLegend = () => {
    const type = completedAt !== null ? 1 : 0;
    const now = /* @__PURE__ */ new Date();
    const date = completedAt ? completedAt : createdAt;
    const diff = now.valueOf() - date.valueOf();
    const diffInHours = diff / 1e3 / 60 / 60;
    let sinceString = type == 1 ? "に完了 " : "";
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
    return /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-2 text-xs text-gray-500", children: sinceString });
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col px-4 pt-3 pb-2 my-1 border rounded-lg", children: [
    /* @__PURE__ */ jsx(
      FormControlLabel,
      {
        className: "text-lg",
        "aria-label": `task-element-${label.slice(0, 10)}`,
        label: /* @__PURE__ */ jsx("span", { className: "text-pretty md:text-balance break-words", children: label }),
        control: /* @__PURE__ */ jsx(Checkbox, { checked: finished, onChange: handleChange, name })
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmationDialog,
      {
        open: isDialogOpen,
        onClose: () => setDialogOpen(false),
        onConfirm: () => {
          deleteTasks([taskKey]);
          setDialogOpen(false);
        },
        title: "タスクを削除",
        message: `「${label}」のタスクを削除してもよろしいですか？`
      }
    ),
    timeLegend(),
    deleteText
  ] });
}
const LOCAL_STORAGE_KEY = "tasks";
function getTasksFromLocalStorage() {
  var tasks = {};
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const rawTasksList = item ? JSON.parse(item) : {};
    Object.keys(rawTasksList).map((taskKey) => {
      const rawTask = rawTasksList[taskKey];
      tasks[taskKey] = {
        text: rawTask.text,
        createdAt: new Date(rawTask.createdAt),
        completedAt: rawTask.completedAt ? new Date(rawTask.completedAt) : null,
        finished: rawTask.finished
      };
    });
  } catch (error) {
    console.log("Failed to get tasks from localStorage: " + error);
  }
  return tasks;
}
function saveTasksToLocalStorage(newTasks) {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    return true;
  } catch (error) {
    console.log("Failed to save tasks to localStorage: " + error);
    return false;
  }
}
function ToDo() {
  const [state, setState] = React.useState({
    tasks: {},
    newTaskInput: "",
    isClearUDialogOpen: false,
    isClearFDialogOpen: false
  });
  React.useEffect(() => {
    var tasks = getTasksFromLocalStorage();
    console.log("Loading to state: ");
    console.log(tasks);
    setState({
      tasks,
      newTaskInput: "",
      isClearUDialogOpen: false,
      isClearFDialogOpen: false
    });
  }, []);
  const updateTaskList = (taskKey, newTask) => {
    const newTasks = { ...state.tasks, [taskKey]: newTask };
    saveTasksToLocalStorage(newTasks);
    setState({
      ...state,
      tasks: newTasks
    });
  };
  const handleInputChange = (event) => setState({
    ...state,
    newTaskInput: event.target.value
  });
  const addNewTask = () => {
    const newTaskText = state.newTaskInput.trim();
    if (newTaskText.length === 0) {
      setState({ ...state, newTaskInput: "" });
      return;
    }
    const now = /* @__PURE__ */ new Date();
    const taskKey = now.getTime().toString();
    const newTask = {
      text: state.newTaskInput,
      createdAt: now,
      completedAt: null,
      finished: false
    };
    const newTasks = { ...state.tasks, [taskKey]: newTask };
    saveTasksToLocalStorage(newTasks);
    setState({
      ...state,
      newTaskInput: "",
      tasks: newTasks
    });
  };
  const deleteTasks = (tasksKeys) => {
    const newTasks = {};
    Object.keys(state.tasks).map((taskKey) => {
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
      isClearFDialogOpen: false
    });
  };
  const unfinishedTasksKeys = new Array();
  const unfinishedTasks = Object.keys(state.tasks).map((taskKey) => {
    const task = state.tasks[taskKey];
    if (task.finished) {
      return;
    }
    unfinishedTasksKeys.push(taskKey);
    return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(motion.div, { layout: true, transition: { duration: 0.8 }, children: /* @__PURE__ */ jsx(
      TaskItem,
      {
        name: `ti-${taskKey}`,
        label: task.text,
        createdAt: task.createdAt,
        completedAt: task.completedAt,
        finished: task.finished,
        updateTaskList,
        deleteTasks
      }
    ) }, taskKey) });
  }).filter((x) => !!x);
  const finishedTasksKeys = new Array();
  const finishedTasks = Object.keys(state.tasks).map((taskKey) => {
    const task = state.tasks[taskKey];
    if (!task.finished) {
      return;
    }
    finishedTasksKeys.push(taskKey);
    return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(motion.div, { layout: true, transition: { duration: 0.8 }, children: /* @__PURE__ */ jsx(
      TaskItem,
      {
        name: `ti-${taskKey}`,
        label: task.text,
        createdAt: task.createdAt,
        completedAt: task.completedAt,
        finished: task.finished,
        updateTaskList,
        deleteTasks
      }
    ) }, taskKey) });
  }).filter((x) => !!x);
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center pt-16 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-16 min-h-0", children: [
    /* @__PURE__ */ jsx("header", { className: "flex flex-col items-center gap-9", children: /* @__PURE__ */ jsx("div", { className: "w-[500px] max-w-[100vw] p-4", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: toDoLogo,
        alt: "Todo Logo",
        className: "block w-3/5 mx-auto"
      }
    ) }) }),
    /* @__PURE__ */ jsxs(Box, { sx: { display: "flex-col", width: 1 / 2 }, children: [
      /* @__PURE__ */ jsx("div", { className: "flex-row", children: /* @__PURE__ */ jsx("p", { className: "leading-6 text-gray-700 dark:text-gray-200 text-center font-extrabold", children: "とても便利なあなたのToDoリスト" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-row text-center", children: /* @__PURE__ */ jsx(FormControl, { sx: { m: 5 }, component: "fieldset", variant: "standard", children: /* @__PURE__ */ jsx(FormGroup, { id: "new-task-form", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            id: "new-task-input",
            name: "new-task-input",
            value: state.newTaskInput,
            onChange: handleInputChange,
            placeholder: "新しいタスクを追加",
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                addNewTask();
              }
            }
          }
        ),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            onClick: addNewTask,
            id: "new-task-button",
            name: "new-task-button",
            children: /* @__PURE__ */ jsx(AddCircleOutlineIcon, { color: "primary" })
          }
        )
      ] }) }, "new-task-form") }) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex-row",
          style: unfinishedTasksKeys.length > 0 ? {} : { display: "none" },
          children: [
            /* @__PURE__ */ jsxs(
              FormControl,
              {
                fullWidth: true,
                sx: { m: 3 },
                component: "fieldset",
                variant: "standard",
                children: [
                  /* @__PURE__ */ jsx(FormLabel, { sx: { color: "whitesmoke" }, children: "未完了のタスク" }),
                  /* @__PURE__ */ jsxs(FormGroup, { id: "unfinished-tasks", children: [
                    unfinishedTasks,
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        onClick: () => setState({ ...state, isClearUDialogOpen: true }),
                        children: "削除"
                      }
                    )
                  ] }, "unfinished-tasks")
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              ConfirmationDialog,
              {
                open: state.isClearUDialogOpen,
                onClose: () => setState({ ...state, isClearUDialogOpen: false }),
                onConfirm: () => deleteTasks(unfinishedTasksKeys),
                title: "未完了のタスクを削除",
                message: `すべての${unfinishedTasksKeys.length}未完了したタスクを削除してもよろしいですか？`
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex-row",
          style: finishedTasksKeys.length > 0 ? {} : { display: "none" },
          children: [
            /* @__PURE__ */ jsxs(
              FormControl,
              {
                fullWidth: true,
                sx: { m: 3 },
                component: "fieldset",
                variant: "standard",
                children: [
                  /* @__PURE__ */ jsx(FormLabel, { sx: { color: "whitesmoke" }, children: "完了のタスク" }),
                  /* @__PURE__ */ jsxs(FormGroup, { id: "finished-tasks", children: [
                    finishedTasks,
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        onClick: () => setState({ ...state, isClearFDialogOpen: true }),
                        children: "削除"
                      }
                    )
                  ] }, "finished-tasks")
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              ConfirmationDialog,
              {
                open: state.isClearFDialogOpen,
                onClose: () => setState({ ...state, isClearFDialogOpen: false }),
                onConfirm: () => deleteTasks(finishedTasksKeys),
                title: "完了のタスクを削除",
                message: `すべての${finishedTasksKeys.length}完了したタスクを削除してもよろしいですか？`
              }
            )
          ]
        }
      )
    ] })
  ] }) });
}
function meta({}) {
  return [{
    title: "UX Focused ToDo App"
  }, {
    name: "A ToDo App with focus in usability",
    content: "A very simple and easy to use ToDo App!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(ToDo, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/n_todowebapp/assets/entry.client-B-I7geA4.js", "imports": ["/n_todowebapp/assets/chunk-UH6JLGW7-sptz5SMi.js", "/n_todowebapp/assets/index-C9PU39qC.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/n_todowebapp/assets/root-FqmztzbU.js", "imports": ["/n_todowebapp/assets/chunk-UH6JLGW7-sptz5SMi.js", "/n_todowebapp/assets/index-C9PU39qC.js", "/n_todowebapp/assets/DefaultPropsProvider-BbNZ4y5c.js"], "css": ["/n_todowebapp/assets/root-D0xSLN7R.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/n_todowebapp/assets/home-rnNHFNLY.js", "imports": ["/n_todowebapp/assets/chunk-UH6JLGW7-sptz5SMi.js", "/n_todowebapp/assets/DefaultPropsProvider-BbNZ4y5c.js", "/n_todowebapp/assets/index-C9PU39qC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/n_todowebapp/assets/manifest-deff1a46.js", "version": "deff1a46", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/n_todowebapp/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
