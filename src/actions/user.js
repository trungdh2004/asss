import { toast } from "react-toastify";
import axiosPath from "../api/config";
import bcrypt from "bcryptjs";

export const getCurrent = async (id) => {
  try {
    if (!id) {
      toast.error("Please valid id");
    }

    const user = await axiosPath.get(`/user/${id}`);

    if (!user) {
      toast.error("User not found");
    }

    return user;
  } catch (error) {
    toast.error("Server error");
  }
};

export const handleRegister = async (email, password, username) => {
  try {
    if (!email || !password || !username) {
      throw new Error("Vui lòng nhập đầy đủ giá trị");
    }

    const existerUser = await axiosPath.get(`/profile?email=${email}`);

    if (existerUser.data.length > 0) {
      throw new Error(`Email '${email}' đã có người đăng kí`);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await axiosPath.post(`/profile`, {
      email,
      password: hashPassword,
      username,
      avatar: "https://static.thenounproject.com/png/4035892-200.png",
    });

    if (!newUser) {
      throw new Error("Đăng kí đã lỗi vui lòng load lại web");
    }

    return newUser.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleLogin = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Vui lòng điển đầy đủ email và mật khẩu");
    }

    const existerUser = await axiosPath.get(`/profile?email=${email}`);

    if (existerUser.data.length === 0) {
      throw new Error(`Email '${email}' chưa đăng kí`);
    }

    const isPass = await bcrypt.compare(password, existerUser.data[0].password);

    if (!isPass) {
      throw new Error("Tài khoản đăng nhập không đúng");
    }

    return existerUser.data;
  } catch (error) {
    throw new Error(error);
  }
};
