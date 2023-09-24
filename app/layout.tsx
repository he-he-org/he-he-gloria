import "./reset.scss";
import "./global.scss";
import s from './layout.module.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={s.root}>
          {children}
        </div>
      </body>
    </html>
  );
}
