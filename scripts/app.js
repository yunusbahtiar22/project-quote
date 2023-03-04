function App() {
  return (
    <Main />
  );
}

function Main() {
  return (
    <main>
      <section className="heading-container">
        <h1 className="text-center">Get a project quote</h1>
        <p className="text-center">Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.</p>
      </section>
      <section>
        <FormContainer />
      </section>
    </main >
  )
}

function FormContainer() {
  return (
    <>
      <div style={{ width: "44rem", height: "37rem", padding: "35px 55px", borderRadius: 19, border: "1px solid #EFF0F6", marginLeft: "auto", marginRight: "auto", boxShadow: "0px 5px 16px 0px #080F340F" }}>
        <div className="progress-container">
          <Progress percentage={1.5} />
        </div>
        <hr className="form-divider" />
        <div style={{ height: "13.5rem", width: 568 }}></div>
      </div>
      <div style={{ width: "43rem", marginLeft: "auto", marginRight: "auto", marginTop: "3rem", display: "flex", justifyContent: "space-between" }}>
        <button style={{ padding: "19px 40px", border: "1px solid #4A3AFF", background: "white", borderRadius: 56 }}>Previous Step</button>
        <button style={{ padding: "19px 40px", border: "1px solid #4A3AFF", background: "#4A3AFF", borderRadius: 56 }}>Next Step</button>
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

ReactDOM.render(<App />, document.querySelector("#root"));