import { useState } from "react";

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
    },
  ];

  const [selected, setSelected] = useState([]);

  const handleCheckboxChange = (phone) => {
    setSelected((prevSelected) =>
      prevSelected.includes(phone)
        ? prevSelected.filter((p) => p !== phone)
        : [...prevSelected, phone]
    );
  };

  const handleSendCheckIn = () => {
    if (selected.length === 0) {
      alert("Please select at least one contact.");
    } else {
      //integrate Twilio API call logic later
      alert("Check-in sent successfully!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1.5rem",
        paddingBottom: "2rem",
      }}
    >
      <div
        style={{
          width: "60%",
          background: "#E6E6FA", // Light lavender
          borderRadius: "12px",
          border: "2px solid #b5b5f0",
          padding: "2rem",
          boxShadow: "0 6px 15px rgba(100, 100, 100, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(person.phone)}
              />
            </li>
          ))}
        </ul>
        <button
          onClick={handleSendCheckIn}
          style={{
            marginTop: "1.5rem",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#6a5acd",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Send Check-In
        </button>
      </div>
    </div>
  );
}
