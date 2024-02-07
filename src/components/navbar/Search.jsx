import { useEffect, useState } from "react";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useDebounce } from "../../hook/useDebounce";
import axiosPath from "../../api/config";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const router = useNavigate();
  const [value, setValue] = useState();
  const debouncedValue = useDebounce(value, 1000);
  const [listQuestions, setLisQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.value === "") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axiosPath.get("/questions");
      setLisQuestions(data);
    })();
  }, []);

  useEffect(() => {
    if (debouncedValue === "") {
      setQuestions([]);
      return;
    }
    const data = listQuestions?.filter((item) => {
      const str = item.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return str.includes(debouncedValue);
    });
    console.log(data);
    setQuestions(data);
  }, [debouncedValue]);

  const onRouter = (id) => {
    router(`/question/${id}`);
    setValue("");
  };

  return (
    <div className="w-[420px] relative h-10 rounded-[40px] border border-blue-500 flex items-center ">
      <div className="w-10 h-full flex items-center justify-center">
        <SearchRoundedIcon className="text-xl text-blue-500" />
      </div>
      <form
        className="flex-1 h-full px-2 flex items-center"
        onSubmit={onSubmit}
      >
        <input
          className="w-full border-none outline-none placeholder:text-blue-300 text-blue-500"
          placeholder="Tim kiem ..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck="false"
        />
      </form>

      {questions?.length > 0 && (
        <div className="absolute w-full top-[50px] shadow  p-2 rounded-md  right-0">
          {questions.map((item, index) => (
            <div
              key={index}
              className="p-2 w-full font-semibold text-base hover:bg-zinc-100 cursor-pointer rounded-md"
              onClick={() => {
                onRouter(item.id);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
