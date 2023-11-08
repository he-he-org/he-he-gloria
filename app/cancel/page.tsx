import React from "react";
import MessagePage from "../components/MessagePage";
import Link from "next/link";

export default function Page() {
  return (
    <MessagePage title={"Payment was canceled"}>
      For some reason yor payment was not successful. You can try to{" "}
      <Link href={"/#donate"}>do this again</Link>.
    </MessagePage>
  );
}
