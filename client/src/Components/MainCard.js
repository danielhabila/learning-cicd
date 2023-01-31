import React from "react";

const MainCard = (props) => {
  return (
    <div>
      {props.randomQuote.map((one, key) => {
        return (
          <div key={key}>
            <div className=" flex-col mx-10 pt-40">
              <div className="max-w-xl mx-auto shadow-2xl bg-black bg-opacity-70 py-[40px] px-[50px] rounded-xl">
                <p className="text-xl font-normal tracking-wide text-left pb-10 ">
                  {one.quote}
                </p>

                <div className=" border-t-2 border-t-whitesmoke "></div>
                <p className="mt-8">{one.author}</p>
              </div>
              {/* <button
                className="block mx-auto bg-[#daa520] rounded-xl w-20 mt-4 hover:bg-slate-700"
                onClick={props.aRandomQuote}
              >
                Refresh
              </button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainCard;
