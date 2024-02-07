import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProfile } from "../../store/zudtand";
import { handleLogin } from "../../actions/user";

const Login = () => {
  const { onLogin } = useProfile();
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const user = await handleLogin(email, password);
      toast.success("Đăng nhập thành công");
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-center pb-4 text-xl font-bold mb-4 text-blue-500">
          Đăng nhập
        </div>
        <div className="space-y-4">
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

          <div>
            <TextField
              type="password"
              label="Password"
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
            Bạn chưa có tài khoản ?{" "}
            <Link to={"/register"} className="text-blue-500">
              Đăng kí
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
