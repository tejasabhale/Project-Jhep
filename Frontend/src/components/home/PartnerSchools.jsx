import Reveal from "../ui/Reveal";

const partnerSchools = [
  {
    id: 1,
    name: "Zilla Parishad Primary School",
    location: "Pune",
    logo: "https://placehold.co/120x120?text=ZP",
  },
  {
    id: 2,
    name: "New English School",
    location: "Nashik",
    logo: "https://placehold.co/120x120?text=NES",
  },
  {
    id: 3,
    name: "Shivaji Vidyalaya",
    location: "Satara",
    logo: "https://placehold.co/120x120?text=SV",
  },
  {
    id: 4,
    name: "Mahatma Gandhi School",
    location: "Kolhapur",
    logo: "https://placehold.co/120x120?text=MGS",
  },
  {
    id: 5,
    name: "Bal Vikas School",
    location: "Ahmednagar",
    logo: "https://placehold.co/120x120?text=BVS",
  },
  {
    id: 6,
    name: "Sunrise Public School",
    location: "Aurangabad",
    logo: "https://placehold.co/120x120?text=SPS",
  },
];

export default function PartnerSchools() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
              Trusted Partners
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Our Partner Schools
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              We proudly collaborate with schools to make English learning
              accessible, interactive, and enjoyable for every child.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-stretch">
          {partnerSchools.map((school) => (
            <Reveal key={school.id}>
              <div className="h-full min-h-[100px] bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-between text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                  <img
                    src={school.logo}
                    alt={school.name}
                    className="w-16 h-16 object-contain"
                  />
                </div> */}

                <div className="mt-5 flex-1 flex flex-col justify-center">
                  <h3 className="font-semibold text-slate-900 text-sm line-clamp-2">
                    {school.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2">
                    {school.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
