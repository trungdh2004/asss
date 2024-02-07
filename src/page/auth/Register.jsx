import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleRegister } from "../../actions/user";
import { useProfile } from "../../store/zudtand";

const Register = () => {
  const { onLogin } = useProfile();
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async ({ email, username, password }) => {
    try {
      const user = await handleRegister(email, password, username);
      toast.success("Đăng kí thành công");
      localStorage.setItem("auth", JSON.stringify(user));
      await onLogin(user[0]);
      router("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <form
        className="w-[400px] p-4 shadow shadow-slate-300  rounded-md drop-shadow"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="text-center pb-4 text-xl font-bold mb-4 text-blue-500">
          Đăng kí
        </div>
        <div className="space-y-4">
          <div>
            <TextField
              type="text"
              label="Họ và tên"
              sx={{
                width: "100%",
              }}
              error={errors.email}
              helperText={errors.email?.message}
              {...register("username", {
                required: "Vui lòng điền giá trị",
                minLength: 1,
              })}
            />
          </div>
          <div>
            <TextField
              type="email"
              label="Email"
              sx={{
                width: "100%",
              }}
              error={errors.email}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Vui lòng điền giá trị",
                minLength: 1,
              })}
            />
          </div>
          <div>
            <TextField
              type="password"
              label="Mật khẩu"
              sx={{
                width: "100%",
              }}
              {...register("password", {
                required: "Vui lòng điền giá trị",
                minLength: 1,
              })}
              error={errors.password}
              helperText={errors.password?.message}
            />
          </div>
          <div>
            <TextField
              type="password"
              label="Nhập lại mật khẩu"
              sx={{
                width: "100%",
              }}
              {...register("confirmPassword", {
                required: "Vui lòng điền giá trị",
                minLength: 1,
                validate: (value, formValue) => {
                  return (
                    value == formValue.password || "Mật khẩu không trùng lập"
                  );
                },
              })}
              error={errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "100%", height: "40px" }}
          >
            Submit
          </Button>
        </div>
        <div className="w-full h-[1px] bg-slate-300 my-4"></div>
        <div className="mt-4">
          <p className="text-center text-sm">
            Bạn đã có tài khoản ?{" "}
            <Link to={"/login"} className="text-blue-500">
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
