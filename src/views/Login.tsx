import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationData } from "../utils/Validation";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  type LoginForm = {
    name: string;
    password: string;
  };

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(validationData),
  });

  // ログインボタン押下時処理
  const handleLogin = (data: LoginForm) => {
    console.log(data);

    // 仮にユーザID：「root」、パスワード：「123456」でログイン成功とする
    if (data.name === "root" && data.password === "123456") {
      navigate("/Success");
    }
  };

  return (
    <div className="form-container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor="userID">ユーザーID</label>
        <input id="userID" type="text" {...register("name")} />
        <p>{errors.name?.message}</p>

        <label htmlFor="password">パスワード</label>
        <input id="password" type="password" {...register("password")} />
        <p>{errors.password?.message}</p>

        <button type="submit">ログイン</button>
        <button>クリア</button>
      </form>
    </div>
  );
};

export default Login;
