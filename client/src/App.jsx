import { useState } from "react";
import { api } from "./axios";

function App() {
  const [prompt, setPrompt] = useState("White background");
  const [file, setFile] = useState(null);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);
  const [output, setOutput] = useState(null);
  const [pre, setPre] = useState(null);
  
  function handleImage(e) {
    setError(null);
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      const imgURL = URL.createObjectURL(selected);
      setPre(imgURL);
    }
  }

  async function handleSubmit() {
    if (!file) {
      setError("Image is not available");
      return;
    } else if (!prompt) {
      setError("Please select a prompt");
      return;
    }
    isLoading(() => true);
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("image_file", file);

    try {
      const res = await api.post("/generate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data.image);
      setOutput(res.data.image);

      if (res.data.image) {
        setOutput(res.data.image);
      } else {
        setError("No image returned from server");
      }
    } catch (e) {
      setError(e?.response?.data?.error);
    } finally {
      isLoading(false);
    }
  }

  return (
    <div className="from-rose-400 bg-linear-to-br to-indigo-500 min-h-screen w-full">
      <div className="w-2xl mx-auto py-26">
        <h1 className="text-4xl text-white text-center font-semibold">
          Product Optikos
        </h1>
        <section className="flex flex-col from-blue-400 bg-linear-to-br to-purple-500 p-10 rounded-lg space-y-2">
          {error && (
            <p className="text-red-800 font-semibold text-2xl">{error}</p>
          )}
          {pre && (
            <img
              src={pre}
              alt="Selected preview"
              className="w-64 h-auto mt-4 rounded-lg shadow self-center"
            />
          )}
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
              onChange={handleImage}
            />
          </div>

          <button
            className="font-bold text-2xl text-white p-2 from-purple-600 bg-linear-to-br to-pink-400 w-auto rounded mx-auto"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Remove BG"}
          </button>

          {output && (
            <div className="mt-6 text-center">
              <h2 className="text-white text-xl font-bold mb-3">
                Generated Output
              </h2>

              <img
                src={output}
                alt="AI Result"
                className="mx-auto w-80 rounded-lg shadow-lg border"
              />

              <a
                href={output}
                download="product_optikos.png"
                className="mt-4 inline-block px-4 py-2 bg-white text-purple-700 font-bold rounded"
              >
                Download
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
