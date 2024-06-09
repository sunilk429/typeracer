import SwitchMode from "@/components/SwitchMode";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center">
      <div>
        <div className="text-2xl p-2 text-center">
          <h2>Invite your friends for Typing Battle</h2>
        </div>
        <div className=" flex justify-center items-center p-2">
          <SwitchMode />
        </div>
      </div>
    </main>
  );
}
