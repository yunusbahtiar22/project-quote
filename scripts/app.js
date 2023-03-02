function App() {
  return (
    <Main />
  );
}

function Main() {
  return (
    <main>
      <section style={{ marginTop: "11rem", marginBottom: "2.4rem" }}>
        <h1 style={{ textAlign: "center" }}>Get a project quote</h1>
        <p style={{ textAlign: "center" }}>Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.</p>
      </section>
      <section>
        <FormContainer />
      </section>
    </main >
  )
}

function FormContainer() {
  return (
    <div>
      <div style={{ width: "43rem", height: "37rem", padding: "35px 55px", borderRadius: 19, border: "1px solid #EFF0F6", marginLeft: "auto", marginRight: "auto", boxShadow: "0px 5px 16px 0px #080F340F" }}>
        <div style={{ height: "13.5rem", width: 568 }}></div>
      </div>
      <div style={{ width: "43rem", marginLeft: "auto", marginRight: "auto", marginTop: "3rem", display: "flex", justifyContent: "space-between" }}>
        <button style={{ padding: "19px 40px", border: "1px solid #4A3AFF", background: "white", borderRadius: 56 }}>Previous Step</button>
        <button style={{ padding: "19px 40px", border: "1px solid #4A3AFF", background: "#4A3AFF", borderRadius: 56 }}>Next Step</button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector("#root"));