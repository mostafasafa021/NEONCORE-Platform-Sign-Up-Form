import logo from "./assets/images/logo.svg";
import patternBackdrop from "./assets/images/pattern-backdrop.svg";
import eyeIcon from "./assets/images/icon-eye.svg";
import alertIcon from "./assets/images/icon-alert.svg";
import eyeIconOff from "./assets/images/icon-eye-off.svg";
import tickIcon from "./assets/images/icon-tick-16.svg";
import successTickIcon from "./assets/images/icon-tick-20.svg";
import "./App.css";
import { use, useState } from "react";

const operatorRows = [
  ["Callsign", "Pending"],
  ["Email", "Pending"],
  ["Password", "Pending"],
  ["Confirm", "Pending"],
  ["Terms", "Required"],
];

const passwordStrengthLevels = {
  Weak: { bars: 1, color: "bg-red-400", textColor: "text-red-400" },
  Fair: { bars: 2, color: "bg-amber-400", textColor: "text-amber-400" },
  Good: { bars: 3, color: "bg-lime-500", textColor: "text-lime-500" },
  Strong: { bars: 4, color: "bg-lime-700", textColor: "text-lime-700" },
};

const inputClasses =
  "mt-2 min-h-13 w-full border border-neutral-600 bg-navy-950 px-4 py-3 font-jetbrains text-inputs text-neutral-100 placeholder:text-neutral-500 focus-visible:border-lime-500 focus-visible:outline-2 focus-visible:outline-lime-500 focus-visible:outline-offset-3 hover:border-neutral-50 transition-color";

function App() {
  const [formData, setFormData] = useState({
    callsign: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    callsign: {
      isError: false,
      message: "",
    },
    email: {
      isError: false,
      message: "",
    },
    password: {
      isError: false,
      message: "",
    },
    confirmPassword: {
      isError: false,
      message: "",
    },
    terms: {
      isError: false,
      message: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    console.log(event.target);
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function setError(field, isError, message) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: {
        ...[field],
        isError,
        message,
      },
    }));
  }

  function validateForm(e) {
    e.preventDefault();
    if (/[^a-zA-Z0-9_-]/.test(formData.callsign)) {
      setError("callsign", true, "Use letters, numbers, _ or - only");
    } else if (formData.callsign.length < 3) {
      setError("callsign", true, "Use at least 3 characters");
    } else if (formData.callsign.length > 20) {
      setError("callsign", true, "Use 20 characters or fewer");
    } else {
      setError("callsign", false, "");
    }

    if (!/\w+@\w+.(com|net)/.test(formData.email)) {
      setError("email", true, "Enter a valid email, like you@example.com");
    } else {
      setError("email", false, "");
    }

    if (formData.password.length === 0) {
      setError("password", true, "Enter a password");
    } else if (formData.password.length < 8) {
      setError("password", true, "Use at least 8 characters");
    } else {
      setError("password", false, "");
    }

    if (
      formData.password !== formData.confirmPassword &&
      formData.password.length >= 8
    ) {
      setError("confirmPassword", true, "Passwords don't match");
    } else {
      setError("confirmPassword", false, "");
    }

    if (!formData.terms) {
      setError("terms", true, "Accept the terms to continue");
    } else {
      setError("terms", false, "");
    }
  }

  function checkPasswordStrength(password) {
    const scoreLabels = ["Weak", "Fair", "Good", "Strong"];
    let score = 0;
    const passMinimun = password.length >= 8;
    if (password.length >= 16) {
      score++;
    }

    if (password.length >= 20) {
      score++;
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password) && passMinimun) {
      score++;
    }

    if (/[0-9]/.test(password) && passMinimun) {
      score++;
    }

    if (/[^a-zA-Z0-9 ]/.test(password) && passMinimun) {
      score++;
    }
    return scoreLabels[score];
  }

  const strength = passwordStrengthLevels[passwordStrength];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-neutral-950 p-4 text-neutral-50 md:p-10">
      <img
        src={patternBackdrop}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[30rem] top-1/2 z-0 hidden size-[60rem] -translate-y-1/2 lg:block"
      />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1120px] content-start gap-7 py-8 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center lg:gap-8 lg:py-0 xl:gap-20">
        <section
          aria-label="NEONCORE sign-up introduction"
          className="min-w-0 lg:my-auto"
        >
          <div className="flex items-center justify-between lg:block">
            <img src={logo} alt="NEONCORE" className="h-8 w-[169px]" />
            <p className="preset-6 text-neutral-400 lg:hidden">0/5 ready</p>
          </div>

          <div className="mt-8 flex items-start gap-3 lg:mt-24 lg:gap-5">
            <span
              aria-hidden="true"
              className="mt-1 flex shrink-0 gap-2 pt-1 md:gap-3 lg:mt-3"
            >
              <span className="h-8 w-[5px] rotate-[42deg] bg-lime-500 md:h-10 md:w-[6px] lg:h-14 lg:w-2" />
              <span className="h-8 w-[5px] rotate-[42deg] bg-lime-500 md:h-10 md:w-[6px] lg:h-14 lg:w-2" />
            </span>
            <h1 className="preset-1 text-neutral-50">
              Join the
              <br />
              nexus
            </h1>
          </div>

          <p className="preset-6 mt-3 text-neutral-300 lg:mt-6">
            Initialize your NEONCORE identity
          </p>

          <section
            aria-label="Operator ID status"
            className="mt-7 border-t border-neutral-700 lg:mt-16"
          >
            <div className="flex items-center justify-between pt-4 lg:pt-6">
              <h2 className="preset-6 text-neutral-400">Operator ID</h2>
              <p className="preset-6 hidden text-neutral-400 lg:block">
                0/5 ready
              </p>
              <p className="preset-6 text-neutral-400 lg:hidden">Unassigned</p>
            </div>

            <p className="preset-2 mt-2 hidden text-neutral-300 uppercase lg:block">
              Unassigned
            </p>

            <ul className="mt-5 hidden space-y-2 lg:block">
              {operatorRows.map(([label, status]) => (
                <li
                  key={label}
                  className="preset-6 flex items-center gap-3 text-neutral-400"
                >
                  <span>{label}</span>
                  <span
                    aria-hidden="true"
                    className="mb-1 flex-1 border-b border-dotted border-neutral-700"
                  />
                  <span>{status}</span>
                </li>
              ))}
            </ul>
          </section>
        </section>

        <section
          aria-labelledby="signup-title"
          className="relative border border-neutral-700 bg-neutral-900/90 px-5 py-8 md:px-10 md:py-10 lg:py-11"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-lime-500"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-lime-500"
          />

          <header className="flex items-center justify-between border-b border-neutral-700 pb-4">
            <h2 id="signup-title" className="preset-6 text-neutral-100">
              New operator
            </h2>
            <p className="preset-6 hidden text-neutral-400 md:block">
              All fields required
            </p>
            <p className="preset-6 text-neutral-400 md:hidden">All required</p>
          </header>

          <form className="mt-6" onSubmit={validateForm} noValidate>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="callsign"
                  className="preset-6 flex items-center gap-2 text-neutral-300"
                >
                  <span className="text-lime-500">&gt;</span>
                  Callsign
                </label>
                <div className="relative">
                  <input
                    id="callsign"
                    name="callsign"
                    type="text"
                    placeholder="e.g. Vortex_07"
                    autoComplete="nickname"
                    value={formData.callsign}
                    onChange={handleChange}
                    className={`${inputClasses} pr-12`}
                  />
                </div>
                {errors.callsign.isError ? (
                  <p className="preset-7 mt-3 text-red-400 flex items-center gap-3">
                    <img
                      src={alertIcon}
                      alt=""
                      aria-hidden="true"
                      className="inline-block"
                    />{" "}
                    {errors.callsign.message}
                  </p>
                ) : (
                  <p className="preset-7 mt-3 text-neutral-400">
                    3–20 characters: letters, numbers, _ or -
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="preset-6 flex items-center gap-2 text-neutral-300"
                >
                  <span className="text-lime-500">&gt;</span>
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputClasses} pr-12`}
                  />
                </div>
                {errors.email.isError && (
                  <p className="preset-7 mt-3 text-red-400 flex items-center gap-3">
                    <img
                      src={alertIcon}
                      alt=""
                      aria-hidden="true"
                      className="inline-block"
                    />{" "}
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="preset-6 flex items-center gap-2 text-neutral-300"
                >
                  <span className="text-lime-500">&gt;</span>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={(event) => {
                      handleChange(event);
                      setPasswordStrength(
                        checkPasswordStrength(event.target.value),
                      );
                      if (event.target.value.length < 1) {
                        setPasswordStrength(null);
                      }
                    }}
                    className={`${inputClasses} pr-20`}
                  />
                  <button
                    type="button"
                    aria-label="Show password"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 p-2 cursor-pointer focus-visible:border-2 focus-visible:border-lime-500 focus-visible:outline-none"
                  >
                    {showPassword ? (
                      <img
                        src={eyeIconOff}
                        alt=""
                        aria-hidden="true"
                        className="size-5"
                      />
                    ) : (
                      <img
                        src={eyeIcon}
                        alt=""
                        aria-hidden="true"
                        className="size-5"
                      />
                    )}
                  </button>
                </div>
                <div className="relative mt-2 grid grid-cols-4 gap-1">
                  {Array.from({ length: 4 }, (_, index) => (
                    <span
                      key={index}
                      aria-hidden="true"
                      className={`h-1 ${strength && index < strength.bars ? strength.color : "bg-neutral-700"}`}
                    />
                  ))}
                  {strength && (
                    <span
                      className={`preset-6 absolute -bottom-6 right-0 ${strength.textColor}`}
                    >
                      {passwordStrength}
                    </span>
                  )}
                </div>
                {errors.password.isError ? (
                  <p className="preset-7 mt-2 flex items-center gap-3 pr-16 text-red-400">
                    <img
                      src={alertIcon}
                      alt=""
                      aria-hidden="true"
                      className="inline-block"
                    />{" "}
                    {errors.password.message}
                  </p>
                ) : (
                  <p className="preset-7 mt-2 text-neutral-400">
                    At least 8 characters
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="preset-6 flex items-center gap-2 text-neutral-300"
                >
                  <span className="text-lime-500">&gt;</span>
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`${inputClasses} pr-20`}
                  />
                  <button
                    type="button"
                    aria-label="Show confirm password"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 p-2 cursor-pointer focus-visible:border-2 focus-visible:border-lime-500 focus-visible:outline-none"
                  >
                    {showConfirmPassword ? (
                      <img
                        src={eyeIconOff}
                        alt=""
                        aria-hidden="true"
                        className="size-5"
                      />
                    ) : (
                      <img
                        src={eyeIcon}
                        alt=""
                        aria-hidden="true"
                        className="size-5"
                      />
                    )}
                  </button>
                </div>
                {errors.confirmPassword.isError && (
                  <p className="preset-7 mt-3 text-red-400 flex items-center gap-3">
                    <img
                      src={alertIcon}
                      alt=""
                      aria-hidden="true"
                      className="inline-block"
                    />{" "}
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <div className="relative mt-0.5 size-6 shrink-0">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="size-full appearance-none border border-neutral-600 bg-navy-950 cursor-pointer focus-visible:outline-2 focus-visible:outline-lime-500 focus-visible:outline-offset-3 checked:bg-lime-500 checked:border-none"
                />
                {formData.terms && (
                  <img
                    src={tickIcon}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2"
                  />
                )}
              </div>
              <label htmlFor="terms" className="preset-5 text-neutral-300">
                I accept the{" "}
                <a
                  href="#terms"
                  className="text-lime-500 p-1 focus:border-2 focus:border-lime-500 focus:outline-none"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  className="text-lime-500 p-1 focus:border-2 focus:border-lime-500 focus:outline-none"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            {errors.terms.isError && (
              <p className="preset-7 mt-3 text-red-400 flex items-center gap-3">
                <img
                  src={alertIcon}
                  alt=""
                  aria-hidden="true"
                  className="inline-block"
                />{" "}
                {errors.terms.message}
              </p>
            )}

            <button
              type="submit"
              className="preset-5-bold mt-6 flex h-12 w-full items-center justify-center bg-lime-500 text-navy-950 focus-visible:border-3 focus-visible:border-neutral-900/80  focus-visible:outline-2 focus-visible:outline-lime-500 hover:cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              Initialize account
            </button>
          </form>

          <p className="preset-5 mt-6 text-center text-neutral-300">
            Already an operator?{" "}
            <a
              href="#login"
              className="text-lime-500 p-1 focus:border-2 focus:border-lime-500 focus:outline-none"
            >
              Log in
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}

export default App;
