import Link from "next/link";

type SchemeCardProps = {
  id: string;
  name: string;
  category: string;
  benefit: string;
  eligibility: string;
  onApply?: () => void; 
   selected?: boolean; // ✅ optional
};

export default function SchemeCard({
  id,
  name,
  category,
  benefit,
  eligibility,
  onApply,
}: SchemeCardProps) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
        {category}
      </span>

      <h3 className="text-lg font-bold mt-2">{name}</h3>

      <p className="text-green-700 mt-2 font-semibold">{benefit}</p>

      <p className="text-sm text-gray-600 mt-2">
        Eligible: {eligibility}
      </p>

      {/* ✅ Clean routing + optional state update */}
      <Link href={`/apply/${id}`}>
        <button
          onClick={() => {
            onApply?.();
            // navigation handled by Link
          }}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </Link>
    </div>
  );
}