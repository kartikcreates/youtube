import React from "react";
import { useFormik } from "formik";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import axios from "axios";
import { TextField } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { lightBlue } from '@mui/material/colors';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values) => {
  const errors = {};
  if (!values.Name) {
    errors.Name = "Required";
  } else if (values.Name.length > 15) {
    errors.Name = "Must be 15 characters or less";


  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.userimage) {
    errors.userimage = "Required";
  }

  return errors;
};

export const SignupForm = () => {
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      Name: "",
      password: "",
      email: "",
      userimage: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      const imageref = ref(storage, values.email + uuidv4());
      const mfile = document.getElementById("userimage").files[0];
      uploadBytes(imageref, mfile).then((snapshot) => {
        getDownloadURL(imageref).then((downloadUrl) => {
          console.log("file at" + downloadUrl);
          axios.post(
            "http://localhost:8001/api/auth/signup",
            {
              name: values.Name,
              email: values.email,
              password: values.password,
              img: downloadUrl,
            },
            { withCredentials: true }
          ).then((res) => {
            console.log(res.data)
            alert(res.data)
          });
        });
      });
    },
  });
  return (<>

    <Avatar sx={{ bgcolor: lightBlue[500], width: 70 }} variant="square">
      SignIn
    </Avatar>

    <div style={{ width: "50%", margin: "auto", marginTop: "100px" }}>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="Name">Name</label>
          <TextField
            id="Name"
            name="Name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.Name}
          />
          {formik.errors.Name ? <div style={{ color: "red" }}>{formik.errors.Name}</div> : null}
          <br></br>

          <br></br>
          <label htmlFor="email">Email Address</label>
          <TextField
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}
          <br></br>
          <label htmlFor="password">Password</label>
          <TextField
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}
          <br></br>

          <br></br>
          <label htmlFor="userimage">User Image</label>
          <input
            id="userimage"
            name="userimage"
            type="file"
            accept="image/*"
            onChange={formik.handleChange}
            value={formik.values.userimage}
          />
          {formik.errors.userimage ? <div style={{ color: "red" }}>{formik.errors.userimage}</div> : null}
          <br></br>
          <button type="submit">Signup</button>
        </div>
      </form >
    </div >
  </>
  );
};
