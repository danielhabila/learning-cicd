import React from "react";

function AddToList(props) {
  return (
    <div className="flex-col mx-10 pt-20 space-y-4">
      <div>
        <input
          className=" block m-auto w-full max-w-md bg-stone-700 bg-opacity-50 rounded-[8px] border-[#e5ded5] border-[1px] h-8 placeholder-gray-400 focus:outline-none focus:ring focus:ring-yellow-600 pl-4 placeholder:italic"
          placeholder="Add Quote..."
          type="text"
          ref={props.inputRef}
          onChange={(e) => {
            props.setAddQuote(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          className=" block m-auto w-full max-w-md bg-stone-700 bg-opacity-50 rounded-[8px] border-[#e5ded5] border-[1px] h-8 placeholder-gray-400 focus:outline-none focus:ring focus:ring-yellow-600 pl-4 placeholder:italic "
          placeholder="Add Author..."
          type="text"
          ref={props.inputRef2}
          onChange={(e) => {
            props.setAddAuthor(e.target.value);
          }}
        />
      </div>

      <button
        className=" flex mx-auto justify-center items-center border-1 bg-black w-32 h-8 rounded-lg   hover:bg-white hover:text-black"
        onClick={props.handleSubmit}
      >
        Add To List
      </button>
    </div>
  );
}

export default AddToList;
