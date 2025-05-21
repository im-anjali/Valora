export default function Footer() {
  return (
    <footer className="w-full bg-indigo-200 text-white flex flex-col md:flex-row gap-5 justify-between text-left p-5 items-center mt-8">
      <div className="footer-section">
        <p className="font-bold mb-4">Contact Us</p>
        <p className="opacity-80 mb-2 max-w-xs">1234 Valora Street, Safety City</p>
        <p className="opacity-80 mb-2">support@valora.app</p>
      </div>
      <div className="footer-section">
        <p className="font-bold mb-4">Join the Movement</p>
        <p className="opacity-80 max-w-xs">Together, we can make the world a safer place for women.</p>
      </div>
    </footer>
  );
}
