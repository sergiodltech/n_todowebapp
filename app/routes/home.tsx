import type { Route } from "./+types/home";
import { ToDo } from "../todo/todo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "UX Focused ToDo App" },
    { name: "A ToDo App with focus in usability", content: "A very simple and easy to use ToDo App!" },
  ];
}

export default function Home() {
  return <ToDo />;
}
