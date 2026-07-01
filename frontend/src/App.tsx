import './App.css'
import { useEffect } from "react";
import { Spin } from "antd";
import { Router } from "./router";
import { useAppStore } from "./store";

const App = () => {
  const init = useAppStore((state) => state.init);
  const appLoading = useAppStore((state) => state.appLoading);
  const setAppLoading = useAppStore((state) => state.setAppLoading);

  useEffect(() => {
    setAppLoading(true);
    init().finally(() => setAppLoading(false));
  }, [init, setAppLoading]);

  if (appLoading) {
    return (
      <Spin size="large" className="fixed inset-0 z-9999 flex items-center justify-center bg-white/70" />
    );
  }

  return <Router />;
}

export default App
