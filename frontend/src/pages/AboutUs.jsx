import Footer from "../components/Footer";
import NeedCard from "../components/NeedCard";

export default function AboutUs() {
  return (
    <>
    <div className=" px-4 sm:px-2 lg:px-2 ">
      <MeaningSection />
      <NeedSection />
      <VisionSection />
    </div>
    <Footer />
    </>
  );
}

function MeaningSection() {
  return (
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 p-8 md:p-16 bg-gradient-to-br from-gray-100 to-indigo-100 border-4 border-indigo-200 rounded-2xl relative overflow-hidden mt-4">
   <div className="z-10">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">About Valora</h2>
        <p className="text-lg leading-relaxed text-gray-700 max-w-xl">
         "Valora" draws inspiration from the word valor, symbolizing courage,
          strength, and resilience. It embodies the spirit of empowerment and
          safety for women everywhere. Through Valora, we aim to ignite
          confidence and provide real-time support, ensuring that every woman
          feels protected and empowered to navigate the world without fear. More
          than just an app, Valora stands as a movement towards building a
          safer, stronger, and more united community for women.
        </p>
      </div>
      <img
        src="/meaningsection.png"
        className="w-2/5 max-h-[400px] rounded-2xl shadow-xl border-[3px] border-indigo-200 object-cover"
        alt="Meaning section"
      />
    </div>
  );
}

function NeedSection() {
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
      <h2 className="text-4xl font-bold text-blue-900 mb-4 z-10 mt-8 ml-22 text-left">What highlights the need of Valora?</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-gradient-to-br from-gray-100 to-indigo-100 mt-8 border-[3px] border-indigo-200 rounded-2xl w-[100%]">
        {needs.map((need, index) => (
          <NeedCard key={index} need={need} />
        ))}
      </div>
    </>
  );
}


function VisionSection() {
  return (
  <div className="max-w-7xl mx-auto bg-gradient-to-br from-gray-100 to-indigo-100 mt-8 border-[3px] border-indigo-200 rounded-2xl p-8 text-base">
      <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Vision</h2>
      <p className="mb-4">
        At Valora, our vision is to create a world where women feel safe,
        empowered, and confident in every aspect of their lives. Here's how we
        plan to achieve that:</p>
      <ul className="flex flex-col gap-4 items-start">
        <li>
          <strong>Empowering Women:</strong> Our vision is to empower women with
          tools that ensure their safety, freedom, and confidence to navigate
          the world without fear.
        </li>
        <li>
          <strong>Real-Time Assistance:</strong> Providing immediate access to
          emergency assistance at the push of a button, connecting users to
          their emergency contacts and authorities in critical situations.
        </li>
        <li>
          <strong>Safe Zones for Peace of Mind:</strong> Creating a network of
          safe zones where women can find refuge, ensuring that help is always
          within reach when needed.
        </li>
        <li>
          <strong>Community Support:</strong> Building a supportive community
          where women can look out for each other, share safety tips, and
          contribute to a collective sense of security.
        </li>
        <li>
          <strong>Privacy and Security:</strong> Prioritizing user privacy and
          data security while providing life-saving features, ensuring that
          every user feels protected and in control of their information.
        </li>
        <li>
          <strong>Innovative Technology for Safety:</strong> Leveraging
          cutting-edge technology to provide real-time location tracking,
          automated alerts, and fast emergency response.
        </li>
        <li>
          <strong>Accessible and User-Friendly:</strong> Ensuring that the app
          is easy to use for all women, regardless of age, background, or
          technical expertise.
        </li>
        <li>
          <strong>Creating a Safer Future:</strong> Building a world where women
          can walk, work, and live confidently, without worrying about their
          safety, through proactive and innovative solutions.
        </li>
      </ul>
    </div>
  );
}
