import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeButton() {
  //   const [isMobile, setIsMobile] = useState(false);

  //   useEffect(() => {
  //     // Check if window is defined (client-side)
  //     const checkIfMobile = () => {
  //       setIsMobile(window.innerWidth < 768);
  //     };

  //     // Initial check
  //     checkIfMobile();

  //     // Add event listener for window resize
  //     window.addEventListener("resize", checkIfMobile);

  //     // Clean up event listener
  //     return () => {
  //       window.removeEventListener("resize", checkIfMobile);
  //     };
  //   }, []);

  //   if (!isMobile) {
  //     return null;
  //   }

  return (
    <a href="/">
      <Button variant="secondary" size="icon" className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-white md:hidden" aria-label="Go to homepage">
        <Home className="h-5 w-5 text-black" />
      </Button>
    </a>
  );
}
