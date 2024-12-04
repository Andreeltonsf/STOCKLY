import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";


interface SideBarButtonProps {
  children: React.ReactNode;
  href: string;
}

const SideBarButton = ({children, href}: SideBarButtonProps) => {
  const pathname= usePathname();
  return (
  <Button 
    variant={pathname === `${href}` ? "secondary" : "ghost"} 
    className="justify-start" 
    asChild
    >
    <Link href={href}>
      {children}
    </Link>
  </Button>
  
);
};


export default SideBarButton;
