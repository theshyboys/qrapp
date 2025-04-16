

import Image from "next/image";
import QrScanner from "./scan/page"

/*
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/theshyboys/qrapp.git
git push -u origin main
*/


export default function Home() {
  return (
    <div>
      <QrScanner/>
    </div>
  );
}
