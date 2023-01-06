import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Loader from "../Loader/Loader";

const EditForm = () => {
  const { user, loading } = useContext(AuthContext);
  const [sectors, setSectors] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetch("https://task-1-server-rakib4485.vercel.app/sectors")
      .then((res) => res.json())
      .then((data) => setSectors(data[0].sectors));
  }, []);

  useEffect(() => {
    fetch(`https://task-1-server-rakib4485.vercel.app/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
  }, []);
  const handleChange = (event) => {
    if (event.target.checked) {
      console.log("✅ Checkbox is checked");
    } else {
      console.log("⛔️ Checkbox is NOT checked");
    }
    setIsSubscribed((current) => !current);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const sectors = form.sector.value;
    const terms = form.terms.value;
    const email = user?.email;

    const info = {
      email,
      name,
      sectors,
      terms,
    };

    console.log(info);

    fetch(`https://task-1-server-rakib4485.vercel.app/users/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    
  };
  if(loading){
    return <Loader></Loader>
}
  return (
    <div className="relative min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="md:w-[50%]  absolute  top-[15%] md:left-1/4  border p-7 rounded-lg"
      >
        <Link to="/" className="btn btn-outline btn-primary mr-5">
          Form
        </Link>
        <Link className="btn btn-active btn-primary">Edit</Link>
        <p className="text-lg">
          Please Edit your name and Sectors you are currently involved in.{" "}
        </p>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            defaultValue={currentUser.name ? currentUser.name : ""}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Sectors</span>
          </label>
          <select
            name="sector"
            className="select select-bordered w-full"
            required
          >
            {currentUser.sectors && (
              <option selected value={currentUser.sectors}>
                {currentUser.sectors}
              </option>
            )}
            {sectors.map((sector, i) => (
              <option value={sector} key={i}>{sector}</option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex items-center">
          <input
            name="terms"
            value={isSubscribed}
            onChange={handleChange}
            type="checkbox"
            className="checkbox checkbox-md"
            required
          />
          <span className="ml-5">Agree to term</span>
        </div>
        <input type="submit" value="Save" className="btn btn-secondary mt-5" />
      </form>
    </div>
  );
};

export default EditForm;
