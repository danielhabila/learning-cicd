import React from "react";

function ListOfQuotes(props) {
  return (
    <div className="grid justify-center ">
      {props.listOfQuotes.map((qotd, key) => {
        return (
          <div className="px-[50px] mx-10 mt-10 max-w-md bg-[#181C1F] rounded-t-2xl shadow-2xl h-full border-b border-white pt-9">
            <h2>{qotd.quote} </h2>
            <p className="mt-4 italic">{qotd.author} </p>

            {/* ------------------------------------- */}
            <div className="text-center mt-4">
              <input
                className=" bg-stone-700 bg-opacity-50 rounded-[8px] border-[#e5ded5] border-[1px] h-8 w-full max-w-md placeholder-gray-400 focus:outline-none focus:ring focus:ring-yellow-600 pl-4 placeholder:italic"
                type="text"
                ref={props.inputRef3}
                placeholder="Edit Quote..."
                onChange={(e) => {
                  props.setUpdateQuote(e.target.value);
                }}
              />
              <input
                className=" bg-stone-700 bg-opacity-50 rounded-[8px] border-[#e5ded5] border-[1px] h-8 w-full max-w-md placeholder-gray-400 focus:outline-none focus:ring focus:ring-yellow-600 pl-4 placeholder:italic mt-2"
                type="text"
                placeholder="Edit Author Name..."
                onChange={(e) => {
                  props.setUpdateAuthor(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center mt-2 rounded-[8px]">
              <button
                className="border-1 bg-black w-32 h-8 rounded-l-lg   hover:bg-white hover:text-black"
                onClick={() => props.updateDBitem(qotd._id)}
              >
                Update
              </button>
              <button
                className="border-1 bg-black w-32 h-8 rounded-r-lg  border-l hover:bg-white hover:text-black"
                onClick={() => props.deleteDBitem(qotd._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListOfQuotes;
