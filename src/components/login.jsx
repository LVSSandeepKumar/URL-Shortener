import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import { useState } from "react";
import * as Yup from "yup";

const Login = () => {

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email : "",
    password : ""
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name] : value
    }))
  };

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email : Yup.string()
        .email("Invalid Email")
        .required("Email is required"),
        password : Yup.string()
        .min(6, "Password should be minimum 6 characters long.")
        .required("Password is required")
      });
      await schema.validate(formData, {abortEarly : false});
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your account if you have one.</CardDescription>
        <Error message={"error"} />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input type="email" name="email" placeholder="Enter Email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />
        }
        </div>
        <div className="space-y-1">
          <Input type="password" name="password" placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {true ? <BeatLoader size={10}/> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
