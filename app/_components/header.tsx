"use client";

import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";



const  Header= () => {



    return ( 
       <Card>
        <CardContent className="p-5 justify-between items-center flex flex-row">
            <Image src="/logo.png" alt="FSW Barber"  height={18} width={120}/>
        </CardContent> 

        <Sheet>
            <SheetTrigger asChild>
               <Button size="icon" variant="outline" className="z-50 absolute top-4 right-4">
                 <MenuIcon />
               </Button> 

            </SheetTrigger> 

            <SheetContent className="p-0">
                <SideMenu />
            </SheetContent>
         </Sheet>
       </Card>
);
}
 
export default Header;