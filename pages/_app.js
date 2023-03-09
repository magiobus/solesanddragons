import "@/styles/globals.css";
import AuthContextProvider from "@/components/AuthProvider";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
