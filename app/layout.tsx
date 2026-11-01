export const metadata = {
  title: 'MOODIFY',
  description: 'Every Mood Deserves a Melody'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
