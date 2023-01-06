import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Form = () => {
  const { user } = useContext(AuthContext);

  const [sectors, setSectors] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    fetch("https://task-1-server-rakib4485.vercel.app/sectors")
      .then((res) => res.json())
      .then((data) => setSectors(data[0].sectors));
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
    const email = user.email;

    const info = {
      email,
      name,
      sectors,
      terms,
    };

    console.log(info);

    fetch(`https://task-1-server-rakib4485.vercel.app/users/${user.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        form.reset();
      });
  };

  return (
    <div className="relative min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="md:w-[50%]  absolute  top-[15%] md:left-1/4  border p-7 rounded-lg"
      >
        <Link className="btn btn-active btn-primary mr-5">Form</Link>
        <Link to="/edit" className="btn btn-outline btn-primary">
          Edit
        </Link>
        <p className="text-lg">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </p>
        {
          !user?.uid &&
          <p className="text-red-500">For Save the Information you need to Login First!!</p>
        }
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
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
            {sectors.map((sector) => (
              <option value={sector}>{sector}</option>
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

export default Form;
