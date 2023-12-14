import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import "../styles/login.css";

const schemaValidation = Yup.object({
    email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    password: Yup.string()
            .min(6, 'Minimum 6 characters!')
            .required('Password is required')
})


function Login(){

    const navigate = useNavigate();

        // LOGIN
        const handleLogin = async (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;
        const { email, password } = Object.fromEntries(
            new FormData(loginForm)
        )
        try {
            let { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if(error){
                alert(error.error_description || error.message)
            } else{
                loginForm.reset();
                navigate('/account');
            }
        } catch (error) {
            console.log(error);
        }
        }

        // LOGIN WITH DISCORD
        const handleLoginWithDiscord = async() => {
        try {
              const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'discord',
                })
            if(error){
                alert(error.error_description || error.message)
            } else{
                navigate('/settings');
            }
        } catch (error) {
            console.log(error);
        }
        }

        // LOGIN WITH FACEBOOK
        const handleLoginWithFacebook = async () =>  {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'facebook',
          })
          if(error){
              alert(error.error_description || error.message)
          } else{
              navigate('/settings');
          }
      } catch (error) {
          console.log(error);
      }
    }

    return (
        <div className="container_login mx-auto
                        xl:w-[500px] lg:w-[500px] md:w-[450px] 
                        sm:w-[400px]"
        >
            <div className="font-extrabold text-3xl text-white text-center">Login</div>
            
            <Formik validationSchema={schemaValidation}>
            {({ errors, touched }) => (
                <Form className="form mt-5" onSubmit={handleLogin}>
                        <Field name="email" type="email" className="input" placeholder="Email"/>
                        {errors.email && touched.email ? (
                            <p className="text-center tracking-wide text-red-500">{errors.email}</p>
                        ): null}

                        <Field name="password" type="password" className="input" placeholder="Password"/>
                        {errors.password && touched.password ? (
                            <p className="text-center tracking-wide text-red-500">{errors.password}</p>
                        ): null}

                    <button className="login-button tracking-wide" 
                            type="submit"
                            value="Sign In">
                                Sign In
                    </button>

                    <button className="facebook-button tracking-wide" 
                            type="submit"
                            onClick={handleLoginWithFacebook}> 
                                <FaFacebook className="w-auto sm:h-7 mr-1 inline-flex bg-transparent"/>
                                Login with Facebook
                    </button>

                    <button className="discord-button tracking-wide" 
                            type="submit" 
                            onClick={handleLoginWithDiscord}>
                                <FaDiscord className="w-auto sm:h-7 mr-1 inline-flex bg-transparent"/>
                                Login with Discord
                    </button> 
                    
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Login;