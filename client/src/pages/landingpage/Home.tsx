import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CreateGameButton from "./CreateGameButton";
import JoinGameButton from "./JoinGameButton";
import { useEffect, useState } from "react";
import { socket } from "@/services/server";

export const Home = () => {
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("https://github.com/shadcn.png");
  const [openDropdown,setOpenDropdown] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleAvatarChange = (e:any) => {
    setAvatarUrl(e.target.value);
  };

  const onSaveClick = () => {
    setOpenDropdown(false);
  }
  // Connect socket when user enters name
useEffect(() => {
  if (userName.trim()) {
    socket.connect();
    
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected:", socket.id);
    });
  }
  
  return () => {
    socket.off("connect");
  };
}, [userName]);

  return (
    <div className="mx-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Mafia Game!</h1>
      <div className="flex w-full min-h-screen">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col p-8">
          {/* Avatar Section */}
          <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-lg mb-8">
            <DropdownMenu open={openDropdown} onOpenChange={(open) => setOpenDropdown(open)}>
                <DropdownMenuTrigger>
              <Avatar className="size-24">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>CN</AvatarFallback>
                  <Button className="absolute -bottom-1 -right-1 w-9 h-9 bg-black rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all ring-2 ring-gray-200">
                    <EditIcon className="w-5 h-5 text-white" />
                  </Button>
              </Avatar>
                </DropdownMenuTrigger>
              <DropdownMenuContent className="w-90">
                <DropdownMenuGroup>
                  <h3 className="text-lg font-bold mb-2 ml-2">Edit Avatar Url</h3>
                    <Input
                      type="text"
                      value={avatarUrl}
                      onChange={handleAvatarChange}
                      placeholder="Enter your Avatar URL"
                      className="text-2xl mb-2"
                    />
                    <Button
                      onClick={onSaveClick}
                      className="w-full text-center bg-blue-500 text-white"
                    >
                      Save
                    </Button>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1 space-y-2">
              <h6 className="text-lg text-black font-bold">Agent Name</h6>
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your Name"
                className="text-2xl"
              />
            </div>
          </div>

          {/* Create Game Button - centered */}
          <CreateGameButton />
        </div>

        {/* RIGHT SIDE - fixed width, vertical layout */}
        <div className="w-80 bg-gray-50 p-8">
          <JoinGameButton />
        </div>
      </div>
    </div>
  );
};

export default Home;