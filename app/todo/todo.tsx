import toDoLogo from "../resources/logo.png";

export function ToDo() {
  var taskKey = 0;
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={toDoLogo}
              alt="Todo Logo"
              className="block w-full"
            />
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              Oke vamoa a ver
            </p>
            <ul>
              {tasks.map(({ text, datetime, expires, finished }) => (
                <li key={taskKey++}>
                  <a
                    className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {icon}
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

const tasks = [
  {
    text: "Eat",
    datetime: new Date("2025-08-20 12:20:00"),
    expires: new Date("2025-08-20 13:20:00"),
    finished: true,
  },
  {
    text: "Program",
    datetime: new Date("2025-08-20 13:30:00"),
    expires: new Date("2025-08-20 15:00:00"),
    finished: true,
  },
  {
    text: "Meeting with Y先生",
    datetime: new Date("2025-08-20 15:10:00"),
    expires: new Date("2025-08-20 15:50:00"),
    finished: false,
  },
  {
    text: "Practice guitar",
    datetime: new Date("2025-08-20 19:00:00"),
    expires: new Date("2025-08-20 20:00:00"),
    finished: false,
  },
];
