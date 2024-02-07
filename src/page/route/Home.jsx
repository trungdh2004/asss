import { useEffect, useState } from "react";
import { useProfile } from "../../store/zudtand";
import { useNavigate, useSearchParams } from "react-router-dom";
import Question from "../../components/question/Question";
import axiosPath from "../../api/config";

const language = [
  {
    title: "HTML",
    slug: "html",
    href: "/?v=html",
  },
  {
    title: "CSS",
    slug: "css",
    href: "/?v=css",
  },
  {
    title: "JAVASCRIPT",
    slug: "javascript",
    href: "/?v=javascript",
  },
  {
    title: "REACT",
    slug: "react",
    href: "/?v=react",
  },
  {
    title: "NEXTJS",
    slug: "nextjs",
    href: "/?v=nextjs",
  },
  {
    title: "PHP",
    slug: "php",
    href: "/?v=php",
  },
  {
    title: "LAVAREL",
    slug: "lavarel",
    href: "/?v=lavarel",
  },
  {
    title: "KHÁC",
    slug: "khac",
    href: "/?v=khac",
  },
];

const Home = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: user } = useProfile();
  const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    if (searchParams.get("v")) {
      (async () => {
        const { data } = await axiosPath(
          `/questions?language=${searchParams.get("v")}`
        );
        setQuestions(data);
      })();
    } else {
      (async () => {
        const { data } = await axiosPath("/questions");
        setQuestions(data);
      })();
    }
  }, [searchParams]);

  return (
    <div className="px-10">
      <div className="mb-20">
        <h1 className="text-3xl font-black my-4">Bài viết</h1>
        <p className="font-base text-zinc-500">
          Tổng hợp tất cả các bài viết về lập trình{" "}
          {searchParams.get("v") && searchParams.get("v")}
        </p>
      </div>

      <div className="flex">
        <div className="w-[68%]">
          <div className="post w-full pr-16 space-y-2">
            {questions.map((item) => (
              <Question
                key={item.id}
                name={item.title}
                desc={item.desc}
                id={item.id}
                profile={item.profile}
                createdAt={item.createdAt}
                language={item.language}
                userId={item.userId}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 px-4 h-20 ">
          <div className="text-xl font-semibold">Các ngôn ngữ</div>
          <div className="space-y-2 mt-4">
            {language.map((item, index) => (
              <div
                key={index}
                className="w-full px-6 py-2 bg-slate-100/50 hover:bg-slate-100 rounded-full text-center font-semibold cursor-pointer"
                onClick={() => navigate(item.href)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
