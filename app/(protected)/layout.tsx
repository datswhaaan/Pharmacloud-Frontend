import AuthGuard from "@/components/AuthGuard";
import Wrapper from "@/components/Wrapper";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <Wrapper>
        {children}
      </Wrapper> 
    </AuthGuard>
)}