import { useEffect, useRef, useState } from "react";
import { socket } from "@/services/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Lock, Users, Skull } from "lucide-react";

type Message = {
  id?: string;
  username: string;
  text: string;
  timestamp: Date;
  channel?: "public" | "private" | "mafia";
};

type PPMChatProps = {
  username: string;
  role?: string;
};

export const PPMChatComp = ({ username, role }: PPMChatProps) => {
  const [activeTab, setActiveTab] = useState<"public" | "private" | "mafia">(
    "public"
  );

  const [msg, setMsg] = useState<Message[]>([
    {
      id: "system-1",
      username: "System",
      text: "Welcome to the game.",
      timestamp: new Date(),
      channel: "public",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: socket.id,
      username,
      text: newMessage,
      timestamp: new Date(),
      channel: activeTab,
    };

    socket.emit("send_message", { message });

    setMsg((prev) => [...prev, message]);
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    socket.on("receive_message", (data) => {
      setMsg((prev) => [
        ...prev,
        {
          ...data.message,
          timestamp: new Date(data.message.timestamp),
        },
      ]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [msg]);

  const filteredMessages = msg.filter(
    (message) =>
      message.channel === activeTab ||
      message.username === "System"
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const tabStyle = (tab: string) =>
    `flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wide transition-all border-b ${
      activeTab === tab
        ? "bg-[#450000] text-yellow-400 border-yellow-600"
        : "bg-[#120000] text-gray-400 border-transparent hover:text-white"
    }`;

  return (
    <div className="w-full h-[300px] min-h-0 bg-[#1a0000] border border-yellow-700 flex flex-col overflow-hidden">
      

      {/* Tabs */}
      <div className="flex border-b border-yellow-900">
        <button
          onClick={() => setActiveTab("public")}
          className={tabStyle("public")}
        >
          <Users className="w-4 h-4" />
          Public
        </button>

        <button
          onClick={() => setActiveTab("private")}
          className={tabStyle("private")}
        >
          <Lock className="w-4 h-4" />
          Private
        </button>

        <button
          onClick={() => setActiveTab("mafia")}
          disabled={role !== "Mafia"}
          className={`${tabStyle("mafia")} ${
            role !== "Mafia"
              ? "opacity-40 cursor-not-allowed"
              : ""
          }`}
        >
          <Skull className="w-4 h-4" />
          Mafia
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0 px-3 py-3">
        <div className="space-y-3">
          {filteredMessages.map((message, idx) => (
            <div key={`${message.id}-${idx}`} className="text-sm">
              
              {message.username === "System" ? (
                <div className="text-center text-yellow-700 italic text-xs border border-yellow-900 py-1 px-2 bg-black/20">
                  {message.text}
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 font-bold text-xs uppercase">
                      {message.username}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-orange-100 text-sm leading-relaxed break-words">
                    {message.text}
                  </p>
                </div>
              )}

            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-yellow-900 p-3 flex gap-2 bg-[#120000]">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={`Message ${activeTab}...`}
          className="flex-1 bg-black border-yellow-800 text-white placeholder:text-gray-500"
        />

        <Button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="bg-yellow-700 hover:bg-yellow-600 text-black"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PPMChatComp;