import { SkeletonCard } from "@/components/SkeletonCard";

export default function Loading() {
  const data: number[] = Array(5).fill(0);

  return (
    <div className="flex justify-center md:justify-normal flex-wrap px-4 md:px-20 gap-4">
      {data?.map((el: number, index: number) => (
        <div key={index}>
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}
