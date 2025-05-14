import "../styles/_needsection.scss";

export default function NeedCard({ need }) {
  return (
    <div className="need-card">
      <p className="content">{need.content}</p>
    </div>
  );
}
