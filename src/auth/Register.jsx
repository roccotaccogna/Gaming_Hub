import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import supabase from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";

const schemaValidation = Yup.object({
    first_name: Yup.string()
                .min(3, 'Minimum 3 characters!')
                .max(50, 'Maximum 50 characters!')
                .required('Required'),
    last_name: Yup.string()
                .min(3, 'Minimum 3 characters!')
                .max(50, 'Maximum 50 characters!')
                .required('Required'),
    username: Yup.string()
                .min(6, 'Minimum 6 characters!')
                .max(50, 'Maximum 50 characters!')
                .required('Required'),
    email: Yup.string()
                .email('Invalid email')
                .required('Required'),
    password: Yup.string()
                .min(6, 'Minimum 6 characters!')
                .required('Password is required'),
    confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required')
});

function Register(){

    const navigate = useNavigate();

    const handleRegister = async (values) => {
        try {

            let { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        first_name: values.first_name,
                        last_name: values.last_name,
                        username: values.username
                    }
                }
            })
            if(error){
                alert(error.error_description || error.message)
            } else {
                navigate('/account');
            }
        } catch (error){
            console.log(error);
        }
    }
    
    return (
        <div className="container_register mx-auto
                        xl:w-[500px] lg:w-[500px] md:w-[450px] 
                        sm:w-[400px] min-w-[170px"
        >
        <div className="font-extrabold text-3xl text-white text-center">Register</div>
            <Formik
              initialValues={{
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                password: '',
                confirm_password: '',
              }}
              validationSchema={schemaValidation}
              onSubmit={values => {
                handleRegister(values);
              }}
              >
                {({ errors, touched }) => (
                    <Form className="form mt-5">
                        <Field name="first_name" className="input" placeholder="First Name"/>
                        {errors.first_name && touched.first_name ? (
                            <p className="text-center tracking-wide text-red-500">{errors.first_name}</p>
                        ): null}

                        <Field name="last_name" className="input" placeholder="Last Name"/>
                        {errors.last_name && touched.last_name ? (
                            <p className="text-center tracking-wide text-red-500">{errors.last_name}</p>
                        ): null}

                        <Field name="username" className="input" placeholder="Username"/>
                        {errors.username && touched.username ? (
                            <p className="text-center tracking-wide text-red-500">{errors.username}</p>
                        ): null}

                        <Field name="email" type="email" className="input" placeholder="Email"/>
                        {errors.email && touched.email ? (
                            <p className="text-center tracking-wide text-red-500">{errors.email}</p>
                        ): null}

                        <Field name="password" type="password" className="input" placeholder="Password"/>
                        {errors.password && touched.password ? (
                            <p className="text-center tracking-wide text-red-500">{errors.password}</p>
                        ): null}

                        <Field name="confirm_password" type="password" className="input" placeholder="Confirm Password"/>
                        {errors.confirm_password && touched.confirm_password ? (
                            <p className="text-center tracking-wide text-red-500">{errors.confirm_password}</p>
                        ): null}
                        <button className="login-button tracking-wide" type="submit">Register</button>
                    </Form>
                )}
              </Formik>
            <div className="flex">
            <h4>Already have an account?</h4>
            <Link to="/login" className="ml-2 underline">Login</Link>
            </div>
    </div>
    )
}

export default Register;