import React from "react";
import Image from "next/image";
import dashboard from "../(routes)/dashboard/page";
import {
  Layout,
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
    },
  ];
  return (
    <div className=" h-screen border shadow-sm">
      {/* <div className="flex"> */}
      <Image
        src={"/logo.png"}
        alt="logo"
        width={60}
        height={100}
        className="p-2 m-2"
        
      />
      {/* <h1 className="p-6 m-2 font-extrabold text-xl ">KharchaWise</h1>
      </div> */}
      <div>
        {menuList.map((menu, index) => (
          <h2 className="flex gap-2 items-center text-teal-600 font-medium p-5 cursor-pointer rounded-md hover:text-teal-900 hover:bg-teal-100">
            <menu.icon />{menu.name}
          </h2>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 font-bold text-teal-600 flex gap-2 items-center">
      <UserButton/>
      Profile
      </div>
      
    </div>
  
  );
}

export default SideNav;
