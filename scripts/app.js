const FormContext = React.createContext(null);
const FormDispatchContext = React.createContext(null);

const capitalize = (str) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

// const isValidEmail = (email) => {
//   const pattern = /^[\w.+\-]+@gmail\.com$/;
//   return email.match(pattern);
// };

// const isValidPhone = (number) => {
//   const stringNumber = String(number);
//   const pattern = /^(08)[1-9][0-9]\d{6,9}$/;
//   return stringNumber.match(pattern);
// };

const formReducer = (state, action) => {
  switch (action.type) {
    case "set_data":
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case "next_form":
      return {
        ...state,
        currentForm: state.currentForm + 1,
      };
    case "prev_form":
      return {
        ...state,
        currentForm: state.currentForm - 1,
      };
    default:
      return state;
  }
};

const initialState = {
  data: {
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Development",
    budget: "50.000",
  },
  currentForm: 0,
  step: 0.5,
};

const Progress = (props) => {
  const fraction = Number(props.step) % 1;
  const placeholderBars = [];
  const bars = [];
  const indicators = [];
  let leftOffset = 52;
  for (let i = 0; i < 3; i++) {
    placeholderBars.push(
      <div
        className="progress__bar progress__bar--placeholder"
        style={{
          left: i == 0 ? i + 52 : i * 168 + 52,
        }}
        key={`$placeholder-${i}`}
      ></div>
    );
  }

  for (let i = 0; i < props.step - fraction; i++) {
    bars.push(
      <div
        className="progress__bar"
        style={{
          left: i == 0 ? i + 52 : i * 168 + 52,
        }}
        key={`$bar-${i}`}
      ></div>
    );
    leftOffset += 98 + 70;
  }

  if (fraction > 0 && props.step <= 3) {
    bars.push(
      <div
        className="progress__bar"
        style={{
          left: leftOffset,
          width: 0.5 * 98,
        }}
        key={"bar-fraction"}
      ></div>
    );
  }

  for (let i = 0; i < 4; i++) {
    indicators.push(
      <button
        className={`progress__indicator${
          i <= props.step - fraction ? " progress__indicator--primary" : ""
        }`}
        style={{ left: i * 168 }}
        key={`$indicator-${i}`}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className="progress">
      {placeholderBars}
      {bars}
      {indicators}
    </div>
  );
};

const ContactForm = () => {
  const { data, currentForm } = React.useContext(FormContext);
  const dispatch = React.useContext(FormDispatchContext);

  // const onChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type: "set_data",
  //     payload: {
  //       ...data,
  //       [name]: value,
  //     },
  //   });
  // };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const isValid = formElement.checkValidity();

    formElement.classList.add("form--submitted");

    const firstInvalidElement = formElement.querySelector(":invalid");
    firstInvalidElement?.focus();

    if (isValid) {
      const dataObject = new FormData(formElement);
      console.log(dataObject);
      dispatch({
        type: "set_data",
        payload: {
          name: dataObject.get("name"),
          email: dataObject.get("email"),
          phone: dataObject.get("phone"),
          company: dataObject.get("company"),
        },
      });
      dispatch({ type: "next_form" });
    }
  };

  return (
    <form onSubmit={onSubmitHandler} noValidate>
      <div className="form-container">
        <div className="progress-container">
          <Progress
            step={
              currentForm === 0
                ? 0.5
                : currentForm === 1
                ? 1.5
                : currentForm === 2
                ? 2.5
                : 3
            }
          />
        </div>
        <hr className="form-divider" />
        <div className="form">
          <div className="form__header">
            <h2 className="display-3">Contact Details</h2>
            <p className="text-base">
              Lorem ipsum dolor sit amet, consectetur adipisic.
            </p>
          </div>
          <TextInput
            id="name"
            label="Name"
            defaultValue={data.name}
            name="name"
            icon={<PersonIcon />}
            required
          />
          <TextInput
            id="email"
            label="Email"
            defaultValue={data.email}
            name="email"
            icon={<MailIcon />}
            pattern="^[\w.+\-]+@gmail\.com$"
            required
          />
          <TextInput
            id="phone"
            label="Phone"
            defaultValue={data.phone}
            name="phone"
            icon={<PhoneIcon />}
            pattern="(08)[1-9][0-9]\d{6,9}"
            required
          />
          <TextInput
            id="company"
            label="Company"
            defaultValue={data.company}
            name="company"
            icon={<BuildingIcon />}
            required
          />
        </div>
      </div>
      <div className="actions-container">
        <div>
          {currentForm > 0 && (
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "prev_form" });
              }}
              className="btn btn--outline"
            >
              Previous Step
            </button>
          )}
        </div>
        <div style={{ justifySelf: "end" }}>
          {currentForm < 3 && (
            <button type="submit" className="btn btn--primary">
              Next Step
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

const ServiceForm = () => {
  const dispatch = React.useContext(FormDispatchContext);
  const { data, currentForm } = React.useContext(FormContext);

  // logging
  React.useEffect(() => {
    console.log(data);
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "set_data", payload: { ...data, [name]: value } });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "next_form" });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-container">
        <div className="progress-container">
          <Progress
            step={
              currentForm === 0
                ? 0.5
                : currentForm === 1
                ? 1.5
                : currentForm === 2
                ? 2.5
                : 3
            }
          />
        </div>
        <hr className="form-divider" />
        <div className="radio-group">
          <div className="form__header">
            <h2>Our Services</h2>
            <p>Please select which service you are interested in.</p>
          </div>
          <div className="radio-group__item">
            <input
              type="radio"
              className="radio-group--dnone"
              name="service"
              onChange={onChangeHandler}
              id="development"
              value="Development"
              checked={data.service === "Development"}
            />
            <label className="radio-group__control" htmlFor="development">
              <img src="assets/development-icon.svg" alt="" />
              Development
            </label>
          </div>
          <div className="radio-group__item">
            <input
              type="radio"
              className="radio-group--dnone"
              name="service"
              onChange={onChangeHandler}
              id="design"
              value="Design"
              checked={data.service === "Design"}
            />
            <label className="radio-group__control" htmlFor="design">
              <img src="assets/design-icon.svg" alt="" />
              Design
            </label>
          </div>
          <div className="radio-group__item">
            <input
              type="radio"
              className="radio-group--dnone"
              name="service"
              onChange={onChangeHandler}
              id="marketing"
              value="Marketing"
              checked={data.service === "Marketing"}
            />
            <label className="radio-group__control" htmlFor="marketing">
              <img src="assets/marketing-icon.svg" alt="" />
              Marketing
            </label>
          </div>
          <div className="radio-group__item">
            <input
              type="radio"
              className="radio-group--dnone"
              name="service"
              onChange={onChangeHandler}
              id="other"
              value="Other"
              checked={data.service === "Other"}
            />
            <label className="radio-group__control" htmlFor="other">
              <img src="assets/setting-icon.svg" alt="" />
              Other
            </label>
          </div>
        </div>
      </div>
      <div className="actions-container">
        <div>
          {currentForm > 0 && (
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "prev_form" });
              }}
              className="btn btn--outline"
            >
              Previous Step
            </button>
          )}
        </div>
        <div style={{ justifySelf: "end" }}>
          {currentForm < 3 && (
            <button type="submit" className="btn btn--primary">
              Next Step
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

const BudgetForm = () => {
  const dispatch = React.useContext(FormDispatchContext);
  const { data, currentForm } = React.useContext(FormContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "set_data", payload: { ...data, [name]: value } });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "next_form" });
  };

  // logging
  // React.useEffect(() => {
  //   console.log(data.budget)
  // })

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-container">
        <div className="progress-container">
          <Progress
            step={
              currentForm === 0
                ? 0.5
                : currentForm === 1
                ? 1.5
                : currentForm === 2
                ? 2.5
                : 3
            }
          />
        </div>
        <hr className="form-divider" />
        <div className="radio-group">
          <div className="form__header">
            <h2>What's your budget?</h2>
            <p>Please select the project budget you have in mind.</p>
          </div>
          <div className="radio-group__item">
            <input
              type="radio"
              className="radio-group__radio radio-group--dnone"
              name="budget"
              checked={data.budget === "5.000"}
              onChange={onChangeHandler}
              id="choice1"
              value="5.000"
            />
            <label className="radio-group__control-budget" htmlFor="choice1">
              $5.000 - $10.000
            </label>
          </div>
          <div className="radio-group__item">
            <input
              type="radio"
              className="radio-group__radio"
              name="budget"
              id="choice2"
              value="10.000"
              checked={data.budget === "10.000"}
              onChange={onChangeHandler}
            />
            <label className="radio-group__control-budget" htmlFor="choice2">
              $10.000 - $20.000
            </label>
          </div>
          <div className="radio-group__item">
            <input
              type="radio"
              className="radio-group__radio"
              name="budget"
              id="choice3"
              value="20.000"
              checked={data.budget === "20.000"}
              onChange={onChangeHandler}
            />
            <label className="radio-group__control-budget" htmlFor="choice3">
              $20.000 - $50.000
            </label>
          </div>
          <div className="radio-group__item">
            <input
              type="radio"
              className="radio-group__radio"
              name="budget"
              id="choice4"
              value="50.000"
              checked={data.budget === "50.000"}
              onChange={onChangeHandler}
            />
            <label className="radio-group__control-budget" htmlFor="choice4">
              $50.000 +
            </label>
          </div>
        </div>
      </div>
      <div className="actions-container">
        <div>
          {currentForm > 0 && (
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "prev_form" });
              }}
              className="btn btn--outline"
            >
              Previous Step
            </button>
          )}
        </div>
        <div style={{ justifySelf: "end" }}>
          {currentForm < 3 && (
            <button type="submit" className="btn btn--primary">
              Next Step
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

const SubmitForm = () => {
  const { data, currentForm } = React.useContext(FormContext);
  const dispatch = React.useContext(FormDispatchContext);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert(JSON.stringify(data));
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-container">
        <div className="progress-container">
          <Progress
            step={
              currentForm === 0
                ? 0.5
                : currentForm === 1
                ? 1.5
                : currentForm === 2
                ? 2.5
                : 3
            }
          />
        </div>
        <hr className="form-divider" />
        <div className="submit-form">
          <img src="assets/Group37301.png" alt="" />
          <h2 className="display-3 text-center">Submit your quote request</h2>
          <p className="text-base text-center">
            Please review all the information you previously typed in the past
            steps, and if all is okay, submit your message to receive a project
            quote in 24 - 48 hours.
          </p>
          <button type="submit" className="btn btn--primary">
            Submit
          </button>
        </div>
      </div>
      <div className="actions-container">
        <div>
          {currentForm > 0 && (
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "prev_form" });
              }}
              className="btn btn--outline"
            >
              Previous Step
            </button>
          )}
        </div>
        <div style={{ justifySelf: "end" }}>
          {currentForm < 3 && (
            <button type="submit" className="btn btn--primary">
              Next Step
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

const TextInput = ({ id, icon, label, errorMessage, ...inputProps }) => {
  const [validationMessage, setValidationMessage] = React.useState("");

  const onInvalid = (e) => {
    if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity(`${capitalize(e.target.name)} is Invalid`);
    } else if (e.target.validity.valueMissing) {
      e.target.setCustomValidity(`${capitalize(e.target.name)} is required`);
    } else {
      e.target.setCustomValidity("");
    }

    setValidationMessage(e.target.validationMessage);
  };

  const onBlur = (e) => {
    e.target.checkValidity();
    if (validationMessage) {
      setValidationMessage(e.target.validationMessage);
    }
  };

  return (
    <div className="text-input">
      <div className="text-input__field">
        <input
          onBlur={onBlur}
          onInvalid={onInvalid}
          {...inputProps}
          className="text-input__input"
        />
        <div className="text-input__icon">{icon}</div>
      </div>
      {label && (
        <label
          htmlFor={id}
          className={
            validationMessage ? "text-input__label--error" : "text-input__label"
          }
        >
          {label}
        </label>
      )}
      {validationMessage && (
        <p className="text-input__error-msg">
          {errorMessage || validationMessage}
        </p>
      )}
    </div>
  );
};

// const TextInput = React.forwardRef((props, ref) => {
//   return (
//     <div className="text-input">
//       <input
//         className="text-input__field"
//         required={props.required}
//         ref={ref}
//         type={props.type}
//         placeholder={props.placeholder}
//         {...props}
//       />
//       {props.icon}
//     </div>
//   );
// });

const PersonIcon = () => {
  return (
    <svg
      width="23"
      height="29"
      viewBox="0 0 23 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5629 14.2939C15.0647 14.2939 17.9034 11.4552 17.9034 7.95337C17.9034 4.45156 15.0647 1.61279 11.5629 1.61279C8.06106 1.61279 5.22229 4.45156 5.22229 7.95337C5.22229 11.4552 8.06106 14.2939 11.5629 14.2939Z"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.41797 27.4384C1.41797 24.7478 2.4868 22.1674 4.38935 20.2648C6.29189 18.3623 8.87229 17.2935 11.5629 17.2935C14.2535 17.2935 16.8339 18.3623 18.7364 20.2648C20.639 22.1674 21.7078 24.7478 21.7078 27.4384"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MailIcon = () => {
  return (
    <svg
      width="25"
      height="19"
      viewBox="0 0 25 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9883 1.52588H2.98828C1.88371 1.52588 0.988281 2.42131 0.988281 3.52588V15.5259C0.988281 16.6304 1.88371 17.5259 2.98828 17.5259H21.9883C23.0929 17.5259 23.9883 16.6304 23.9883 15.5259V3.52588C23.9883 2.42131 23.0929 1.52588 21.9883 1.52588Z"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.3993 2.10791L12.4883 11.0259L1.57727 2.10791"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PhoneIcon = () => {
  return (
    <svg
      width="17"
      height="29"
      viewBox="0 0 17 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2434 1.51172H3.06946C1.82082 1.51172 0.808594 2.52394 0.808594 3.77259V25.2508C0.808594 26.4995 1.82082 27.5117 3.06946 27.5117H13.2434C14.492 27.5117 15.5042 26.4995 15.5042 25.2508V3.77259C15.5042 2.52394 14.492 1.51172 13.2434 1.51172Z"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8595 1.51172V2.99295C11.8595 3.38579 11.7035 3.76255 11.4257 4.04033C11.1479 4.31812 10.7711 4.47418 10.3783 4.47418H5.9346C5.54175 4.47418 5.165 4.31812 4.88721 4.04033C4.60943 3.76255 4.45337 3.38579 4.45337 2.99295V1.51172"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const BuildingIcon = () => {
  return (
    <svg
      width="17"
      height="32"
      viewBox="0 0 17 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.399 30.5116V6.86729C15.3989 6.6139 15.3191 6.36696 15.171 6.16138C15.0229 5.9558 14.8139 5.80198 14.5736 5.72168L2.50606 1.69918C2.32461 1.63837 2.13128 1.62165 1.94208 1.65039C1.75289 1.67914 1.57325 1.75253 1.41805 1.86449C1.26285 1.97644 1.13654 2.12375 1.04958 2.29422C0.962622 2.46469 0.917507 2.65342 0.917972 2.84479V30.5116"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5703 22.8916V24.0984"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5703 16.8579V18.0647"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5703 10.8242V12.031"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.74609 22.8916V24.0984"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.74609 16.8579V18.0647"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.74609 10.8242V12.031"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Form = (props) => {
  const { currentForm } = React.useContext(FormContext);
  // const dispatch = React.useContext(FormDispatchContext)
  return (
    <main className="container">
      <section className="heading">
        <h1 className="display-2 text-center">Get a project quote</h1>
        <p className="text-base text-center">
          Please fill the form below to receive a quote for your project. Feel
          <br /> free to add as much detail as needed.
        </p>
      </section>
      <section>{props.children[currentForm]}</section>
    </main>
  );
};

const App = () => {
  const [data, dispatch] = React.useReducer(formReducer, initialState);
  return (
    <FormContext.Provider value={data}>
      <FormDispatchContext.Provider value={dispatch}>
        <Form>
          <ContactForm />
          <ServiceForm />
          <BudgetForm />
          <SubmitForm />
        </Form>
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
