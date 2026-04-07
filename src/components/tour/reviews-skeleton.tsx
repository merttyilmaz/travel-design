export function ReviewsSkeleton() {
  return (
    <div className="space-y-7 animate-pulse">

      {/* Summary block */}
      <div className="flex items-center gap-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl">
        <div className="text-center shrink-0 space-y-2.5">
          <div className="h-12 w-10 bg-amber-200/70 rounded-lg mx-auto" />
          <div className="h-3.5 w-20 bg-amber-200/60 rounded-full mx-auto" />
          <div className="h-3 w-14 bg-amber-200/40 rounded-full mx-auto" />
        </div>
        <div className="flex-1 space-y-2.5 min-w-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 w-16 bg-amber-200/60 rounded-full shrink-0" />
              <div className="flex-1 h-1.5 bg-amber-200/60 rounded-full" />
              <div className="h-3 w-4 bg-amber-200/40 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Review card skeletons */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-2xl p-6 bg-white space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                <div className="space-y-2">
                  <div className="h-3.5 w-28 bg-gray-200 rounded-full" />
                  <div className="h-3 w-20 bg-gray-100 rounded-full" />
                </div>
              </div>
              <div className="flex gap-0.5 pt-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="w-4 h-4 rounded bg-gray-200" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-100 rounded-full" />
              <div className="h-3 w-[92%] bg-gray-100 rounded-full" />
              <div className="h-3 w-[76%] bg-gray-100 rounded-full" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
