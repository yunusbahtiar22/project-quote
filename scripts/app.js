const FormContext = React.createContext(null)
const FormDispatchContext = React.createContext(null)

function App() {
  return (
    <FormContext.Provider>
      <FormDispatchContext.Provider>
        <Main />
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
}

function Main() {
  return (
    <main>
      <section className="hero container--hero">
        <h1 className="hero__heading text-center">Get a project quote</h1>
        <p className="hero__text text-center">Please fill the form below to receive a quote for your project. Feel<br /> free to add as much detail as needed.</p>
      </section>
      <section>
        <FormContainer>
          <ContactForm />
          <ServiceForm />
          <BudgetForm />
        </FormContainer>
      </section>
    </main>
  )
}

function FormContainer({ children }) {
  return (
    <>
      <div className="container container--form">
        <div className="container container--progress">
          <Progress percentage={1.5} />
        </div>
        <hr className="form-divider" />
        {children[2]}
      </div>
      <div className="container container--actions">
        <button className="action-button action-button--prev">Previous Step</button>
        <button className="action-button action-button--next">Next Step</button>
      </div>
    </>
  )
}

function Progress({ percentage }) {
  const fraction = Number(percentage) % 1
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

  for (let i = 0; i < percentage - fraction; i++) {
    bars.push(<div className="progress__bar" style={{
      left: (i == 0 ? i + 52 : i * 168 + 52)
    }
    } key={`$bar-${i}`}></div >)
    leftOffset += 98 + 70
  }

  if (fraction > 0 && percentage <= 3) {
    bars.push(<div className="progress__bar" style={{
      left: leftOffset,
      width: 0.5 * 98
    }
    } key={"bar-fraction"}></div >)
  }

  for (let i = 0; i < 4; i++) {
    indicators.push(<button className={`progress__indicator${i <= percentage - fraction ? " progress__indicator--primary" : ""}`} style={{ left: i * 168 }} key={`$indicator-${i}`}>{i + 1}</button>)
  }

  return (
    <div className="progress">
      {placeholderBars}
      {bars}
      {indicators}
    </div>
  )
}

function ContactForm() {
  return (
    <form className="form">
      <div className="form__header">
        <h2>Contact Details</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisic.</p>
      </div>
      <div>
        <label className="form__label" htmlFor="name">Name</label>
        <TextInput icon={<PersonIcon />} placeholder={"Name"} />
      </div>
      <div>
        <label className="form__label" htmlFor="email">Email</label>
        <TextInput icon={<MailIcon />} placeholder={"Email"} />
      </div>
      <div>
        <label className="form__label" htmlFor="phone">Phone Number</label>
        <TextInput icon={<PhoneIcon />} placeholder={"Phone Number"} />
      </div>
      <div>
        <label className="form__label" htmlFor="company">Company</label>
        <TextInput icon={<BuildingIcon />} placeholder={"Company"} />
      </div>
    </form>
  )
}

function ServiceForm() {
  return (
    <form className="radio-group">
      <div className="form__header">
        <h2>Our Services</h2>
        <p>Please select which service you are interested in.</p>
      </div>
      <label className="radio-group__control radio-group__control--icon" htmlFor="development">
        <input type="radio" className="radio-group__invisible-radio" name="services" id="development" />
        <div className="icon-container">
          <svg width="38" height="33" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.359375 28.1379C0.359375 29.3799 0.852753 30.571 1.73097 31.4492C2.60919 32.3274 3.80031 32.8208 5.0423 32.8208H33.1399C34.3819 32.8208 35.573 32.3274 36.4512 31.4492C37.3294 30.571 37.8228 29.3799 37.8228 28.1379V5.50373C37.8228 4.26174 37.3294 3.07062 36.4512 2.1924C35.573 1.31418 34.3819 0.820801 33.1399 0.820801H5.0423C3.80031 0.820801 2.60919 1.31418 1.73097 2.1924C0.852753 3.07062 0.359375 4.26174 0.359375 5.50373L0.359375 28.1379ZM22.9935 4.72324C22.9862 5.00048 22.9031 5.27042 22.7531 5.50373C22.6229 5.73998 22.4317 5.93698 22.1994 6.07417C21.9671 6.21137 21.7023 6.28374 21.4325 6.28374C21.1628 6.28374 20.8979 6.21137 20.6657 6.07417C20.4334 5.93698 20.2422 5.73998 20.112 5.50373C19.962 5.27042 19.8789 5.00048 19.8716 4.72324C19.8786 4.44596 19.9618 4.17595 20.112 3.94275C20.2422 3.7065 20.4334 3.5095 20.6657 3.37231C20.8979 3.23511 21.1628 3.16274 21.4325 3.16274C21.7023 3.16274 21.9671 3.23511 22.1994 3.37231C22.4317 3.5095 22.6229 3.7065 22.7531 3.94275C22.9033 4.17595 22.9865 4.44596 22.9935 4.72324V4.72324ZM28.4569 4.72324C28.4496 5.00048 28.3665 5.27042 28.2165 5.50373C28.0863 5.73998 27.8951 5.93698 27.6628 6.07417C27.4306 6.21137 27.1657 6.28374 26.896 6.28374C26.6262 6.28374 26.3614 6.21137 26.1291 6.07417C25.8968 5.93698 25.7056 5.73998 25.5754 5.50373C25.4254 5.27042 25.3423 5.00048 25.335 4.72324C25.342 4.44596 25.4252 4.17595 25.5754 3.94275C25.7056 3.7065 25.8968 3.5095 26.1291 3.37231C26.3614 3.23511 26.6262 3.16274 26.896 3.16274C27.1657 3.16274 27.4306 3.23511 27.6628 3.37231C27.8951 3.5095 28.0863 3.7065 28.2165 3.94275C28.3667 4.17595 28.4499 4.44596 28.4569 4.72324V4.72324ZM33.9203 4.72324C33.9131 5.00048 33.8299 5.27042 33.68 5.50373C33.5497 5.73998 33.3585 5.93698 33.1262 6.07417C32.894 6.21137 32.6291 6.28374 32.3594 6.28374C32.0896 6.28374 31.8248 6.21137 31.5925 6.07417C31.3602 5.93698 31.169 5.73998 31.0388 5.50373C30.8888 5.27042 30.8057 5.00048 30.7984 4.72324C30.8055 4.44596 30.8886 4.17595 31.0388 3.94275C31.1711 3.70823 31.3627 3.51264 31.5946 3.37564C31.8264 3.23864 32.0901 3.16505 32.3594 3.16226C32.6593 3.16363 32.9525 3.25136 33.2038 3.41496C33.4552 3.57857 33.6541 3.81112 33.7767 4.0848C33.8698 4.28488 33.9187 4.5026 33.9203 4.72324V4.72324ZM3.48133 9.01436C3.48133 8.91086 3.52244 8.8116 3.59563 8.73842C3.66881 8.66523 3.76807 8.62412 3.87157 8.62412H34.3106C34.4141 8.62412 34.5134 8.66523 34.5865 8.73842C34.6597 8.8116 34.7008 8.91086 34.7008 9.01436V28.1363C34.7008 28.5503 34.5364 28.9474 34.2436 29.2401C33.9509 29.5328 33.5539 29.6973 33.1399 29.6973H5.0423C4.62831 29.6973 4.23126 29.5328 3.93853 29.2401C3.64579 28.9474 3.48133 28.5503 3.48133 28.1363V9.01436Z" fill="#4A3AFF" />
            <path d="M10.9623 23.7784C11.255 24.071 11.6519 24.2354 12.0659 24.2354C12.4798 24.2354 12.8767 24.071 13.1695 23.7784L17.0719 19.876C17.3645 19.5832 17.5289 19.1863 17.5289 18.7724C17.5289 18.3584 17.3645 17.9615 17.0719 17.6687L13.1695 13.7663C12.8751 13.482 12.4808 13.3246 12.0715 13.3282C11.6622 13.3317 11.2707 13.4959 10.9813 13.7853C10.6918 14.0747 10.5277 14.4663 10.5241 14.8755C10.5206 15.2848 10.6779 15.6791 10.9623 15.9735L13.4848 18.4961C13.5211 18.5323 13.55 18.5754 13.5696 18.6228C13.5893 18.6702 13.5994 18.721 13.5994 18.7724C13.5994 18.8237 13.5893 18.8745 13.5696 18.9219C13.55 18.9693 13.5211 19.0124 13.4848 19.0487L10.9623 21.5712C10.6696 21.8639 10.5052 22.2609 10.5052 22.6748C10.5052 23.0887 10.6696 23.4857 10.9623 23.7784V23.7784Z" fill="#4A3AFF" />
            <path d="M20.6521 24.2357H26.896C27.31 24.2357 27.7071 24.0713 27.9998 23.7785C28.2926 23.4858 28.457 23.0887 28.457 22.6747C28.457 22.2607 28.2926 21.8637 27.9998 21.571C27.7071 21.2782 27.31 21.1138 26.896 21.1138H20.6521C20.2381 21.1138 19.8411 21.2782 19.5484 21.571C19.2556 21.8637 19.0912 22.2607 19.0912 22.6747C19.0912 23.0887 19.2556 23.4858 19.5484 23.7785C19.8411 24.0713 20.2381 24.2357 20.6521 24.2357V24.2357Z" fill="#4A3AFF" />
          </svg>
        </div>
        Development
      </label>
      <label className="radio-group__control radio-group__control--icon" htmlFor="design">
        <input type="radio" className="radio-group__invisible-radio" name="services" id="design" />
        <div className="icon-container">
          <svg width="39" height="33" viewBox="0 0 39 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="39" height="33" fill="#E5E5E5" />
            <rect width="1440" height="1343" transform="translate(-767 -664)" fill="white" />
            <g filter="url(#filter0_d_1_5)">
              <rect x="-396.297" y="-315.102" width="698" height="606" rx="34" fill="white" />
              <rect x="-395.797" y="-314.602" width="697" height="605" rx="33.5" stroke="#EFF0F7" />
            </g>
            <g filter="url(#filter1_d_1_5)">
              <rect x="-37.9099" y="-40.4741" width="284" height="114.773" rx="16" fill="white" />
              <rect x="-37.4099" y="-39.9741" width="283" height="113.773" rx="15.5" stroke="#EFF0F7" />
            </g>
            <circle opacity="0.15" cx="19.4107" cy="16.9127" r="33.3209" fill="#4A3AFF" />
            <g filter="url(#filter2_d_1_5)">
              <rect x="3.33203" y="2.38574" width="32.1799" height="29.3527" rx="1" fill="white" />
            </g>
            <rect x="2.10779" y="2.38574" width="34.0457" height="28.1681" fill="white" />
            <rect x="7.2757" y="10.8428" width="23.7094" height="5.66188" rx="0.680278" fill="#4A3AFF" />
            <rect x="7.2757" y="19.2759" width="10.8407" height="7.31969" rx="0.680278" fill="#4A3AFF" />
            <rect x="20.1448" y="19.2759" width="10.8407" height="2.30835" rx="0.680278" fill="#4A3AFF" />
            <rect x="20.1448" y="24.2876" width="10.8407" height="2.30835" rx="0.680278" fill="#4A3AFF" />
            <path d="M0.679138 28.2297C0.679138 29.4717 1.17252 30.6628 2.05074 31.541C2.92895 32.4192 4.12008 32.9126 5.36206 32.9126H33.4596C34.7016 32.9126 35.8927 32.4192 36.771 31.541C37.6492 30.6628 38.1426 29.4717 38.1426 28.2297V5.59552C38.1426 4.35353 37.6492 3.16241 36.771 2.2842C35.8927 1.40598 34.7016 0.912598 33.4596 0.912598H5.36206C4.12008 0.912598 2.92895 1.40598 2.05074 2.2842C1.17252 3.16241 0.679138 4.35353 0.679138 5.59552L0.679138 28.2297ZM23.3133 4.81504C23.306 5.09228 23.2228 5.36222 23.0729 5.59552C22.9427 5.83178 22.7515 6.02878 22.5192 6.16597C22.2869 6.30317 22.0221 6.37554 21.7523 6.37554C21.4825 6.37554 21.2177 6.30317 20.9854 6.16597C20.7532 6.02878 20.5619 5.83178 20.4317 5.59552C20.2818 5.36222 20.1986 5.09228 20.1913 4.81504C20.1984 4.53775 20.2815 4.26775 20.4317 4.03455C20.5619 3.79829 20.7532 3.6013 20.9854 3.4641C21.2177 3.32691 21.4825 3.25454 21.7523 3.25454C22.0221 3.25454 22.2869 3.32691 22.5192 3.4641C22.7515 3.6013 22.9427 3.79829 23.0729 4.03455C23.2231 4.26775 23.3062 4.53775 23.3133 4.81504V4.81504ZM28.7767 4.81504C28.7694 5.09228 28.6863 5.36222 28.5363 5.59552C28.4061 5.83178 28.2149 6.02878 27.9826 6.16597C27.7503 6.30317 27.4855 6.37554 27.2157 6.37554C26.946 6.37554 26.6811 6.30317 26.4489 6.16597C26.2166 6.02878 26.0254 5.83178 25.8951 5.59552C25.7452 5.36222 25.662 5.09228 25.6547 4.81504C25.6618 4.53775 25.745 4.26775 25.8951 4.03455C26.0254 3.79829 26.2166 3.6013 26.4489 3.4641C26.6811 3.32691 26.946 3.25454 27.2157 3.25454C27.4855 3.25454 27.7503 3.32691 27.9826 3.4641C28.2149 3.6013 28.4061 3.79829 28.5363 4.03455C28.6865 4.26775 28.7696 4.53775 28.7767 4.81504V4.81504ZM34.2401 4.81504C34.2328 5.09228 34.1497 5.36222 33.9997 5.59552C33.8695 5.83178 33.6783 6.02878 33.446 6.16597C33.2137 6.30317 32.9489 6.37554 32.6791 6.37554C32.4094 6.37554 32.1445 6.30317 31.9123 6.16597C31.68 6.02878 31.4888 5.83178 31.3586 5.59552C31.2086 5.36222 31.1255 5.09228 31.1182 4.81504C31.1252 4.53775 31.2084 4.26775 31.3586 4.03455C31.4908 3.80002 31.6825 3.60444 31.9143 3.46744C32.1461 3.33044 32.4099 3.25685 32.6791 3.25406C32.979 3.25542 33.2722 3.34315 33.5236 3.50676C33.7749 3.67036 33.9738 3.90292 34.0965 4.1766C34.1895 4.37667 34.2385 4.5944 34.2401 4.81504V4.81504ZM3.80109 9.10616C3.80109 9.00266 3.8422 8.9034 3.91539 8.83021C3.98857 8.75703 4.08783 8.71591 4.19133 8.71591H34.6304C34.7339 8.71591 34.8331 8.75703 34.9063 8.83021C34.9795 8.9034 35.0206 9.00266 35.0206 9.10616V28.2281C35.0206 28.6421 34.8561 29.0391 34.5634 29.3319C34.2707 29.6246 33.8736 29.7891 33.4596 29.7891H5.36206C4.94807 29.7891 4.55103 29.6246 4.25829 29.3319C3.96555 29.0391 3.80109 28.6421 3.80109 28.2281V9.10616Z" fill="#4A3AFF" />
            <defs>
              <filter id="filter0_d_1_5" x="-412.297" y="-326.102" width="730" height="638" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="5" />
                <feGaussianBlur stdDeviation="8" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0323264 0 0 0 0 0.0598209 0 0 0 0 0.204167 0 0 0 0.06 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_5" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_5" result="shape" />
              </filter>
              <filter id="filter1_d_1_5" x="-43.9099" y="-44.4741" width="296" height="126.773" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="3" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0726778 0 0 0 0 0.0688889 0 0 0 0 0.258333 0 0 0 0.07 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_5" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_5" result="shape" />
              </filter>
              <filter id="filter2_d_1_5" x="-6.66797" y="-7.61426" width="52.1799" height="49.3525" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="5" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.290196 0 0 0 0 0.227451 0 0 0 0 1 0 0 0 0.5 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_5" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_5" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
        Web Design
      </label>
      <label className="radio-group__control radio-group__control--icon" htmlFor="marketing">
        <input type="radio" className="radio-group__invisible-radio" name="services" id="marketing" />
        <div className="icon-container">
          <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.257 12.7659C35.2507 11.6687 34.9065 10.6001 34.2712 9.70542C33.6359 8.81078 32.7404 8.1336 31.7066 7.76604C31.5048 7.69311 31.2885 7.66987 31.0759 7.69829C30.8633 7.72672 30.6606 7.80597 30.4852 7.92933C30.3097 8.0527 30.1665 8.21654 30.0678 8.40698C29.9691 8.59742 29.9177 8.80885 29.918 9.02336L29.9367 19.2314C29.9372 19.4454 29.9892 19.6562 30.0883 19.846C30.1874 20.0357 30.3307 20.1988 30.506 20.3216C30.6814 20.4443 30.8837 20.5231 31.0959 20.5513C31.3081 20.5794 31.524 20.5561 31.7253 20.4833C32.7612 20.1107 33.6566 19.4269 34.2888 18.5256C34.921 17.6243 35.2592 16.5497 35.257 15.4487V12.7659Z" fill="#4A3AFF" />
            <path d="M28.7931 1.3689C28.7931 1.03887 28.662 0.722353 28.4286 0.488985C28.1952 0.255617 27.8787 0.124512 27.5487 0.124512C27.2187 0.124512 26.9022 0.255617 26.6688 0.488985C26.4354 0.722353 26.3043 1.03887 26.3043 1.3689V2.33206L3.71367 9.62542C3.58849 9.66595 3.47938 9.74511 3.40202 9.85154C3.32466 9.95797 3.28303 10.0862 3.28311 10.2178V17.6306C3.2831 17.763 3.32534 17.8919 3.40367 17.9987C3.482 18.1055 3.59234 18.1844 3.71865 18.2242L5.33635 18.7319C5.46266 18.7716 5.57301 18.8506 5.65134 18.9573C5.72967 19.0641 5.7719 19.193 5.77189 19.3254V22.5496C5.7801 24.03 6.3735 25.447 7.42259 26.4914C8.47168 27.5358 9.8913 28.1229 11.3716 28.1245H11.3978C12.8815 28.116 14.3014 27.5195 15.3462 26.4659C16.3909 25.4122 16.9754 23.9874 16.9714 22.5036V22.3792L26.3043 25.3035V26.2567C26.3043 26.5867 26.4354 26.9032 26.6688 27.1366C26.9022 27.37 27.2187 27.5011 27.5487 27.5011C27.8787 27.5011 28.1952 27.37 28.4286 27.1366C28.662 26.9032 28.7931 26.5867 28.7931 26.2567V1.3689ZM14.4826 22.5098C14.4846 22.9184 14.4061 23.3233 14.2515 23.7015C14.097 24.0797 13.8695 24.4237 13.582 24.714C13.2945 25.0043 12.9527 25.2351 12.576 25.3932C12.1993 25.5514 11.7951 25.6338 11.3866 25.6357H11.3716C10.55 25.6357 9.76171 25.3107 9.17886 24.7316C8.59601 24.1525 8.26593 23.3663 8.26067 22.5447V20.4952C8.26066 20.3975 8.28366 20.3011 8.3278 20.214C8.37195 20.1268 8.43599 20.0513 8.51475 19.9935C8.59351 19.9357 8.68478 19.8973 8.78116 19.8813C8.87754 19.8653 8.97633 19.8723 9.06952 19.9016L14.0471 21.4621C14.1734 21.5018 14.2837 21.5808 14.3621 21.6875C14.4404 21.7943 14.4826 21.9232 14.4826 22.0556V22.5098Z" fill="#4A3AFF" />
            <path d="M3.28206 9.64318C3.28206 9.30904 3.13715 8.98858 2.87921 8.75231C2.62127 8.51604 2.27143 8.3833 1.90665 8.3833C1.54187 8.3833 1.19203 8.51604 0.934096 8.75231C0.676158 8.98858 0.53125 9.30904 0.53125 9.64318L0.538127 18.4623C0.538127 18.6278 0.573703 18.7916 0.642823 18.9445C0.711944 19.0973 0.813255 19.2362 0.940973 19.3532C1.06869 19.4702 1.22031 19.563 1.38719 19.6263C1.55406 19.6896 1.73291 19.7222 1.91353 19.7222H1.90665C2.26578 19.7223 2.61071 19.5937 2.86772 19.364C3.12473 19.1342 3.27344 18.8214 3.28206 18.4926V9.64318Z" fill="white" />
          </svg>

        </div>
        Marketing
      </label>
      <label className="radio-group__control radio-group__control--icon" htmlFor="other">
        <input type="radio" className="radio-group__invisible-radio" name="services" id="other" />
        <div className="icon-container">
          <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M37.2855 24.3919C38.0252 24.7848 38.5957 25.4052 38.9972 26.0255C39.7792 27.3076 39.7158 28.8792 38.955 30.2646L37.4757 32.746C36.6938 34.0695 35.2357 34.8966 33.7353 34.8966C32.9956 34.8966 32.1715 34.6898 31.4952 34.2762C30.9458 33.9247 30.3118 33.8006 29.6356 33.8006C27.5434 33.8006 25.7894 35.5169 25.726 37.5641C25.726 39.9421 23.7819 41.8032 21.3516 41.8032H18.4776C16.0262 41.8032 14.082 39.9421 14.082 37.5641C14.0398 35.5169 12.2858 33.8006 10.1937 33.8006C9.49628 33.8006 8.86231 33.9247 8.33399 34.2762C7.65775 34.6898 6.81245 34.8966 6.09395 34.8966C4.57241 34.8966 3.11427 34.0695 2.33237 32.746L0.874223 30.2646C0.0923204 28.9205 0.0500554 27.3076 0.831958 26.0255C1.17008 25.4052 1.80405 24.7848 2.52256 24.3919C3.11427 24.1024 3.49465 23.6268 3.85391 23.0685C4.91053 21.2902 4.27656 18.9535 2.48029 17.8989C0.388175 16.7202 -0.288065 14.0941 0.916488 12.0469L2.33237 9.60684C3.55805 7.55968 6.17848 6.83593 8.29173 8.03528C10.1303 9.02785 12.5182 8.36614 13.596 6.60847C13.9341 6.02947 14.1243 5.40912 14.082 4.78876C14.0398 3.9823 14.2722 3.2172 14.6737 2.59685C15.4556 1.31478 16.8715 0.487646 18.4142 0.446289H21.3939C22.9577 0.446289 24.3736 1.31478 25.1555 2.59685C25.5358 3.2172 25.7894 3.9823 25.726 4.78876C25.6838 5.40912 25.874 6.02947 26.2121 6.60847C27.2898 8.36614 29.6778 9.02785 31.5375 8.03528C33.6296 6.83593 36.2712 7.55968 37.4757 9.60684L38.8916 12.0469C40.1173 14.0941 39.441 16.7202 37.3278 17.8989C35.5315 18.9535 34.8975 21.2902 35.9753 23.0685C36.3134 23.6268 36.6938 24.1024 37.2855 24.3919ZM13.9349 21.1449C13.9349 24.3914 16.6187 26.9762 19.9365 26.9762C23.2543 26.9762 25.8748 24.3914 25.8748 21.1449C25.8748 17.8984 23.2543 15.2929 19.9365 15.2929C16.6187 15.2929 13.9349 17.8984 13.9349 21.1449Z" fill="#4A3AFF" />
          </svg>
        </div>
        Other
      </label>
    </form>
  )
}

function BudgetForm() {
  return (
    <form className="radio-group">
      <div className="form__header">
        <h2>What's your budget?</h2>
        <p>Please select the project budget you have in mind.</p>
      </div>
      <label className="radio-group__control radio-group__control" htmlFor="choice1">
        <input type="radio" className="radio-group__radio" name="services" id="choice1" />
        $5.000 - $10.000
      </label>
      <label className="radio-group__control radio-group__control" htmlFor="choice2">
        <input type="radio" className="radio-group__radio" name="services" id="choice2" />
        $10.000 - $20.000
      </label>
      <label className="radio-group__control radio-group__control" htmlFor="choice3">
        <input type="radio" className="radio-group__radio" name="services" id="choice3" />
        $20.000 - $50.000
      </label>
      <label className="radio-group__control radio-group__control" htmlFor="choice4">
        <input type="radio" className="radio-group__radio" name="services" id="choice4" />
        $50.000 +
      </label>
    </form>
  )
}

function TextInput(props) {
  return (
    <div className="text-input">
      <input className="text-input__field" type="text" placeholder={props.placeholder} />
      {props.icon}
    </div >
  )
}

// function RadioButton(props) {
//   return (
//     <>
//       <label className="radio-group__control">
//         <input className="radio-group__item" type="radio" />
//         {props.children}
//       </label>
//     </>
//   )
// }

function PersonIcon() {
  return (
    <svg width="23" height="29" viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5629 14.2939C15.0647 14.2939 17.9034 11.4552 17.9034 7.95337C17.9034 4.45156 15.0647 1.61279 11.5629 1.61279C8.06106 1.61279 5.22229 4.45156 5.22229 7.95337C5.22229 11.4552 8.06106 14.2939 11.5629 14.2939Z" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M1.41797 27.4384C1.41797 24.7478 2.4868 22.1674 4.38935 20.2648C6.29189 18.3623 8.87229 17.2935 11.5629 17.2935C14.2535 17.2935 16.8339 18.3623 18.7364 20.2648C20.639 22.1674 21.7078 24.7478 21.7078 27.4384" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.9883 1.52588H2.98828C1.88371 1.52588 0.988281 2.42131 0.988281 3.52588V15.5259C0.988281 16.6304 1.88371 17.5259 2.98828 17.5259H21.9883C23.0929 17.5259 23.9883 16.6304 23.9883 15.5259V3.52588C23.9883 2.42131 23.0929 1.52588 21.9883 1.52588Z" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M23.3993 2.10791L12.4883 11.0259L1.57727 2.10791" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="17" height="29" viewBox="0 0 17 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2434 1.51172H3.06946C1.82082 1.51172 0.808594 2.52394 0.808594 3.77259V25.2508C0.808594 26.4995 1.82082 27.5117 3.06946 27.5117H13.2434C14.492 27.5117 15.5042 26.4995 15.5042 25.2508V3.77259C15.5042 2.52394 14.492 1.51172 13.2434 1.51172Z" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.8595 1.51172V2.99295C11.8595 3.38579 11.7035 3.76255 11.4257 4.04033C11.1479 4.31812 10.7711 4.47418 10.3783 4.47418H5.9346C5.54175 4.47418 5.165 4.31812 4.88721 4.04033C4.60943 3.76255 4.45337 3.38579 4.45337 2.99295V1.51172" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="17" height="32" viewBox="0 0 17 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.399 30.5116V6.86729C15.3989 6.6139 15.3191 6.36696 15.171 6.16138C15.0229 5.9558 14.8139 5.80198 14.5736 5.72168L2.50606 1.69918C2.32461 1.63837 2.13128 1.62165 1.94208 1.65039C1.75289 1.67914 1.57325 1.75253 1.41805 1.86449C1.26285 1.97644 1.13654 2.12375 1.04958 2.29422C0.962622 2.46469 0.917507 2.65342 0.917972 2.84479V30.5116" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10.5703 22.8916V24.0984" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10.5703 16.8579V18.0647" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10.5703 10.8242V12.031" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5.74609 22.8916V24.0984" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5.74609 16.8579V18.0647" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5.74609 10.8242V12.031" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  )
}

ReactDOM.render(<App />, document.querySelector("#root"));