import { useForm } from "react-hook-form";
import { Input, Select } from "@/components/forms/fields";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import Footer from "@/components/common/Footer";

const MainForm = () => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4 field">
        <Input
          label="Name of your character"
          name="name"
          type="name"
          placeholder="Magio"
          className="text-lg w-full mt-1 block  border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
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
            { value: "death-knight", label: "Death Knight" },
            { value: "shaman", label: "Shaman" },
            { value: "mage", label: "Mage" },
            { value: "warlock", label: "Warlock" },
            { value: "monk", label: "Monk" },
            { value: "druid", label: "Druid" },
            { value: "demon-hunter", label: "Demon Hunter" },
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
            {isLoading ? <LoadingCircle color="#ffffff" /> : "Pay 1 USDC"}
          </div>
        </button>
      </div>
    </form>
  );
};

export default MainForm;
