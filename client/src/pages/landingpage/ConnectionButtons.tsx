'use client';
import { Button } from '@/components/ui/button'
import { socket } from '@/services/server';
import React, { useEffect, useState } from 'react'

const ConnectionButtons = () => {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
    socket.on("connect", () => {
        console.log("connected with id:", socket.id);
        setConnected(true);
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
        setConnected(false);
    });

    return () => {
        socket.off("connect");
        socket.off("disconnect");
    }
}, [])

    return (
        <div className="flex flex-row gap-4 mb-4 justify-center items-center">
            <p>Status: {connected ? "Connected" : "Disconnected"}</p>
            {!connected && (
                <Button onClick={() => socket.connect()}>
                    Create Room
                </Button>
            )}
            {!connected ? (
                <Button onClick={() => socket.connect()}>
                    Join Room
                </Button>
            ) : (
                <Button className=""
                    onClick={() => socket.disconnect()}>
                    Leave Room
                </Button>
            )}

        </div>
    )
}

export default ConnectionButtons;