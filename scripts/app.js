const FormContext = React.createContext(null)
const FormDispatchContext = React.createContext(null)

const formReducer = (state, action) => {
  switch (action.type) {
    case "set_contact":
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload
        }
      }
    case "set_service":
      return {
        ...state,
        form: {
          ...state.form,
          service: action.payload
        }
      }
    case "set_budget":
      return {
        ...state,
        form: {
          ...state.form,
          budget: action.payload
        }
      }
    case "next_form":
      return {
        ...state,
        currentForm: state.currentForm + 1
      }
    case "prev_form":
      return {
        ...state,
        currentForm: state.currentForm - 1
      }
    default:
      return state;
  }
}

const appData = {
  data: {
    name: "Yunus",
    email: "yunus@gmail.com",
    phone: "0822126376",
    company: "anyth.inc",
    service: "",
    budget: ""
  },
  currentForm: 0,
  step: 0.5
}

// const Form = (props) => {
//   const { currentForm } = React.useContext(FormContext)
//   const dispatch = React.useContext(FormDispatchContext)
//   const handleNext = (e) => {
//     e.preventDefault()
//     dispatch({ type: "next_form" })
//   }
//   const handlePrev = () => { dispatch({ type: "prev_form" }) }
//   return (
//     <>
//       <form>
//         <div className="form-container">
//           <div className="progress-container">
//             <Progress step={currentForm === 0 ? 0.5 : currentForm === 1 ? 1.5 : currentForm === 2 ? 2.5 : 3} />
//           </div>
//           <hr className="form-divider" />
//           {props.children[currentForm]}
//         </div>
//         <div className="actions-container">
//           <div>
//             {currentForm > 0 && <button type="button" onClick={handlePrev} className="btn btn--outline">Previous Step</button>}
//           </div>
//           <div style={{ justifySelf: "end" }}>
//             {currentForm < props.children.length - 1 && <button type="submit" onClick={handleNext} className="btn btn--primary">Next Step</button>}
//           </div>
//         </div>
//       </form>
//     </>
//   )
// }

const Progress = (props) => {
  const fraction = Number(props.step) % 1
  const placeholderBars = []
  const bars = []
  const indicators = []
  let leftOffset = 52
  for (let i = 0; i < 3; i++) {
    placeholderBars.push(<div className="progress__bar progress__bar--placeholder" style={{
      left: (i == 0 ? i + 52 : i * 168 + 52)
    }
    } key={`$placeholder-${i}`}></div >)
  }

  for (let i = 0; i < props.step - fraction; i++) {
    bars.push(<div className="progress__bar" style={{
      left: (i == 0 ? i + 52 : i * 168 + 52)
    }
    } key={`$bar-${i}`}></div >)
    leftOffset += 98 + 70
  }

  if (fraction > 0 && props.step <= 3) {
    bars.push(<div className="progress__bar" style={{
      left: leftOffset,
      width: 0.5 * 98
    }
    } key={"bar-fraction"}></div >)
  }

  for (let i = 0; i < 4; i++) {
    indicators.push(<button className={`progress__indicator${i <= props.step - fraction ? " progress__indicator--primary" : ""}`} style={{ left: i * 168 }} key={`$indicator-${i}`}>{i + 1}</button>)
  }

  return (
    <div className="progress">
      {placeholderBars}
      {bars}
      {indicators}
    </div>
  )
}

const ContactForm = () => {
  const { data, currentForm } = React.useContext(FormContext)
  const dispatch = React.useContext(FormDispatchContext)
  React.useEffect(() => { console.log(data) })
  const nameRef = React.useRef(null)
  const emailRef = React.useRef(null)
  const phoneRef = React.useRef(null)
  const companyRef = React.useRef(null)
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({ type: "next_form" })
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="form-container">
        <div className="progress-container">
          <Progress step={currentForm === 0 ? 0.5 : currentForm === 1 ? 1.5 : currentForm === 2 ? 2.5 : 3} />
        </div>
        <hr className="form-divider" />
        <div className="form">
          <div className="form__header">
            <h2 className="display-3">Contact Details</h2>
            <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipisic.</p>
          </div>
          <div>
            <label className="form__label" htmlFor="name">Name</label>
            <TextInput type="text" ref={nameRef} icon={<PersonIcon />} placeholder={"Name"} defaultValue={data.name} />
          </div>
          <div>
            <label className="form__label" htmlFor="email">Email</label>
            <TextInput type="email" ref={emailRef} icon={<MailIcon />} placeholder={"Email"} defaultValue={data.email} />
          </div>
          <div>
            <label className="form__label" htmlFor="phone">Phone Number</label>
            <TextInput type="text" ref={phoneRef} icon={<PhoneIcon />} placeholder={"Phone Number"} defaultValue={data.phone} />
          </div>
          <div>
            <label className="form__label" htmlFor="company">Company</label>
            <TextInput type="text" ref={companyRef} icon={<BuildingIcon />} placeholder={"Company"} defaultValue={data.company} />
          </div>
        </div>
      </div>
      <div className="actions-container">
        <div>
          {currentForm > 0 && <button type="button" onClick={() => { dispatch({ type: "prev_form" }) }} className="btn btn--outline">Previous Step</button>}
        </div>
        <div style={{ justifySelf: "end" }}>
          {currentForm < 3 && <button type="submit" className="btn btn--primary">Next Step</button>}
        </div>
      </div>
    </form>
  )
}

const ServiceForm = () => {
  const dispatch = React.useContext(FormDispatchContext)
  const { currentForm } = React.useContext(FormContext)
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({ type: "next_form" })
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="form-container">
        <div className="progress-container">
          <Progress step={currentForm === 0 ? 0.5 : currentForm === 1 ? 1.5 : currentForm === 2 ? 2.5 : 3} />
        </div>
        <hr className="form-divider" />
        <div className="radio-group">
          <div className="form__header">
            <h2>Our Services</h2>
            <p>Please select which service you are interested in.</p>
          </div>
          <div className="radio-group__item">
            <input type="radio" className="radio-group--dnone" name="services" id="development" defaultChecked />
            <label className="radio-group__control" htmlFor="development">
              <DevelopmentIcon />
              Development
            </label>
          </div>
          <div className="radio-group__item">
            <input type="radio" className="radio-group--dnone" name="services" id="design" />
            <label className="radio-group__control" htmlFor="design">
              <DesignIcon />
              Design
            </label>
          </div>
          <div className="radio-group__item">
            <input type="radio" className="radio-group--dnone" name="services" id="marketing" />
            <label className="radio-group__control" htmlFor="marketing">
              <MarketingIcon />
              Marketing
            </label>
          </div>
          <div className="radio-group__item">
            <input type="radio" className="radio-group--dnone" name="services" id="other" />
            <label className="radio-group__control" htmlFor="other">
              <DevelopmentIcon />
              Other
            </label>
          </div>
        </div>
      </div>
      <div className="actions-container">
        <div>
          {currentForm > 0 && <button type="button" onClick={() => { dispatch({ type: "prev_form" }) }} className="btn btn--outline">Previous Step</button>}
        </div>
        <div style={{ justifySelf: "end" }}>
          {currentForm < 3 && <button type="submit" className="btn btn--primary">Next Step</button>}
        </div>
      </div>
    </form>
  )
}

const BudgetForm = () => {
  const dispatch = React.useContext(FormDispatchContext)
  const { currentForm } = React.useContext(FormContext)
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({ type: "next_form" })
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="form-container">
        <div className="progress-container">
          <Progress step={currentForm === 0 ? 0.5 : currentForm === 1 ? 1.5 : currentForm === 2 ? 2.5 : 3} />
        </div>
        <hr className="form-divider" />
        <div className="radio-group">
          <div className="form__header">
            <h2>What's your budget?</h2>
            <p>Please select the project budget you have in mind.</p>
          </div>
          <div className="radio-group__item">
            <input type="radio" className="radio-group__radio" name="budget" id="choice1" value="5000" />
            <label className="radio-group__control-budget" htmlFor="choice1">
              $5.000 - $10.000
            </label>
          </div>
          <div className="radio-group__item">
            <input type="radio" className="radio-group__radio" name="budget" id="choice2" value="10000" />
            <label className="radio-group__control-budget" htmlFor="choice2">
              $10.000 - $20.000
            </label>
          </div>
          <div className="radio-group__item">
            <input type="radio" className="radio-group__radio" name="budget" id="choice3" value="20000" />
            <label className="radio-group__control-budget" htmlFor="choice3">
              $20.000 - $50.000
            </label>
          </div>
          <div className="radio-group__item">
            <input type="radio" className="radio-group__radio" name="budget" id="choice4" value="50000" defaultChecked />
            <label className="radio-group__control-budget" htmlFor="choice4">
              $50.000 +
            </label>
          </div>
        </div>
      </div>
      <div className="actions-container">
        <div>
          {currentForm > 0 && <button type="button" onClick={() => { dispatch({ type: "prev_form" }) }} className="btn btn--outline">Previous Step</button>}
        </div>
        <div style={{ justifySelf: "end" }}>
          {currentForm < 3 && <button type="submit" className="btn btn--primary">Next Step</button>}
        </div>
      </div>
    </form>

  )
}

const SubmitForm = () => {
  const { currentForm } = React.useContext(FormContext)
  const dispatch = React.useContext(FormDispatchContext)
  return (
    <form onSubmit={() => { }}>
      <div className="form-container">
        <div className="progress-container">
          <Progress step={currentForm === 0 ? 0.5 : currentForm === 1 ? 1.5 : currentForm === 2 ? 2.5 : 3} />
        </div>
        <hr className="form-divider" />
        <div className="submit-form">
          <img src="assets/Group37301.png" alt="" />
          <h2 className="display-3 text-center">Submit your quote request</h2>
          <p className="text-base text-center">Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 - 48 hours.</p>
          <button className="btn btn--primary">Submit</button>
        </div>
      </div>
      <div className="actions-container">
        <div>
          {currentForm > 0 && <button type="button" onClick={() => { dispatch({ type: "prev_form" }) }} className="btn btn--outline">Previous Step</button>}
        </div>
        <div style={{ justifySelf: "end" }}>
          {currentForm < 3 && <button type="submit" className="btn btn--primary">Next Step</button>}
        </div>
      </div>
    </form>


    // <div className="submit-form">
    //   <img src="assets/Group37301.png" alt="" />
    //   <h2 className="display-3 text-center">Submit your quote request</h2>
    //   <p className="text-base text-center">Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 - 48 hours.</p>
    //   <button className="btn btn--primary">Submit</button>
    // </div>
  )
}

const TextInput = React.forwardRef((props, ref) => {
  return (
    <div className="text-input">
      <input className="text-input__field" ref={ref} type={props.type} placeholder={props.placeholder} defaultValue={props.defaultValue} />
      {props.icon}
    </div >
  )
})

const PersonIcon = () => {
  return (
    <svg width="23" height="29" viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5629 14.2939C15.0647 14.2939 17.9034 11.4552 17.9034 7.95337C17.9034 4.45156 15.0647 1.61279 11.5629 1.61279C8.06106 1.61279 5.22229 4.45156 5.22229 7.95337C5.22229 11.4552 8.06106 14.2939 11.5629 14.2939Z" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.41797 27.4384C1.41797 24.7478 2.4868 22.1674 4.38935 20.2648C6.29189 18.3623 8.87229 17.2935 11.5629 17.2935C14.2535 17.2935 16.8339 18.3623 18.7364 20.2648C20.639 22.1674 21.7078 24.7478 21.7078 27.4384" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const MailIcon = () => {
  return (
    <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.9883 1.52588H2.98828C1.88371 1.52588 0.988281 2.42131 0.988281 3.52588V15.5259C0.988281 16.6304 1.88371 17.5259 2.98828 17.5259H21.9883C23.0929 17.5259 23.9883 16.6304 23.9883 15.5259V3.52588C23.9883 2.42131 23.0929 1.52588 21.9883 1.52588Z" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.3993 2.10791L12.4883 11.0259L1.57727 2.10791" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const PhoneIcon = () => {
  return (
    <svg width="17" height="29" viewBox="0 0 17 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2434 1.51172H3.06946C1.82082 1.51172 0.808594 2.52394 0.808594 3.77259V25.2508C0.808594 26.4995 1.82082 27.5117 3.06946 27.5117H13.2434C14.492 27.5117 15.5042 26.4995 15.5042 25.2508V3.77259C15.5042 2.52394 14.492 1.51172 13.2434 1.51172Z" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.8595 1.51172V2.99295C11.8595 3.38579 11.7035 3.76255 11.4257 4.04033C11.1479 4.31812 10.7711 4.47418 10.3783 4.47418H5.9346C5.54175 4.47418 5.165 4.31812 4.88721 4.04033C4.60943 3.76255 4.45337 3.38579 4.45337 2.99295V1.51172" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const BuildingIcon = () => {
  return (
    <svg width="17" height="32" viewBox="0 0 17 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.399 30.5116V6.86729C15.3989 6.6139 15.3191 6.36696 15.171 6.16138C15.0229 5.9558 14.8139 5.80198 14.5736 5.72168L2.50606 1.69918C2.32461 1.63837 2.13128 1.62165 1.94208 1.65039C1.75289 1.67914 1.57325 1.75253 1.41805 1.86449C1.26285 1.97644 1.13654 2.12375 1.04958 2.29422C0.962622 2.46469 0.917507 2.65342 0.917972 2.84479V30.5116" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5703 22.8916V24.0984" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5703 16.8579V18.0647" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5703 10.8242V12.031" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.74609 22.8916V24.0984" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.74609 16.8579V18.0647" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.74609 10.8242V12.031" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}

const DevelopmentIcon = () => (
  <svg width="67" height="68" viewBox="0 0 67 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle opacity="0.15" cx="33.4498" cy="34.0142" r="33.3209" fill="#4A3AFF" />
    <g filter="url(#filter0_d_901_14026)">
      <rect x="17.3711" y="19.4873" width="32.1799" height="29.3527" rx="1" fill="white" />
    </g>
    <rect x="16.1469" y="19.4873" width="34.0457" height="28.1681" fill="white" />
    <rect x="21.3148" y="27.9443" width="23.7094" height="5.66188" rx="0.680278" fill="#4A3AFF" />
    <rect x="21.3148" y="36.3774" width="10.8407" height="7.31969" rx="0.680278" fill="#4A3AFF" />
    <rect x="34.1839" y="36.3774" width="10.8407" height="2.30835" rx="0.680278" fill="#4A3AFF" />
    <rect x="34.1839" y="41.3892" width="10.8407" height="2.30835" rx="0.680278" fill="#4A3AFF" />
    <path d="M14.7182 45.3312C14.7182 46.5732 15.2116 47.7643 16.0898 48.6426C16.968 49.5208 18.1591 50.0142 19.4011 50.0142H47.4987C48.7407 50.0142 49.9318 49.5208 50.81 48.6426C51.6882 47.7643 52.1816 46.5732 52.1816 45.3312V22.6971C52.1816 21.4551 51.6882 20.264 50.81 19.3858C49.9318 18.5075 48.7407 18.0142 47.4987 18.0142H19.4011C18.1591 18.0142 16.968 18.5075 16.0898 19.3858C15.2116 20.264 14.7182 21.4551 14.7182 22.6971V45.3312ZM37.3523 21.9166C37.3451 22.1938 37.2619 22.4638 37.112 22.6971C36.9817 22.9333 36.7905 23.1303 36.5582 23.2675C36.326 23.4047 36.0611 23.4771 35.7914 23.4771C35.5216 23.4771 35.2568 23.4047 35.0245 23.2675C34.7922 23.1303 34.601 22.9333 34.4708 22.6971C34.3208 22.4638 34.2377 22.1938 34.2304 21.9166C34.2374 21.6393 34.3206 21.3693 34.4708 21.1361C34.601 20.8999 34.7922 20.7029 35.0245 20.5657C35.2568 20.4285 35.5216 20.3561 35.7914 20.3561C36.0611 20.3561 36.326 20.4285 36.5582 20.5657C36.7905 20.7029 36.9817 20.8999 37.112 21.1361C37.2621 21.3693 37.3453 21.6393 37.3523 21.9166ZM42.8158 21.9166C42.8085 22.1938 42.7253 22.4638 42.5754 22.6971C42.4452 22.9333 42.2539 23.1303 42.0217 23.2675C41.7894 23.4047 41.5246 23.4771 41.2548 23.4771C40.985 23.4771 40.7202 23.4047 40.4879 23.2675C40.2556 23.1303 40.0644 22.9333 39.9342 22.6971C39.7842 22.4638 39.7011 22.1938 39.6938 21.9166C39.7009 21.6393 39.784 21.3693 39.9342 21.1361C40.0644 20.8999 40.2556 20.7029 40.4879 20.5657C40.7202 20.4285 40.985 20.3561 41.2548 20.3561C41.5246 20.3561 41.7894 20.4285 42.0217 20.5657C42.2539 20.7029 42.4452 20.8999 42.5754 21.1361C42.7255 21.3693 42.8087 21.6393 42.8158 21.9166ZM48.2792 21.9166C48.2719 22.1938 48.1887 22.4638 48.0388 22.6971C47.9086 22.9333 47.7173 23.1303 47.4851 23.2675C47.2528 23.4047 46.988 23.4771 46.7182 23.4771C46.4484 23.4771 46.1836 23.4047 45.9513 23.2675C45.7191 23.1303 45.5278 22.9333 45.3976 22.6971C45.2477 22.4638 45.1645 22.1938 45.1572 21.9166C45.1643 21.6393 45.2474 21.3693 45.3976 21.1361C45.5299 20.9016 45.7216 20.706 45.9534 20.569C46.1852 20.432 46.449 20.3584 46.7182 20.3556C47.0181 20.357 47.3113 20.4447 47.5626 20.6083C47.814 20.7719 48.0129 21.0045 48.1356 21.2782C48.2286 21.4782 48.2776 21.696 48.2792 21.9166ZM17.8402 26.2077C17.8402 26.1042 17.8813 26.005 17.9545 25.9318C18.0276 25.8586 18.1269 25.8175 18.2304 25.8175H48.6694C48.7729 25.8175 48.8722 25.8586 48.9454 25.9318C49.0185 26.005 49.0597 26.1042 49.0597 26.2077V45.3297C49.0597 45.7437 48.8952 46.1407 48.6025 46.4335C48.3097 46.7262 47.9127 46.8906 47.4987 46.8906H19.4011C18.9871 46.8906 18.5901 46.7262 18.2974 46.4335C18.0046 46.1407 17.8402 45.7437 17.8402 45.3297V26.2077Z" fill="#4A3AFF" />
    <defs>
      <filter id="filter0_d_901_14026" x="7.37109" y="9.4873" width="52.1799" height="49.3525" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.290196 0 0 0 0 0.227451 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_901_14026" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_901_14026" result="shape" />
      </filter>
    </defs>
  </svg>
)

const DesignIcon = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle opacity="0.15" cx="34.1314" cy="33.9225" r="33.3209" fill="#4A3AFF" />
    <g filter="url(#filter0_d_2203_6)">
      <rect x="17.25" y="20.6548" width="33.6238" height="26.9089" rx="1" fill="white" />
    </g>
    <rect x="16.8281" y="19.3955" width="34.0457" height="28.1681" fill="white" />
    <path d="M15.3984 45.2394C15.3984 46.4814 15.8918 47.6725 16.77 48.5508C17.6483 49.429 18.8394 49.9224 20.0814 49.9224H48.1789C49.4209 49.9224 50.612 49.429 51.4903 48.5508C52.3685 47.6725 52.8619 46.4814 52.8619 45.2394V22.6053C52.8619 21.3633 52.3685 20.1722 51.4903 19.294C50.612 18.4157 49.4209 17.9224 48.1789 17.9224H20.0814C18.8394 17.9224 17.6483 18.4157 16.77 19.294C15.8918 20.1722 15.3984 21.3633 15.3984 22.6053V45.2394ZM38.0326 21.8248C38.0253 22.102 37.9421 22.372 37.7922 22.6053C37.662 22.8415 37.4708 23.0385 37.2385 23.1757C37.0062 23.3129 36.7414 23.3853 36.4716 23.3853C36.2018 23.3853 35.937 23.3129 35.7047 23.1757C35.4725 23.0385 35.2812 22.8415 35.151 22.6053C35.0011 22.372 34.9179 22.102 34.9106 21.8248C34.9177 21.5475 35.0008 21.2775 35.151 21.0443C35.2812 20.8081 35.4725 20.6111 35.7047 20.4739C35.937 20.3367 36.2018 20.2643 36.4716 20.2643C36.7414 20.2643 37.0062 20.3367 37.2385 20.4739C37.4708 20.6111 37.662 20.8081 37.7922 21.0443C37.9424 21.2775 38.0255 21.5475 38.0326 21.8248ZM43.496 21.8248C43.4887 22.102 43.4056 22.372 43.2556 22.6053C43.1254 22.8415 42.9342 23.0385 42.7019 23.1757C42.4696 23.3129 42.2048 23.3853 41.935 23.3853C41.6653 23.3853 41.4004 23.3129 41.1681 23.1757C40.9359 23.0385 40.7447 22.8415 40.6144 22.6053C40.4645 22.372 40.3813 22.102 40.374 21.8248C40.3811 21.5475 40.4643 21.2775 40.6144 21.0443C40.7447 20.8081 40.9359 20.6111 41.1681 20.4739C41.4004 20.3367 41.6653 20.2643 41.935 20.2643C42.2048 20.2643 42.4696 20.3367 42.7019 20.4739C42.9342 20.6111 43.1254 20.8081 43.2556 21.0443C43.4058 21.2775 43.4889 21.5475 43.496 21.8248ZM48.9594 21.8248C48.9521 22.102 48.869 22.372 48.719 22.6053C48.5888 22.8415 48.3976 23.0385 48.1653 23.1757C47.933 23.3129 47.6682 23.3853 47.3984 23.3853C47.1287 23.3853 46.8638 23.3129 46.6316 23.1757C46.3993 23.0385 46.2081 22.8415 46.0779 22.6053C45.9279 22.372 45.8448 22.102 45.8375 21.8248C45.8445 21.5475 45.9277 21.2775 46.0779 21.0443C46.2101 20.8098 46.4018 20.6142 46.6336 20.4772C46.8654 20.3402 47.1292 20.2666 47.3984 20.2638C47.6983 20.2652 47.9915 20.3529 48.2429 20.5165C48.4942 20.6801 48.6931 20.9127 48.8158 21.1864C48.9088 21.3864 48.9578 21.6042 48.9594 21.8248ZM18.5204 26.1159C18.5204 26.0124 18.5615 25.9132 18.6347 25.84C18.7079 25.7668 18.8071 25.7257 18.9106 25.7257H49.3497C49.4532 25.7257 49.5524 25.7668 49.6256 25.84C49.6988 25.9132 49.7399 26.0124 49.7399 26.1159V45.2379C49.7399 45.6519 49.5754 46.0489 49.2827 46.3417C48.99 46.6344 48.5929 46.7989 48.1789 46.7989H20.0814C19.6674 46.7989 19.2703 46.6344 18.9776 46.3417C18.6848 46.0489 18.5204 45.6519 18.5204 45.2379V26.1159Z" fill="#4A3AFF" />
    <path d="M26.0013 40.88C26.294 41.1726 26.691 41.337 27.1049 41.337C27.5188 41.337 27.9158 41.1726 28.2085 40.88L32.111 36.9775C32.4036 36.6848 32.568 36.2878 32.568 35.8739C32.568 35.46 32.4036 35.063 32.111 34.7703L28.2085 30.8679C27.9141 30.5835 27.5198 30.4262 27.1105 30.4297C26.7013 30.4333 26.3097 30.5975 26.0203 30.8869C25.7309 31.1763 25.5667 31.5678 25.5632 31.9771C25.5596 32.3864 25.717 32.7807 26.0013 33.0751L28.5239 35.5976C28.5602 35.6339 28.589 35.6769 28.6087 35.7244C28.6284 35.7718 28.6385 35.8226 28.6385 35.8739C28.6385 35.9253 28.6284 35.9761 28.6087 36.0235C28.589 36.0709 28.5602 36.114 28.5239 36.1502L26.0013 38.6727C25.7087 38.9655 25.5443 39.3624 25.5443 39.7764C25.5443 40.1903 25.7087 40.5872 26.0013 40.88Z" fill="#4A3AFF" />
    <path d="M35.6912 41.3373H41.9351C42.3491 41.3373 42.7461 41.1728 43.0389 40.8801C43.3316 40.5873 43.4961 40.1903 43.4961 39.7763C43.4961 39.3623 43.3316 38.9653 43.0389 38.6725C42.7461 38.3798 42.3491 38.2153 41.9351 38.2153H35.6912C35.2772 38.2153 34.8802 38.3798 34.5874 38.6725C34.2947 38.9653 34.1302 39.3623 34.1302 39.7763C34.1302 40.1903 34.2947 40.5873 34.5874 40.8801C34.8802 41.1728 35.2772 41.3373 35.6912 41.3373Z" fill="#4A3AFF" />
    <defs>
      <filter id="filter0_d_2203_6" x="7.25" y="10.6548" width="53.6238" height="46.9087" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.290196 0 0 0 0 0.227451 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2203_6" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2203_6" result="shape" />
      </filter>
    </defs>
  </svg>
)

const MarketingIcon = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle opacity="0.15" cx="34.1314" cy="34.2262" r="33.3209" fill="#4A3AFF" />
    <g filter="url(#filter0_d_2203_5)">
      <path d="M19.2891 30.055L43.2529 23.2773V44.5787L19.7728 37.1354L19.2891 30.055Z" fill="#E4E2FF" />
    </g>
    <path d="M50.7257 32.6414C50.7194 31.5442 50.3752 30.4755 49.7399 29.5809C49.1047 28.6863 48.2092 28.0091 47.1753 27.6415C46.9736 27.5686 46.7573 27.5454 46.5446 27.5738C46.332 27.6022 46.1294 27.6815 45.9539 27.8048C45.7784 27.9282 45.6353 28.092 45.5365 28.2825C45.4378 28.4729 45.3864 28.6843 45.3868 28.8988L45.4055 39.1069C45.406 39.3209 45.458 39.5317 45.5571 39.7214C45.6561 39.9112 45.7994 40.0743 45.9748 40.1971C46.1501 40.3198 46.3525 40.3986 46.5646 40.4268C46.7768 40.4549 46.9927 40.4316 47.194 40.3588C48.2299 39.9862 49.1253 39.3024 49.7576 38.4011C50.3898 37.4998 50.7279 36.4251 50.7257 35.3242V32.6414Z" fill="#4A3AFF" />
    <path d="M44.2618 21.2444C44.2618 20.9144 44.1307 20.5978 43.8974 20.3645C43.664 20.1311 43.3475 20 43.0175 20C42.6874 20 42.3709 20.1311 42.1375 20.3645C41.9042 20.5978 41.7731 20.9144 41.7731 21.2444V22.2075L19.1824 29.5009C19.0572 29.5414 18.9481 29.6206 18.8708 29.727C18.7934 29.8335 18.7518 29.9617 18.7519 30.0932V37.5061C18.7519 37.6385 18.7941 37.7674 18.8724 37.8742C18.9507 37.9809 19.0611 38.0599 19.1874 38.0996L20.8051 38.6074C20.9314 38.6471 21.0418 38.7261 21.1201 38.8328C21.1984 38.9396 21.2406 39.0685 21.2406 39.2009V42.4251C21.2489 43.9055 21.8423 45.3224 22.8913 46.3669C23.9404 47.4113 25.36 47.9984 26.8404 48H26.8665C28.3503 47.9914 29.7702 47.395 30.8149 46.3414C31.8597 45.2877 32.4441 43.8629 32.4401 42.3791V42.2547L41.7731 45.179V46.1322C41.7731 46.4622 41.9042 46.7787 42.1375 47.0121C42.3709 47.2455 42.6874 47.3766 43.0175 47.3766C43.3475 47.3766 43.664 47.2455 43.8974 47.0121C44.1307 46.7787 44.2618 46.4622 44.2618 46.1322V21.2444ZM29.9514 42.3853C29.9533 42.7939 29.8748 43.1988 29.7203 43.577C29.5658 43.9552 29.3382 44.2992 29.0508 44.5895C28.7633 44.8798 28.4214 45.1106 28.0447 45.2687C27.668 45.4269 27.2639 45.5093 26.8553 45.5112H26.8404C26.0187 45.5112 25.2305 45.1862 24.6476 44.6071C24.0648 44.028 23.7347 43.2418 23.7294 42.4202V40.3706C23.7294 40.273 23.7524 40.1766 23.7966 40.0895C23.8407 40.0023 23.9047 39.9268 23.9835 39.869C24.0623 39.8112 24.1535 39.7728 24.2499 39.7568C24.3463 39.7408 24.4451 39.7478 24.5383 39.7771L29.5158 41.3375C29.6421 41.3773 29.7525 41.4562 29.8308 41.563C29.9091 41.6697 29.9514 41.7987 29.9514 41.9311V42.3853Z" fill="#4A3AFF" />
    <path d="M18.7508 29.5187C18.7508 29.1845 18.6059 28.8641 18.348 28.6278C18.09 28.3915 17.7402 28.2588 17.3754 28.2588C17.0106 28.2588 16.6608 28.3915 16.4028 28.6278C16.1449 28.8641 16 29.1845 16 29.5187L16.0069 38.3378C16.0069 38.5033 16.0425 38.6671 16.1116 38.82C16.1807 38.9728 16.282 39.1117 16.4097 39.2287C16.5374 39.3457 16.6891 39.4385 16.8559 39.5018C17.0228 39.5651 17.2017 39.5977 17.3823 39.5977H17.3754C17.7345 39.5978 18.0795 39.4692 18.3365 39.2394C18.5935 39.0097 18.7422 38.6969 18.7508 38.3681V29.5187Z" fill="white" />
    <defs>
      <filter id="filter0_d_2203_5" x="4.28906" y="8.27734" width="53.9638" height="51.3013" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="7.5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.290196 0 0 0 0 0.227451 0 0 0 0 1 0 0 0 0.6 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2203_5" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2203_5" result="shape" />
      </filter>
    </defs>
  </svg>
)

const SettingIcon = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle opacity="0.15" cx="33.9498" cy="34.2262" r="33.3209" fill="#4A3AFF" />
    <g filter="url(#filter0_d_2203_3)">
      <rect x="21.9746" y="21.2275" width="25.0655" height="26.7152" rx="12.5328" fill="white" />
    </g>
    <circle cx="34.0665" cy="33.9823" r="8.78843" fill="white" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M51.3246 37.4935C52.0642 37.8864 52.6348 38.5067 53.0363 39.1271C53.8182 40.4092 53.7548 41.9807 52.994 43.3662L51.5148 45.8476C50.7329 47.171 49.2747 47.9981 47.7743 47.9981C47.0347 47.9981 46.2105 47.7914 45.5343 47.3778C44.9848 47.0263 44.3509 46.9022 43.6746 46.9022C41.5825 46.9022 39.8285 48.6185 39.7651 50.6657C39.7651 53.0437 37.8209 54.9048 35.3907 54.9048H32.5167C30.0653 54.9048 28.1211 53.0437 28.1211 50.6657C28.0788 48.6185 26.3248 46.9022 24.2327 46.9022C23.5353 46.9022 22.9014 47.0263 22.3731 47.3778C21.6968 47.7914 20.8515 47.9981 20.133 47.9981C18.6115 47.9981 17.1533 47.171 16.3714 45.8476L14.9133 43.3662C14.1314 42.0221 14.0891 40.4092 14.871 39.1271C15.2091 38.5067 15.8431 37.8864 16.5616 37.4935C17.1533 37.204 17.5337 36.7284 17.893 36.1701C18.9496 34.3917 18.3156 32.0551 16.5194 31.0005C14.4272 29.8218 13.751 27.1956 14.9556 25.1485L16.3714 22.7084C17.5971 20.6612 20.2175 19.9375 22.3308 21.1368C24.1693 22.1294 26.5573 21.4677 27.635 19.71C27.9732 19.131 28.1634 18.5107 28.1211 17.8903C28.0788 17.0839 28.3113 16.3188 28.7128 15.6984C29.4947 14.4163 30.9106 13.5892 32.4533 13.5479H35.4329C36.9967 13.5479 38.4126 14.4163 39.1945 15.6984C39.5749 16.3188 39.8285 17.0839 39.7651 17.8903C39.7228 18.5107 39.913 19.131 40.2512 19.71C41.3289 21.4677 43.7169 22.1294 45.5765 21.1368C47.6687 19.9375 50.3102 20.6612 51.5148 22.7084L52.9306 25.1485C54.1563 27.1956 53.4801 29.8218 51.3668 31.0005C49.5706 32.0551 48.9366 34.3917 50.0144 36.1701C50.3525 36.7284 50.7329 37.204 51.3246 37.4935ZM27.974 34.2465C27.974 37.493 30.6578 40.0778 33.9756 40.0778C37.2934 40.0778 39.9138 37.493 39.9138 34.2465C39.9138 31 37.2934 28.3945 33.9756 28.3945C30.6578 28.3945 27.974 31 27.974 34.2465Z" fill="#4A3AFF" />
    <defs>
      <filter id="filter0_d_2203_3" x="6.97461" y="6.22754" width="55.0656" height="56.7153" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="7.5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.290196 0 0 0 0 0.227451 0 0 0 0 1 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2203_3" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2203_3" result="shape" />
      </filter>
    </defs>
  </svg>
)

const Form = (props) => {
  const { currentForm } = React.useContext(FormContext)
  // const dispatch = React.useContext(FormDispatchContext)
  return (
    <main className="container">
      <section className="heading">
        <h1 className="display-2 text-center">Get a project quote</h1>
        <p className="text-base text-center">Please fill the form below to receive a quote for your project. Feel<br /> free to add as much detail as needed.</p>
      </section>
      <section>
        {props.children[currentForm]}
      </section>
    </main>
  )
}

const App = () => {
  const [data, dispatch] = React.useReducer(formReducer, appData)
  return (
    <FormContext.Provider value={data} >
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
}

ReactDOM.render(<App />, document.querySelector("#root"))