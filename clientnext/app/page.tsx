// Ui
import DotBackground from "./ui/dotBackground/DotBackground";
import Button from "./ui/button/Button";

export default function Home() {

  return (
    <main>
      <Button url="/map" text="Continue" backgroundColor="--main-color"/>
      <DotBackground backgroundColor="--main-color"/>
    </main>
  );
}
