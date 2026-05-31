import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "WKCH – Sighthound Breeds Association in Poland",
    description:
        "Wybieralny Klub Charta w Polsce – information on all sighthound breeds",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl">
            <body>{children}</body>
        </html>
    );
}
