import { useEffect, useState } from "react";
import axiosPath from "../../api/config";
import { useProfile } from "../../store/zudtand";
import Question from "../../components/question/Question";
import { toast } from "react-toastify";

const MyQuestions = () => {
  const [questions, setQuetions] = useState([]);
  const { data: user } = useProfile();

  useEffect(() => {
    (async () => {
      const { data } = await axiosPath(`/questions?userId=${user?.id}`);
      setQuetions(data);
    })();
  }, [user]);

  const onDeleteQuestion =async (id) => {
    try {
      const isDelete = window.confirm("Bạn có chắc muốn xóa không ?");
      if (isDelete) {
        await axiosPath.delete(`/questions/${id}`);
        setQuetions(questions.filter(q => q.id !== id));
        toast.success("Xóa thành công")
      }
    } catch (error) {
        toast.error("Xóa thất bại")
    }
  };

  return (
    <div className="w-full">
      <div className="w-[68%] mx-auto">
        <div className="mb-20">
          <h1 className="text-3xl font-black my-4">Bài viết của bạn</h1>
        </div>

        <div className="w-full">
          <div className=" w-full pr-16 space-y-2">
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
                isUser={true}
                onDelete={onDeleteQuestion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuestions;
