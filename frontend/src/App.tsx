import './App.css'
import { useEffect } from "react";
import { ConfigProvider, Spin } from "antd";
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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1A3BF5",
          borderRadius: 12,
          fontFamily: "'Inter', system-ui, sans-serif",
        },
      }}
    >
      {appLoading ? (
        <Spin size="large" className="fixed inset-0 z-9999 flex items-center justify-center bg-white/70" />
      ) : (
        <Router />
      )}
    </ConfigProvider>
  );
}

export default App
