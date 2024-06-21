import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import {
  email_validation,
  password_validation,
} from "../utils/inputValidations";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const methods = useForm();
  const navigate = useNavigate();

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const onSubmit = methods.handleSubmit(async (inputs) => {
    console.log(inputs);
    try {
      const { data } = await axios.post("http://localhost:5000/login", inputs);
      const { success, message, user, token } = data;
      if (success) {
        console.log({ token });
        dispatch(setUser(user));
        dispatch(setToken(token));
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 500);
        methods.reset();
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-300 p-3 text-gray-600">
      <div className="text-center bg-white p-8  rounded-xl shadow-md">
        <h2 className="text-teal-600 text-4xl font-bold mb-5">Login</h2>
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5 items-center"
          >
            <Input {...email_validation} />
            <Input {...password_validation} />

            <button
              onClick={onSubmit}
              className="flex items-center gap-1 px-3 py-2 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-800"
            >
              Login
            </button>
            <span>
              Not have an account?{" "}
              <Link to={"/signup"} className="text-blue-600 font-bold">
                Signup
              </Link>
            </span>
          </form>
        </FormProvider>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
