import "./styles.css";
import useIdle from "./useIdle";

export default function App() {
  const isIdle = useIdle({ delay: 2000 });
  return (
    <div className="App">
      {isIdle ? <div>Offline</div> : <div>Online</div>}
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
