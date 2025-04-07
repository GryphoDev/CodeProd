import { Alert, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export function AlertMessage({ children }: { children: React.ReactNode }) {
  return (
    <Alert className="w-fit bg-destructive/70">
      <Terminal className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
