import { Template } from "e2b";

export const template = Template()
  // 1. መሠረታዊ የNode LTS ምስል መጠቀም
  .fromNodeImage("lts")

  // 2. የNext.js ፕሮጀክት ፎልደር መፍጠር
  .runCmd("mkdir -p /home/user/nextjs-app/app")

  // 3. Next.js እንዳይዘጋ መሠረታዊ የ package.json ፋይል መፍጠር
  .runCmd(
    `echo '{"name": "v0-app", "version": "0.1.0", "private": true, "scripts": {"dev": "next dev"}}' > /home/user/nextjs-app/package.json`,
  )

  // 4. Next.js የሚፈልገውን ባዶ የ app/page.js ገጽ መፍጠር (ይህ Next.js እንዳይከሽፍ ያደርገዋል)
  .runCmd(
    `echo 'export default function Page() { return <h1>v0 Sandbox Ready</h1> }' > /home/user/nextjs-app/app/page.js`,
  )

  // 5. Sandboxው ሲነሳ ወዲያውኑ የNext.js ሰርቨርን ማስጀመር
  .setStartCmd("cd /home/user/nextjs-app && npx --yes next dev --port 3000");
