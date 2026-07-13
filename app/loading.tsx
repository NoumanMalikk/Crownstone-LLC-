export default function Loading() {
  return (
    <div className="container-wide px-4 py-20">
      <div className="skeleton h-10 w-64 rounded-full" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton aspect-[3/4] rounded-[1.25rem]" />
        ))}
      </div>
    </div>
  );
}
