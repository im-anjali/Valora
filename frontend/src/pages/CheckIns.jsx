// twilio code: 46G5PCFHA1YVKP46VSTM4YNP
export default function CheckIns() {
  const contacts = [
    {
      name: "Noopur Karkare",
      phone: 9763718189,
    },
    {
      name: "Sejal Pathak",
      phone: 9822850039,
    },
    {
        name: "Anjali",
        phone: 7558366814,
    }
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw",  // Full viewport width
      }}
    >
      <div
        style={{
          width: "60%",
          marginTop:"2rem",
          background: "#E6E6FA", // Light lavender
          borderRadius: "12px",
          border: "2px solid #b5b5f0",
          padding: "2rem",
          boxShadow: "0 6px 15px rgba(100, 100, 100, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height:"auto",
        }}
      >
        <h3
          style={{
            marginBottom: "15px",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          Select the contacts to send check-ins to:
        </h3>
        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0,
            margin: 0,
            width: "100%",
          }}
        >
          {contacts.map((person, i) => (
            <li
              key={i}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "2px solid #b5b5f0",
                borderRadius: "0.7rem",
                cursor: "pointer",
                background: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ margin: 0 }}>{person.name}</h2>
                <p style={{ margin: 0 }}>{person.phone}</p>
              </div>
              <input type="checkbox" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
