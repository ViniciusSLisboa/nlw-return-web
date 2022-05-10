import { Widget } from "./components/Widget";

export function App() {
  return (
    <div className="bg-black h-screen">
      <Widget />
      <div className="h-full flex justify-center items-center">
        <h1>Utilize o weedget em roxo para enviar feedbacks sobre a aplicação!</h1>
      </div>
    </div>
  );
}
