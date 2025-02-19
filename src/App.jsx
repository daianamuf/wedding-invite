import { useReducer, useState } from "react";

import Countdown from "./Countdown";

const initialState = {
  inputs: {
    nume: "",
    confirmare: "",
    persoane: "",
    meniu: "",
    cazare: "",
    mentiuni: "",
  },
  errors: {},
};

function formReducer(state, action) {
  switch (action.type) {
    case "setInput":
      return {
        ...state,
        inputs: { ...state.inputs, [action.field]: action.value },
      };
    case "setError":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case "resetForm":
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "setInput", field: name, value });
  };

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "nume":
      case "confirmare":
      case "persoane":
      case "meniu":
      case "cazare":
        if (!value.trim()) {
          error = "Acest câmp este obligatoriu.";
        }

        break;
      default:
        error = "";
    }
    dispatch({ type: "setError", field: name, error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isFormValid = true;

    Object.keys(state.inputs).forEach((key) => {
      validateInput(key, state.inputs[key]);
      if (state.errors[key]) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      try {
        await setForm(state.inputs);
        dispatch({ type: "resetForm" });
        setTimeout(() => {
          setSubmissionMessage("Formular trimis cu succes!");
        }, 5000);
      } catch (error) {
        console.error(error);
        setSubmissionMessage(
          "Eroare de server. Vă rugăm incercați mai tarziu!"
        );
      }
    }
  };

  const setForm = async (submissionData) => {};

  return (
    <main>
      <img className="invite" src="/invitatie.jpeg" alt="invitatie" />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nume">Nume:</label>
          <input
            className="form-group__input"
            type="text"
            id="nume"
            name="nume"
            placeholder="...."
            value={state.inputs.nume}
            onChange={handleChange}
          />
          {state.errors.name && (
            <span className="error-message">{state.errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label>Confirmarea participării:</label>
          <div className="radio-group">
            <label className="radio-group__label">
              <input
                className="radio-group__input"
                type="radio"
                name="confirmare"
                value="DA"
                checked={state.inputs.confirmare === "DA"}
                onChange={handleChange}
              />
              DA
            </label>

            <label className="radio-group__label">
              <input
                className="radio-group__input"
                type="radio"
                name="confirmare"
                value="NU"
                checked={state.inputs.confirmare === "NU"}
                onChange={handleChange}
              />
              NU
            </label>
          </div>
          {state.errors.confirmare && (
            <span className="error-message">{state.errors.confirmare}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="persoane">
            Câte persoane vor veni alături de tine?
          </label>
          <input
            className="form-group__input"
            type="text"
            id="persoane"
            name="persoane"
            placeholder="...."
            value={state.inputs.persoane}
            onChange={handleChange}
          />
          {state.errors.persoane && (
            <span className="error-message">{state.errors.persoane}</span>
          )}
        </div>

        <div className="form-group">
          <label>Restricții alimentare:</label>
          <div className="radio-group">
            <label className="radio-group__label">
              <input
                className="radio-group__input"
                type="radio"
                name="meniu"
                value="Vegetarian"
                checked={state.inputs.meniu === "Vegetarian"}
                onChange={handleChange}
              />
              Meniu vegetarian
            </label>

            <label className="radio-group__label">
              <input
                className="radio-group__input"
                type="radio"
                name="meniu"
                value="Standard"
                checked={state.inputs.meniu === "Standard"}
                onChange={handleChange}
              />
              Meniu standard
            </label>
          </div>
          {state.errors.meniu && (
            <span className="error-message">{state.errors.meniu}</span>
          )}
        </div>

        <div className="form-group">
          <label>Ai nevoie de cazare?</label>
          <div className="radio-group">
            <label className="radio-group__label">
              <input
                className="radio-group__input"
                type="radio"
                name="cazare"
                value="DA"
                checked={state.inputs.cazare === "DA"}
                onChange={handleChange}
              />
              DA
            </label>

            <label className="radio-group__label">
              <input
                className="radio-group__input"
                type="radio"
                name="cazare"
                value="NU"
                checked={state.inputs.cazare === "NU"}
                onChange={handleChange}
              />
              NU
            </label>
          </div>
          {state.errors.cazare && (
            <span className="error-message">{state.errors.cazare}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="nume">Alte mențiuni:</label>
          <input
            className="form-group__input"
            type="text"
            rows={5}
            id="mentiuni"
            name="mentiuni"
            placeholder="...."
            value={state.inputs.mentiuni}
            onChange={handleChange}
          />
        </div>

        <button className="submit-btn" type="submit">
          Trimite
        </button>
        {submissionMessage && (
          <p className="submission-message">{submissionMessage}</p>
        )}
      </form>

      <Countdown />
    </main>
  );
}

export default App;
