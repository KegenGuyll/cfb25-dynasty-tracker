import { Button } from "@nextui-org/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-12">
        <div>
          <h1>Load existing save</h1> 
          <input type='file' accept="application/JSON" />
        </div>
        <div>
          <h1>Start new game</h1>
          <Button>Start</Button>
        </div>
      </div>
    </main>
  );
}
