
export default function NeedCard({ need }) {
  return (
    <div className="rounded-xl bg-white shadow-md text-base p-6 flex items-center justify-evenly aspect-[2/1] border border-indigo-200">
      <p className="text-gray-700">{need.content}</p>
    </div>
  );
}
