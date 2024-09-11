import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./_providers/ReactQuery";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} p-4`}>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	);
}
