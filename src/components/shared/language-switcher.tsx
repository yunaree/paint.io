"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
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
  const t  = useTranslations('shared')

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
          <NavigationMenuTrigger className="flex items-center justify-center gap-2">
            {
                <div className="flex gap-3"><Languages/> {t("change_language")}</div>
            }
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-max">
            <ul className="flex flex-col gap-2 p-2">
              {languages.map((lng) => (
                <li key={lng.code}>
                  <NavigationMenuLink
                    className="cursor-pointer flex  gap-2 w-full"
                    onClick={() => changeLanguage(lng.code)}
                  >
                    <div className="flex gap-2"><Image src={lng.flag} alt={lng.label} width={20} height={20} />
                    <span>{lng.label}</span></div>
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
