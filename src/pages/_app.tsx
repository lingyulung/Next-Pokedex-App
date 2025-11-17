import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <div className="px-20 mx-auto max-w-360">
    <Component {...pageProps} />
  </div>
);
}
