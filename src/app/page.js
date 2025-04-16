

import Image from "next/image";
import QrScanner from "./scan/page"

/*
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/theshyboys/qrapp.git
git push -u origin main



https://shopping-two-rosy.vercel.app/
echo "# shopping" >> README

git init
git add .
git commit -m "first commit"
git branch -M main
git push -u origin main


https://vercel.com/theshyboys-projects
https://vercel.com/new?teamSlug=theshyboys-projects


https://th.qr-code-generator.com/


*/


export default function Home() {
  return (
    <div>
      <QrScanner/>
    </div>
  );
}
