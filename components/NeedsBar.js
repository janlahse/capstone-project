export default function NeedsBar({ need, value }) {
  const colors = {
    hunger: "#ff6f61",
    energy: "#6fcf97",
    entertainment: "#56ccf2",
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>{need.toUpperCase()}</label>
      <div
        style={{
          backgroundColor: "#eee",
          width: "100%",
          height: "20px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            backgroundColor: colors[need] || "#999",
          }}
        />
      </div>
    </div>
  );
}
