import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { socket } from "@/services/server";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
    id?: string;
    username: string;
    text: string;
    timestamp: Date;
};

export const ChatBox = ({ username }: { username: string }) => {
    const [msg, setMsg] = useState<Message[]>([
        {
            id: "system-1",
            username: "System",
            text: "Welcome to the chat!",
            timestamp: new Date(),
        }
    ]);
    const [newMessage, setNewMessage] = useState("");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        const message: Message = {
            id: socket.id,
            username: username,
            text: newMessage,
            timestamp: new Date(),
        };

        socket.emit("send_message", { message });
        setMsg((prev) => [...prev, message]);
        setNewMessage("");
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        socket.on("receive_message", (data) => {
            setMsg((prev) => [
                ...prev,
                {
                    ...data.message,
                    timestamp: new Date(data.message.timestamp),
                },
            ]);
        })
        socket.on("roomMaAayo", (data) => {
            setMsg((prev) => [
                ...prev,
                {
                    id: "system-",
                    username: "System",
                    text: data.message,
                    timestamp: new Date(),
                },
            ]);
        });
        return () => {
            socket.off("receive_message");
            socket.off("roomMaAayo");
        };
    }, []);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex-1 border border-gray-200 rounded-lg p-4 flex flex-col h-full">
            <h2 className="text-lg font-bold mb-2">Chat Box</h2>

            <div className="flex-1 overflow-y-auto mb-3 space-y-2 pr-2">
                {msg.map((msg) => (
                    <div key={msg.id} className="text-sm">
                        {msg.username === "System" ? (
                            <div className="text-center text-white italic">
                                {msg.text}
                            </div>
                        ) : (
                            <>
                                <span className="font-semibold text-white">{msg.username}:</span>{' '}
                                <span className="text-gray-300">{msg.text}</span>
                                <span className="text-xs text-gray-500 ml-2">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2">
                <Input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={handleKeyPress}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className={`px-4 py-2 rounded-lg transition-colors ${newMessage.trim()
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default ChatBox;