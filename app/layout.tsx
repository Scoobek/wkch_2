import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin", "latin-ext"],
    display: "swap",
    variable: "--font-playfair",
    weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
    title: "Wybieralny Klub Charta",
    description:
        "Polska organizacja zrzeszająca hodowców i właścicieli chartów wszystkich ras FCI Grupy X.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl">
            <body className={playfair.variable}>{children}</body>
        </html>
    );
}
