"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

type RegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const password = watch("password");
    const router = useRouter();

    const onSubmit = async (data: RegisterForm) => {
        try {
            await authService.register({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });

            alert("Registration successful.");
            router.push("/login");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 422) {
                    const apiErrors = error.response?.data?.errors as
                        | Record<string, string[]>
                        | undefined;

                    if (apiErrors) {
                        Object.entries(apiErrors).forEach(([field, messages]) => {
                            setError(field as keyof RegisterForm, {
                                type: "server",
                                message: messages[0],
                            });
                        });
                        return;
                    }
                }

                alert(error.response?.data?.message || "Registration failed.");
                return;
            }

            alert("Something went wrong.");
        }
    };

    return (
        <section className="_social_registration_wrapper _layout_main_wrapper">
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

            <div className="_social_registration_wrap">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="_social_registration_right">

                                <div className="_social_registration_right_image">
                                    <Image
                                        src="/assets/images/registration.png"
                                        alt="Registration"
                                        width={700}
                                        height={650}
                                        priority
                                    />
                                </div>

                                <div className="_social_registration_right_image_dark">
                                    <Image
                                        src="/assets/images/registration1.png"
                                        alt="Registration"
                                        width={700}
                                        height={650}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">

                            <div className="_social_registration_content">

                                <p className="_social_registration_content_para _mar_b8">
                                    Get Started Now
                                </p>

                                <h4 className="_social_registration_content_title _titl4 _mar_b50">
                                    Registration
                                </h4>

                                <button
                                    type="button"
                                    className="_social_registration_content_btn _mar_b40"
                                >
                                    <Image
                                        src="/assets/images/google.svg"
                                        alt="Google"
                                        width={22}
                                        height={22}
                                        className="_google_img"
                                    />

                                    <span>Register with google</span>
                                </button>

                                <div className="_social_registration_content_bottom_txt _mar_b40">
                                    <span>Or</span>
                                </div>

                                <form
                                    className="_social_registration_form"
                                    onSubmit={handleSubmit(onSubmit)}
                                >

                                    <div className="row">

                                        <div className="col-6">
                                            <div className="_social_registration_form_input _mar_b14">

                                                <label className="_social_registration_label _mar_b8">
                                                    First Name
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control _social_registration_input"
                                                    {...register("first_name", {
                                                        required: "First name is required",
                                                    })}
                                                />

                                                {errors.first_name && (
                                                    <small className="text-danger">
                                                        {errors.first_name.message}
                                                    </small>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="_social_registration_form_input _mar_b14">

                                                <label className="_social_registration_label _mar_b8">
                                                    Last Name
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control _social_registration_input"
                                                    {...register("last_name", {
                                                        required: "Last name is required",
                                                    })}
                                                />

                                                {errors.last_name && (
                                                    <small className="text-danger">
                                                        {errors.last_name.message}
                                                    </small>
                                                )}

                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="_social_registration_form_input _mar_b14">

                                                <label className="_social_registration_label _mar_b8">
                                                    Email
                                                </label>

                                                <input
                                                    type="email"
                                                    className="form-control _social_registration_input"
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

                                        <div className="col-12">
                                            <div className="_social_registration_form_input _mar_b14">

                                                <label className="_social_registration_label _mar_b8">
                                                    Password
                                                </label>

                                                <input
                                                    type="password"
                                                    className="form-control _social_registration_input"
                                                    {...register("password", {
                                                        required: "Password is required",
                                                        minLength: {
                                                            value: 6,
                                                            message: "Minimum 6 characters",
                                                        },
                                                    })}
                                                />

                                                {errors.password && (
                                                    <small className="text-danger">
                                                        {errors.password.message}
                                                    </small>
                                                )}

                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="_social_registration_form_input _mar_b14">

                                                <label className="_social_registration_label _mar_b8">
                                                    Repeat Password
                                                </label>

                                                <input
                                                    type="password"
                                                    className="form-control _social_registration_input"
                                                    {...register("password_confirmation", {
                                                        required: "Please confirm password",
                                                        validate: (value) =>
                                                            value === password ||
                                                            "Passwords do not match",
                                                    })}
                                                />

                                                {errors.password_confirmation && (
                                                    <small className="text-danger">
                                                        {errors.password_confirmation.message}
                                                    </small>
                                                )}

                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-12">

                                            <div className="form-check _social_registration_form_check">

                                                <input
                                                    className="form-check-input _social_registration_form_check_input"
                                                    type="checkbox"
                                                    id="terms"
                                                    {...register("terms", {
                                                        required: true,
                                                    })}
                                                />

                                                <label
                                                    className="form-check-label _social_registration_form_check_label"
                                                    htmlFor="terms"
                                                >
                                                    I agree to terms &amp; conditions
                                                </label>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-12">

                                            <div className="_social_registration_form_btn _mar_t40 _mar_b60">

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="_social_registration_form_btn_link _btn1"
                                                >
                                                    {isSubmitting
                                                        ? "Registering..."
                                                        : "Register Now"}
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </form>

                                <div className="row">

                                    <div className="col-12">

                                        <div className="_social_registration_bottom_txt">

                                            <p className="_social_registration_bottom_txt_para">
                                                Already have an account?{" "}
                                                <Link href="/login">
                                                    Login
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