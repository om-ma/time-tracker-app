import { Timer } from "@/app/components/timer/Timer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div>
      <Timer onCancelRoute="/tickets" />
    </div>
  );
}
