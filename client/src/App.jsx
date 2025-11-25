import { useState } from "react";

const data = ["White background", "Living room", "Holiday", "Studio lighting"];

function App() {
  const [formValues, setFormValues] = useState({
    prompt: "",
    image: "",
  });
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setError(null);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();
    console.log("submitting data");
  }
  
  function handleSubmit(){
    console.log("kejsnvkjs")
    if (!formValues.image){
      setError("Image is not available")
      return;
    } else if (!formValues.prompt){
      setError("Please select a prompt")
      return;
    }
    isLoading(() => true);
    // call api and fetch data

  }

  return (
    <div className="from-rose-400 bg-linear-to-br to-indigo-500 h-screen w-full">
      <div className="w-2xl mx-auto py-26">
        <h1 className="text-4xl text-white text-center font-semibold">
          Product Optikos
        </h1>
        <section className="flex flex-col from-blue-400 bg-linear-to-br to-purple-500 p-10 rounded-lg space-y-2">
          {error && <p className="text-red-800 font-semibold text-2xl">{error}</p>}
          <div className="">
            <label htmlFor="image" className="pr-3">
              Upload Image:
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              placeholder=""
              id="image"
              className="rounded border-2"
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="">Preset:</label>
            <select
              name="prompt"
              value={formValues.prompt}
              onChange={handleChange}
              className="w-full p-2 rounded border bg-white"
            >
              <option value="" disabled>
                Select a preset
              </option>
              {data.map((item, _) => (
                <option key={_} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button className="font-bold text-2xl text-white p-2 from-purple-600 bg-linear-to-br to-pink-400 w-36 rounded mx-auto" onClick={handleSubmit}>{loading ? "Loading..." : "Generate"}</button>
        </section>
      </div>
    </div>
  );
}

export default App;
