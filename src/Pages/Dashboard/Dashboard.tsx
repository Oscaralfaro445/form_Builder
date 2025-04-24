import { Route, Routes } from "react-router-dom";
import { Sidebar, Navbar } from "../../Components";
import { Crud } from "../Crud/Crud";

export const Dashboard = () => {
  return (
    <div className="w-full h-screen fixed">
      <Navbar />
      <div className="flex h-full overflow-y-auto bg-gray-100">
        <Sidebar route="home" />
        <div className="w-full h-screen py-4 px-7">
          <Routes>
            <Route path="/crud/:formKey" element={<Crud />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
