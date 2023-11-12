import "./reset.scss";
import "./global.scss";
import s from "./layout.module.scss";
import Analytics from "./components/Analytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Health&Help Special Project</title>
        <Analytics />
      </head>
      <body>
        <div className={s.root}>{children}</div>
      </body>
    </html>
  );
}
