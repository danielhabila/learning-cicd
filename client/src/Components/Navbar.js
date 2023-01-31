import React from "react";
import { BiCog } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl flex justify-between pt-4 mx-auto">
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="text-3xl font-bold font-mono text-[#DAA520] ml-10 md:text-4xl "
      >
        q/diary
      </h1>

      <BiCog size={35} className="mr-10 " />
    </div>
  );
}

export default Navbar;
