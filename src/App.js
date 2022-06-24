import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import { isMobile } from "./utils";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [isMobileDevice, setDevice] = useState({
    tablet: false,
    mobile: false,
  });

  const handleSize = useCallback(() => {
    const width = window.innerWidth;
    const result = isMobile(width);
    setDevice(() => {
      return result;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    setDevice(() => {
      return isMobile(window.innerWidth);
    });
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="wrapper">
        <Header isMobileDevice={isMobileDevice} />
        <Main isMobileDevice={isMobileDevice} />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
