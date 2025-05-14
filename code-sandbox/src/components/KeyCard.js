import "../styles/_home.scss";
export default function KeyCard({ item }) {
  return (
    <>
      <div className="key-card">
        <img src="{item.img}" />
        <p>{item.name}</p>
      </div>
    </>
  );
}
