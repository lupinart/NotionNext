// themes/starter/components/CategoryFilter.js
import { useRouter } from "next/router";

export default function CategoryFilter({ categories = [], active }) {
  const router = useRouter();

  const goto = (name) => {
    if (!name) {
      router.push({ pathname: router.pathname, query: {} }, undefined, {
        shallow: true,
      });
    } else {
      router.push(
        { pathname: router.pathname, query: { cat: encodeURIComponent(name) } },
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <div className="mt-2 mb-6 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => goto(null)}
        className={`px-3 py-1 rounded-full border text-sm
          ${
            !active
              ? "bg-black text-white border-black"
              : "border-gray-300 hover:border-black"
          }`}
      >
        全部
      </button>

      {categories.map((c) => (
        <button
          key={c.name}
          onClick={() => goto(c.name)}
          className={`px-3 py-1 rounded-full border text-sm
            ${
              active === c.name
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:border-black"
            }`}
          title={`${c.name}（${c.count}）`}
        >
          {c.name}（{c.count}）
        </button>
      ))}
    </div>
  );
}
