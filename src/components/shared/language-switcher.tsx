"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Languages } from "lucide-react";
import Image from "next/image";

const languages = [
  { code: "en", label: "English", flag: "/flags/en.svg" },
  { code: "uk", label: "Українська", flag: "/flags/ukr.svg" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const changeLanguage = (lang: string) => {
    if (!pathname) return;

    const segments = pathname.split("/");
    segments[1] = lang; 
    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='flex align-center'>
            {
                <div className="flex gap-3"><Languages/> Translate</div>
            }
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-2">
              {languages.map((lng) => (
                <li key={lng.code}>
                  <NavigationMenuLink
                    className="cursor-pointer flex items-center gap-2 p-2"
                    onClick={() => changeLanguage(lng.code)}
                  >
                    <div className="flex gap-2">
                    <Image
                      src={lng.flag}
                      alt={lng.label}
                      width={20}
                      height={20}
                    />
                    <span className="truncate max-w-[120px]">{lng.label}</span>
                    </div>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
