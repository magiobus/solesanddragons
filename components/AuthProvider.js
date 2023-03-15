import React, { createContext, useState, useEffect } from "react";
import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import { useRouter } from "next/router";
export const AuthContext = createContext();
import toast from "react-hot-toast";
const magiosPublicKey = "E8fEhxvSxRfoVCAWbtab1nsimWcaWcoaAsRp4bp8X2up";
const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK;

const AuthContextProvider = (props) => {
  const router = useRouter();
  const [publicKey, setPublicKey] = useState(null);
  const [truncatePublicKey, setTruncatePublicKey] = useState(null);

  //check in local storage if we already have a phantom wallet connected
  useEffect(() => {
    let key = window.localStorage.getItem("publicKey");
    let _signature = window.localStorage.getItem("signature");
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

    await signSignature();

    toast.success("Wallet connected ");
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

  const signSignature = async () => {
    try {
      //provider
      const provider = window?.phantom?.solana;

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

      window.localStorage.setItem("publicKey", signedMessage.publicKey);
      window.localStorage.setItem("signature", signedMessage.signature);
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

  const sendTransaction = async (price, data) => {
    try {
      //provider
      const provider = window?.phantom?.solana;

      //connection
      const connection = new Connection(
        clusterApiUrl(SOLANA_NETWORK),
        "confirmed"
      );

      //keys
      const fromPubkey = new PublicKey(publicKey);
      const toPubkey = new PublicKey(magiosPublicKey);

      //getbalance
      const balance = await connection.getBalance(new PublicKey(publicKey));

      //check if it has enough balance
      if (balance < LAMPORTS_PER_SOL * price) {
        toast.error("You don't have enough balance");
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: LAMPORTS_PER_SOL * price, // 1 SOL
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      //sign transaction
      const transactionsignature = await provider.signTransaction(transaction);

      //send transaction
      const txid = await connection.sendRawTransaction(
        transactionsignature.serialize()
      );
      console.info(`Transaction ${txid} sent`);

      //wait for confirmation
      const confirmation = await connection.confirmTransaction(txid, {
        commitment: "singleGossip",
      });

      const { slot } = confirmation.value;

      console.info(`Transaction ${txid} confirmed in block ${slot}`);

      const solanaExplorerLink = `https://explorer.solana.com/tx/${txid}?cluster=devnet`;
      return solanaExplorerLink;
    } catch (error) {
      console.error("ERROR SEND TRANSACTION", error);
      toast.error("Something went wrong sending the transaction");
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
      value={{
        publicKey,
        truncatePublicKey,
        signIn,
        signOut,
        sendTransaction,
        signSignature,
        LAMPORTS_PER_SOL,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
