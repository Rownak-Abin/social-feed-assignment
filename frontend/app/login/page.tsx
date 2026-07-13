"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { useForm } from "react-hook-form";
import axios from "axios";

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        defaultValues: {
            email: "",
            password: "",
            remember: true,
        },
    });

    const router = useRouter();

    const onSubmit = async (data: LoginForm) => {
        try {
            await authService.login({
                email: data.email,
                password: data.password,
            });

            router.push("/feed");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 422) {
                    const apiErrors = error.response?.data?.errors as
                        | Record<string, string[]>
                        | undefined;

                    if (apiErrors) {
                        Object.entries(apiErrors).forEach(([field, messages]) => {
                            setError(field as keyof LoginForm, {
                                type: "server",
                                message: messages[0],
                            });
                        });
                        return;
                    }
                }

                if (status === 401) {
                    setError("email", {
                        type: "server",
                        message: "",
                    });
                    setError("password", {
                        type: "server",
                        message: "Invalid email or password.",
                    });
                    return;
                }

                alert(error.response?.data?.message || "Login failed.");
                return;
            }

            alert("Something went wrong.");
        }
    };

    return (
        <section className="_social_login_wrapper _layout_main_wrapper">
            <div className="_shape_one">
                <Image
                    src="/assets/images/shape1.svg"
                    alt=""
                    width={220}
                    height={220}
                    className="_shape_img"
                />

                <Image
                    src="/assets/images/dark_shape.svg"
                    alt=""
                    width={220}
                    height={220}
                    className="_dark_shape"
                />
            </div>

            <div className="_shape_two">
                <Image
                    src="/assets/images/shape2.svg"
                    alt=""
                    width={220}
                    height={220}
                    className="_shape_img"
                />

                <Image
                    src="/assets/images/dark_shape1.svg"
                    alt=""
                    width={220}
                    height={220}
                    className="_dark_shape _dark_shape_opacity"
                />
            </div>

            <div className="_shape_three">
                <Image
                    src="/assets/images/shape3.svg"
                    alt=""
                    width={220}
                    height={220}
                    className="_shape_img"
                />

                <Image
                    src="/assets/images/dark_shape2.svg"
                    alt=""
                    width={220}
                    height={220}
                    className="_dark_shape _dark_shape_opacity"
                />
            </div>

            <div className="_social_login_wrap">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="_social_login_left">
                                <div className="_social_login_left_image">
                                    <Image
                                        src="/assets/images/login.png"
                                        alt="Login"
                                        width={700}
                                        height={650}
                                        className="_left_img"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <div className="_social_login_content">

                                <div className="_social_login_left_logo _mar_b28">
                                    <Image
                                        src="/assets/images/logo.svg"
                                        alt="Logo"
                                        width={170}
                                        height={60}
                                        className="_left_logo"
                                    />
                                </div>

                                <p className="_social_login_content_para _mar_b8">
                                    Welcome back
                                </p>

                                <h4 className="_social_login_content_title _titl4 _mar_b50">
                                    Login to your account
                                </h4>

                                <form
                                    className="_social_login_form"
                                    onSubmit={handleSubmit(onSubmit)}
                                >

                                    <div className="row">

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_login_form_input _mar_b14">

                                                <label className="_social_login_label _mar_b8">
                                                    Email
                                                </label>

                                                <input
                                                    type="email"
                                                    className="form-control _social_login_input"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                    })}
                                                />

                                                {errors.email && (
                                                    <small className="text-danger">
                                                        {errors.email.message}
                                                    </small>
                                                )}

                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_login_form_input _mar_b14">

                                                <label className="_social_login_label _mar_b8">
                                                    Password
                                                </label>

                                                <input
                                                    type="password"
                                                    className="form-control _social_login_input"
                                                    {...register("password", {
                                                        required: "Password is required",
                                                    })}
                                                />

                                                {errors.password && (
                                                    <small className="text-danger">
                                                        {errors.password.message}
                                                    </small>
                                                )}

                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                                            <div className="form-check _social_login_form_check">

                                                <input
                                                    className="form-check-input _social_login_form_check_input"
                                                    type="checkbox"
                                                    id="remember"
                                                    {...register("remember")}
                                                />

                                                <label
                                                    className="form-check-label _social_login_form_check_label"
                                                    htmlFor="remember"
                                                >
                                                    Remember me
                                                </label>

                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                                            <div className="_social_login_form_left">
                                                <Link
                                                    href="/forgot-password"
                                                    className="_social_login_form_left_para"
                                                >
                                                    Forgot password?
                                                </Link>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-lg-12">

                                            <div className="_social_login_form_btn _mar_t40 _mar_b60">

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="_social_login_form_btn_link _btn1"
                                                >
                                                    {isSubmitting ? "Logging in..." : "Login now"}
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </form>

                                <div className="row">

                                    <div className="col-12">

                                        <div className="_social_login_bottom_txt">

                                            <p className="_social_login_bottom_txt_para">
                                                Dont have an account?{" "}
                                                <Link href="/register">
                                                    Create New Account
                                                </Link>
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}