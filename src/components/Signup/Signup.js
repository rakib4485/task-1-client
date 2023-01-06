import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Signup = () => {

    const {createUser, updateUser, googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCreateUser = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = {
            displayName: name
        }

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            updateUser(userInfo)
            .then( () => {
              saveUser(name, email)
              navigate('/')
            })
            .then()
        })
        .then(err => console.error(err)) 
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            const user = result.user;
            saveUser(user.displayName, user.email);
            navigate('/');
        })
        .then(err => {
        })
    }

    const saveUser = (name, email) => {
      const user = {name, email};
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
    }

    return (
        <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse justify-around">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleCreateUser} className="card-body">
            <h1 className="text-4xl font-bold">Sign UP Now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name='name'
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name='email'
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name='password'
                  className="input input-bordered"
                /> 
              </div>
              <div className="form-control mt-3">
                <button className="btn btn-primary">Sign Up</button>
              </div>
              <p className="">Already have an account? Please<Link to="/login" className="text-primary"> Log In</Link></p>
              <div className="divider">OR</div>
              <div className="form-control">
                <button onClick={handleGoogleSignIn} className="btn btn-success text-white flex items-center"> Google Sing in</button>
              </div>
            </form>
          </div>
          <div className="text-center lg:text-left lg:w-1/2">
           {/* <img src={signUpImg} alt="" /> */}
          </div>
        </div>
      </div>
    );
};

export default Signup;