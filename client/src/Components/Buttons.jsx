import React from "react";
import { useNavigate } from "react-router-dom";

import {
  PencilSquareIcon,
  ArrowUpTrayIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

function Buttons(props) {
  let navigate = useNavigate();

  return (
    <div className="flex justify-center mx-auto space-x-20 mt-[60px] bg-black p-4 rounded-xl w-80  ">
      <PencilSquareIcon
        type="button"
        onClick={() => {
          navigate("/edit");
        }}
        className="w-9 hover:bg-white hover:text-black rounded-xl "
      />
      <ArrowPathIcon
        onClick={props.aRandomQuote}
        className="w-9 hover:bg-white hover:text-black rounded-xl"
      />
      <ArrowUpTrayIcon className="w-9 hover:bg-white hover:text-black rounded-xl " />
    </div>
  );
}

export default Buttons;
