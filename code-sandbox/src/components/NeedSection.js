import NeedCard from "./NeedCard";
import "../styles/_needsection.scss";
export default function NeedSection() {
  const needs = [
    {
      content:
        "Women face unique safety risks every day, including harassment, stalking, and threats, making personal security tools more important than ever.",
    },
    {
      content:
        "In moments of crisis, every second counts. Having an app that can instantly alert trusted contacts and authorities bridges the critical gap between danger and safety.",
    },
    {
      content:
        "Whether commuting, traveling, or letting kids play outside, families deserve peace of mind knowing their loved ones can call for help and be located in real-time if needed.",
    },
    {
      content:
        "Children can easily wander off or find themselves in unsafe situations, highlighting the need for real-time tracking and quick response systems.",
    },
  ];

  return (
    <>
      <h2> What highlights the need of Valora? </h2>
      <div className="needs-section">
        {needs.map((need) => (
          <NeedCard need={need} />
        ))}
      </div>
    </>
  );
}
