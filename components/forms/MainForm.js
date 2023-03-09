import { useForm } from "react-hook-form";
import { Input, Select } from "@/components/forms/fields";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import Footer from "@/components/common/Footer";
import { Router, useRouter } from "next/router";
import Image from "next/image";

//esta funcion tambien tiene que ir
let phantom;

const MainForm = () => {
  // Connect Wallet
  const router = useRouter();
  const [publicKey, setPublicKey] = useState(null);

  useEffect(() => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;
      let key = window.localStorage.getItem("publicKey");
      if (key) {
        let firstFour = key?.substring(0, 4);
        let lastFour = key?.substring(key?.length - 4);
        key = firstFour + "..." + lastFour;
        setPublicKey(key);
      }

      if (provider?.isPhantom) {
        console.log(provider);
        phantom = provider;
      }
    }
  }, []);

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }
  };

  const loginWithPhantom = async () => {
    try {
      console.log("login with phantom...");
      const provider = getProvider();
      const message =
        "Para evitar que alguien se haga pasar por ti, necesitamos que firmes este mensaje";
      const encodeMessage = new TextEncoder().encode(message);
      const signedMessage = await provider.request({
        method: "signMessage",
        params: {
          message: encodeMessage,
          display: "UTF-8",
        },
      });
      if (signedMessage.signature) {
        window.localStorage.setItem("signature", signedMessage.signature);
        window.localStorage.setItem("publicKey", signedMessage.publicKey);
        console.log(signedMessage);
        setPublicKey(signedMessage.publicKey.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;
      if (provider?.isPhantom) {
        phantom = provider;
        try {
          const { solana } = window;
          if (solana.isPhantom) {
            console.log("Phantom wallet is installed");
            const response = await phantom.connect();
            console.log("abre el wallet");
            console.log(response.publicKey.toString());
            //setPublicKey(response.publicKey.toString());
            console.log("publicKey =>", publicKey);
            toast.success("Wallet connected");
            loginWithPhantom();
          } else {
            console.log("Phantom wallet is not installed");
            window.open("https://phantom.app/", "_blank");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("Phantom wallet is not installed");
      }
    } else {
      window.open("https://phantom.app/", "_blank");
    }
  };

  const signOutWallet = () => {
    console.log("sign out");
    window.localStorage.removeItem("publicKey");
    window.localStorage.removeItem("signature");
    setPublicKey(null);
    router.reload(window.location.pathname);
  };

  //Aqui se acaba el conect wallet

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    console.log("data =>", data);
  };

  return (
    <div className="wrapper">
      <Toaster position="bottom-right" />
      {/* Aqui Empieza el useState, aqui le decimos a la variable publicKey que si es null que muestre el boton de connect wallet, si no que muestre el formulario y el boton de salir */}
      {publicKey ? (
        <>
          <p className="text-black font-bold">Your Wallet is connected 🙌🏼</p>

          <h2>Let&apos;s make your character, fill the form below 😎</h2>

          <div className="formwrapper mt-2 bg-purple-600 px-4 py-4 rounded-md ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-4 field">
                <Input
                  label="Name of your character"
                  name="name"
                  type="name"
                  placeholder="Magio"
                  className="text-lg w-full mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  register={{
                    ...register("name", {
                      required: {
                        value: true,
                        message: "Please enter your character name",
                      },
                      minLength: {
                        value: 2,
                        message: "Should have at least 2 characters",
                      },
                      maxLength: {
                        value: 12,
                        message: "Should have less than 12 characters",
                      },
                    }),
                  }}
                  errorMessage={errors.name?.message}
                />
              </div>
              <div className="my-4">
                <Select
                  label="Select your Race"
                  name="race"
                  options={[
                    { value: "human", label: "Human" },
                    { value: "elf", label: "Elf" },
                    { value: "dwarf", label: "Dwarf" },
                    { value: "orc", label: "Orc" },
                    { value: "gnome", label: "Gnome" },
                    { value: "troll", label: "Troll" },
                    { value: "goblin", label: "Goblin" },
                    { value: "undead", label: "Undead" },
                    { value: "demon", label: "Demon" },
                  ]}
                  register={{
                    ...register("race", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    }),
                  }}
                  errorMessage={errors.race?.message}
                />
              </div>
              <div className="my-4">
                <Select
                  label="Select your Class"
                  name="class"
                  options={[
                    { value: "warrior", label: "Warrior" },
                    { value: "paladin", label: "Paladin" },
                    { value: "hunter", label: "Hunter" },
                    { value: "rogue", label: "Rogue" },
                    { value: "priest", label: "Priest" },
                    {
                      value: "death-knight",
                      label: "Death Knight",
                    },
                    { value: "shaman", label: "Shaman" },
                    { value: "mage", label: "Mage" },
                    { value: "warlock", label: "Warlock" },
                    { value: "monk", label: "Monk" },
                    { value: "druid", label: "Druid" },
                    {
                      value: "demon-hunter",
                      label: "Demon Hunter",
                    },
                  ]}
                  register={{
                    ...register("class", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    }),
                  }}
                  errorMessage={errors.class?.message}
                />
              </div>
              <div className="my-4">
                <Select
                  label="Select your Gender"
                  name="gender"
                  options={[
                    { value: "female", label: "Female" },
                    { value: "male", label: "Male" },
                  ]}
                  register={{
                    ...register("gender", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    }),
                  }}
                  errorMessage={errors.gender?.message}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-black text-white px-4 py-2 text-lg font-medium  hover:bg-happy-yellow-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  disabled={isLoading}
                >
                  <div className="loadingcontainer flex justify-center items-center w-full  m-0 ">
                    {isLoading ? (
                      <LoadingCircle color="#ffffff" />
                    ) : (
                      "Pay 1 USDC"
                    )}
                  </div>
                </button>
              </div>

              {/* <div
                className="block cursor-pointer px-4 py-2  text-bold  text-white bg-purple-300"
                onClick={() => signOutWallet()}
              >
                {" "}
                <Image
                  className="rounded-full "
                  width={32}
                  height={32}
                  src="/images/phantom.png"
                  alt=""
                />
                <br />
                Salir
              </div> */}
            </form>
          </div>
        </>
      ) : (
        //Este es el else del useState de arriba
        <div
          className="walletbutton bg-purple-600 text-white py-4  font-bold cursor-pointer "
          onClick={() => {
            connectWallet();
          }}
        >
          <button>Connect your wallet 👻</button>
        </div>
      )}
    </div>
  );
};

export default MainForm;
