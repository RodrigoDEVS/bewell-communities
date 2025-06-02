"use client";
import { Play } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ContentTypeItemProps {
  title: string;
  role: string;
  href: string;
}

export default function ContentTypeItem({
  title,
  role,
  href,
}: ContentTypeItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <div
        className={`flex items-center justify-between p-4 border-b ${
          isActive ? "bg-gray-200" : "hover:bg-gray-50"
        }  hover:cursor-pointer hover:bg-gray-200`}
      >
        <div className="font-medium flex-1 text-left">{title}</div>
        <span
          className={`text-sm mr-4 text-red-600 font-bold flex-1 text-left`}
        >
          {role}
        </span>
        <Play className="w-4 h-5 text-gray-400" fill="currentColor" />
      </div>
    </Link>
  );
}
