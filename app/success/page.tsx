import React from "react";
import MessagePage from "../components/MessagePage";
import Link from "next/link";

export default function Page() {
  return (
    <MessagePage title={"Payment was successful"}>
      Your payment successfully accepted! Thank you a lot for your contribution!
      If you want, you can <Link href={"/"}>visit the site again</Link>.
    </MessagePage>
  );
}
