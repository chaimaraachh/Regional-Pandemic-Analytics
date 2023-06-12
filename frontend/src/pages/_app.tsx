import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr";
import axios from "axios";
import { AppProps } from "next/app";
import "@/common/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "@/common/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          axios.get(resource, init).then((res) => res.data),
      }}
    >
      <Provider store={store}>
        <ConfigProvider
          theme={{
            components: {},
            token: {
              colorPrimary: "#31713b",
              fontSize: 14,
            },
          }}
        >
          <Component {...pageProps} />
          <ToastContainer />
        </ConfigProvider>
      </Provider>
    </SWRConfig>
  );
}