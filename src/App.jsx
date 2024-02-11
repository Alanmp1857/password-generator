import { useEffect } from "react";
import { useCallback } from "react";
import { useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) string += "1234567890";
    if (charAllowed) string += "!@#$%^&*()[]{}-=_+|;:,./<>?";
    for (let i = 1; i <= length; i++) {
      pass += string.charAt(Math.floor(Math.random() * string.length));
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-blue-400 text-center">
        <h1 className="text-white text-center text-3xl">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden my-3">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-1 px-4"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0 hover:bg-blue-500">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 items-center justify-center">
          <div className="flex">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className=" w-20">Length: {length}</label>
          </div>
          <div className="flex">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label className="mx-1">Numbers</label>
          </div>
          <div className="flex">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label className="mx-1">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
