import React, { useState } from "react";
import MessageIcon from "../Assets/SVG/Message";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ColorRing } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import Loader from "./loader";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const addUserEmail = async (email) => {
    const response = await axios.get(
      "https://involved-birgit-zinter-cb767b47.koyeb.app/api/Mailing/Add",
      {
        params: { email }, // Use params for query parameters
      }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: addUserEmail,
    onSuccess: (data) => {
      setEmail("");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      mutation.mutate(email);
    }
  };

  return (
    <div className="w-[90vw] my-20 bg-gradient-to-br rounded-[20px] flex justify-center items-center newsLetterContainer p-8 pb-10 from-[#1A7BC6] to-[#054D96] max-w-[1500px] mx-auto h-fit">
      <div className="w-[90%]">
        <div className="bg-[#136AB5] flex justify-center w-fit mx-auto newsLetterStyle items-center rounded-[100px] p-3 ">
          <p className="text-white font-sans text-[14px]">
            {t("newsletter.header")}
          </p>
        </div>
        <h2 className="font-unbounded text-white text-center newsLetterText font-bold w-[70%] mx-auto my-2 text-[36px] ">
          {t("newsletter.title")}
        </h2>
        <p className=" text-[#E5E5E5] text-center mb-2 newsLetterDesc font-light font-sans text-[18px] ">
          {t("newsletter.description")}
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-[40%] newsLetterInputContainer mx-auto h-[50px] bg-white rounded-[70px] flex "
        >
          <input
            className="w-[90%] h-full p-4 rounded-tl-[70px] rounded-bl-[70px] rounded-[70px] outline-none font-sans"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" // Add email validation
            required
          />
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-[#136AB5] cursor-pointer w-[10%] newsLetterSendBtn flex items-center justify-center rounded-tr-[70px] rounded-br-[70px] disabled:opacity-50"
          >
            {mutation.isPending ? (
              <ColorRing
                visible={true}
                height="70"
                width="70"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["white", "white", "white", "white", "white"]}
              />
            ) : (
              <MessageIcon />
            )}
          </button>
        </form>
        {mutation.isError && (
          <p className="text-red-300 text-[13px] text-center mt-2">
            Failed to subscribe. Please try again.
          </p>
        )}
        {mutation.isSuccess && (
          <p className="text-white text-[13px] text-center mt-2">
            Successfully subscribed!
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;
