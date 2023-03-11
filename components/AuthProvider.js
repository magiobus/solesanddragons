import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
export const AuthContext = createContext();
import toast from "react-hot-toast";

const AuthContextProvider = (props) => {
  const router = useRouter();
  const [publicKey, setPublicKey] = useState(null);
  const [truncatePublicKey, setTruncatePublicKey] = useState(null);

  //check in local storage if we already have a phantom wallet connected
  useEffect(() => {
    let key = window.localStorage.getItem("publicKey");
    if (!key) return;

    setPublicKey(key);
    setTruncatePublicKey(truncateWalletAddress(key));
  }, []);

  const signIn = async () => {
    const provider = window?.phantom?.solana;
    const { solana } = window;

    //If phantom wallet is not installed
    if (!provider?.isPhantom || !solana.isPhantom) {
      toast.error("Please install Phantom Wallet...");
      setTimeout(() => {
        window.open("https://phantom.app/", "_blank");
      }, 2000);
      return;
    }

    //if phantom wallet is installed
    //Asssigning the phantom provider
    let phantom;
    if (provider?.isPhantom) phantom = provider;

    const { publicKey } = await phantom.connect();
    setPublicKey(publicKey.toString());
    setTruncatePublicKey(truncateWalletAddress(publicKey.toString()));
    toast.success("Wallet connected ");

    //signature process
    await signSignature(provider);
  };

  const signOut = () => {
    if (window) {
      window.localStorage.removeItem("publicKey");
      window.localStorage.removeItem("signature");
      setPublicKey(null);
      setTruncatePublicKey(null);
      router.reload(window?.location?.pathname);
    }
  };

  const signSignature = async (provider) => {
    try {
      const msg =
        "To Avoid someone impersonating you, we need you to sign this message";
      const encodeMessage = new TextEncoder().encode(msg);
      const signedMessage = await provider.request({
        method: "signMessage",
        params: {
          message: encodeMessage,
          display: "UTF-8",
        },
      });

      window.localStorage.setItem("signature", signedMessage.signature);
      window.localStorage.setItem("publicKey", signedMessage.publicKey);
      setPublicKey(signedMessage.publicKey.toString());
      setTruncatePublicKey(
        truncateWalletAddress(signedMessage.publicKey.toString())
      );
      toast.success("Wallet Signed 🙌🏼 ");
    } catch (error) {
      console.error("ERRROR SIGNATURE", error);
      toast.error("Something went wrong signing the message");
    }
  };

  //truncate function for public key
  const truncateWalletAddress = (address) => {
    let firstFour = address?.substring(0, 4);
    let lastFour = address?.substring(address?.length - 4);
    return firstFour + "..." + lastFour;
  };

  return (
    <AuthContext.Provider
      value={{ publicKey, truncatePublicKey, signIn, signOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
