"use client";

import { callApi } from "@/services/base.service";
import { RoutePath_E } from "@/types/route-path.type";
import LabelBlock from "@/components/block/label.block";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { User_M } from "@prisma/client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    login: yup
      .string()
      .required("Поле обязательное")
      .min(3, "Минимум 3 символа"),
    password: yup.string().required().min(6),
  })
  .required();

const AuthPage: React.FC = () => {
  type FormData = yup.InferType<typeof schema>;

  const [isLoadingRequest, setLoadingRequest] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const handleLogin = async (event: FormData) => {
    try {
      setLoadingRequest(true);
      // TODO: Перенести в service
      // TODO: ПЕреписать на singin sing out
      // TODO: ЛУчше сделать отдельное DTO для auth
      await callApi<User_M>("POST", "auth/login", {
        id: 0,
        login: event.login,
        password: event.password,
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerifyMail: false,
        fullName: "",
        refreshToken: "",
        mail: event.login,
      }).then(() => redirect(RoutePath_E.HOME));
    } finally {
      setLoadingRequest(false);
    }
  };
  const handleRegister = async (event: FormData) => {
    try {
      setLoadingRequest(true);
      // TODO: Перенести в service
      await callApi<User_M>("POST", "auth/register", {
        id: 0,
        login: event.login,
        password: event.password,
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerifyMail: false,
        fullName: "",
        refreshToken: "",
        mail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.login ?? "")
          ? event.login
          : "",
      }).then(() => redirect(RoutePath_E.HOME));
    } finally {
      setLoadingRequest(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <LabelBlock htmlFor="login" value="Логин/почта">
        <Input
          {...register("login")}
          className={errors.login && "border-2 border-error"}
          type="mail"
          id="login"
          placeholder="вашапочта@mail.ru"
          value={watch("login")}
        />
        {errors.login && (
          <small className="text-error">{errors.login.message}</small>
        )}
      </LabelBlock>
      <LabelBlock htmlFor="password" value="Пароль">
        <Input
          {...register("password")}
          className={errors.password && "border-2 border-error"}
          type="text"
          id="password"
          placeholder="qwe123"
          value={watch("password")}
        />
        {errors.password && (
          <small className="text-error">{errors.password.message}</small>
        )}
      </LabelBlock>
      <div className="flex items-center justify-center gap-4">
        {isLoadingRequest ? (
          <Icon name="Loader" className="animate-spin-slow w-5" />
        ) : (
          <>
            {" "}
            <Button onClick={handleSubmit(handleRegister)}>Создать</Button>
            <Button onClick={handleSubmit(handleLogin)}>Войти</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
