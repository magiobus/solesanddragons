import { useForm } from "react-hook-form";
import { Input, Select } from "@/components/forms/fields";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";
import axios from "axios";

const MainForm = () => {
  const { publicKey, signIn, sendTransaction } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const price = 1;
    const response = await sendTransaction(price, data);

    // try {
    //   const { name, race, gender, _class } = data;
    //   const { data: characterData } = await axios.post(
    //     "/api/aftertransaction",
    //     {
    //       name,
    //       race,
    //       gender,
    //       _class,
    //     }
    //   );
    //   console.info("characterData =>", characterData);
    //   toast.success("Your character was created successfully");
    //   setSubmitted(true);
    // } catch (error) {
    //   console.error("error =>", error);
    //   toast.error("Something went wrong, please try again");
    // }
    setIsLoading(false);
  };

  return (
    <div className="wrapper">
      <Toaster positionu="bottom-center" />
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
                    {
                      value: "dwarf",
                      label: "Dwarf",
                    },
                    {
                      value: "elf",
                      label: "Elf",
                    },
                    {
                      value: "halfling",
                      label: "Halfling",
                    },
                    {
                      value: "human",
                      label: "Human",
                    },
                    {
                      value: "dragonborn",
                      label: "Dragonborn",
                    },
                    {
                      value: "gnome",
                      label: "Gnome",
                    },
                    {
                      value: "half-elf",
                      label: "Half-Elf",
                    },
                    {
                      value: "half-orc",
                      label: "Half-Orc",
                    },
                    {
                      value: "tiefling",
                      label: "Tiefling",
                    },
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
                  name="_class"
                  options={[
                    {
                      value: "barbarian",
                      label: "Barbarian",
                    },
                    {
                      value: "bard",
                      label: "Bard",
                    },
                    {
                      value: "cleric",
                      label: "Cleric",
                    },
                    {
                      value: "druid",
                      label: "Druid",
                    },
                    {
                      value: "fighter",
                      label: "Fighter",
                    },
                    {
                      value: "monk",
                      label: "Monk",
                    },
                    {
                      value: "paladin",
                      label: "Paladin",
                    },
                    {
                      value: "ranger",
                      label: "Ranger",
                    },
                    {
                      value: "rogue",
                      label: "Rogue",
                    },
                    {
                      value: "sorcerer",
                      label: "Sorcerer",
                    },
                    {
                      value: "warlock",
                      label: "Warlock",
                    },
                    {
                      value: "wizard",
                      label: "Wizard",
                    },
                  ]}
                  register={{
                    ...register("_class", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    }),
                  }}
                  errorMessage={errors._class?.message}
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
            </form>
          </div>
        </>
      ) : (
        //Este es el else del useState de arriba
        <div
          className="walletbutton bg-purple-600 text-white py-4  font-bold cursor-pointer "
          onClick={() => {
            signIn();
          }}
        >
          <button>Connect your wallet 👻</button>
        </div>
      )}
    </div>
  );
};

export default MainForm;
