import Navbar from "../../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Questions from "./QuestionPage";
import Sidebar from "../../components/sidebar/Sidebar";
import CreateQuestion from "./CreateQuestion";
import MyQuestions from "./MyQuestions";
import EditQuestions from "./EditQuestions";

const Layout = () => {
  return (
    <div className=" overflow-x-hidden min-h-screen w-full">
      <div className=" fixed top-0 w-full bg-white z-10">
        <Navbar />
      </div>
      <div className=" mt-[56px] w-full">
        <div className="w-[72px] h-[calc(100vh-56px)]  fixed left-0 top-[56px]">
          <Sidebar />
        </div>
        <div className="w-[calc(100%-72px)] min-h-[500px] ml-[72px] pl-5 pr-10 py-4">
          <Routes>
            <Route index element={<Home />} />
            <Route path="question/:id" element={<Questions />} />
            <Route path="question/:id/edit" element={<EditQuestions />} />
            <Route path="create" element={<CreateQuestion />} />
            <Route path="myquestions" element={<MyQuestions />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
