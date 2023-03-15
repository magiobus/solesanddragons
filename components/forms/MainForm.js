import { useForm } from "react-hook-form";
import { Input, Select } from "@/components/forms/fields";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
const price = process.env.NEXT_PUBLIC_MINTING_PRICE;

const MainForm = () => {
  const { publicKey, signIn, sendTransaction } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [solanaExplorerLink, setSolanaExplorerLink] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);

    setStatusText(
      "Please approve the transaction and wait for it to be confirmed 💵 "
    );

    try {
      const explorerLink = await sendTransaction(price, data);
      setSolanaExplorerLink(explorerLink);
      setStatusText("Generating your character stats 📈... ");
      setIsLoading(true);

      //start generating character
      try {
        const { name, race, gender, _class } = data;
        const { data: chatgptdata } = await axios.post("/api/generatechatgpt", {
          name,
          race,
          gender,
          _class,
          publicKey,
          explorerLink,
        });

        console.log("chatgptdata =>", chatgptdata);

        setStatusText("Generating your character image 🖼️ ... ");

        setIsLoading(true);

        const { data: replicateData } = await axios.post("/api/generatesd", {
          data: chatgptdata,
        });

        const { id: jobId } = replicateData?.data;
        setIsLoading(true);

        //wait 10 seconds for replicate to generate the image
        await new Promise((resolve) => setTimeout(resolve, 10000));
        const { data: status } = await axios.post("/api/checkreplicatestatus", {
          jobId,
        });

        const { output } = status;
        let outputUrl = "";

        if (output && output.length > 0) {
          outputUrl = output[0];
          setIsLoading(false);
        }

        console.log("outputUrl =>", outputUrl);
        setIsLoading(true);
        setStatusText("You character is being minted ... ");
        const mintedData = {
          photo: outputUrl,
          explorerLink,
          stats: chatgptdata.stats,
          publicKey,
        };

        const mintresponse = await axios.post("/api/mintnft", mintedData);
        console.log("mintresponse =>", mintresponse);
        setStatusText(
          "You character iin minted 🎉, check your phantom wallet 👻 "
        );
        setIsLoading(false);
      } catch (error) {
        console.error("error =>", error);
        toast.error("Something went wrong, please try again");
      }
    } catch (error) {
      console.error("error =>", error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div className="wrapper">
      <Toaster positionu="bottom-center" />
      {/* Aqui Empieza el useState, aqui le decimos a la variable publicKey que si es null que muestre el boton de connect wallet, si no que muestre el formulario y el boton de salir */}
      {publicKey ? (
        isLoading ? (
          <div className="loadingwrapper my-8">
            <p className="font-bold text-lg mb-1">{statusText}</p>
            <p className="text-red-600 mb-4 text-sm italic">
              Please do not close this window or refresh the page
            </p>
            <LoadingCircle color="#000000" />
          </div>
        ) : solanaExplorerLink ? (
          <div className="loadingwrapper my-8 flex flex-col justify-center items-center">
            <CheckCircleIcon className="h-20 w-20 text-green-500 mb-4" />
            <p className="font-bold text-lg mb-2 break-normal break-all">
              {statusText}
            </p>
            <a
              href={solanaExplorerLink}
              target="_blank"
              rel="noreferrer"
              className="underline text-blue-600"
            >
              View transaction in Solana Explorer
            </a>
          </div>
        ) : (
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
                      Pay {price} SOL
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </>
        )
      ) : (
        //Este es el else del useState de arriba
        <div
          className="walletbutton bg-purple-600 text-white py-4  font-bold cursor-pointer "
          disabled={isLoading}
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

//private functions....

export default MainForm;
