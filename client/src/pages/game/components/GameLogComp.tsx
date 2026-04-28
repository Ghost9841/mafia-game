import { ScrollArea } from "@/components/ui/scroll-area";

type LogEntry = {
  phase: string; // "Night 1", "Day 2"
  events: string[];
};

type GameLogCompProps = {
  logs: LogEntry[];
};

export const GameLogComp = ({ logs }: GameLogCompProps) => {
  return (
    <div className="w-full border border-yellow-700 bg-[#2a0000] rounded-sm overflow-hidden">
      
      {/* Header */}
      <div className="border-b border-yellow-700 px-4 py-2 text-center">
        <h2 className="text-yellow-500 font-bold tracking-wide text-sm uppercase">
          Game Log
        </h2>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="h-[200px]">
        <div className="p-3 space-y-4">
          {logs.map((log, idx) => (
            <div key={idx} className="border-b border-yellow-900 pb-3 last:border-none">
              
              {/* Phase Title */}
              <h3 className="text-yellow-400 font-bold text-xs uppercase mb-2">
                {log.phase}
              </h3>

              {/* Events */}
              <div className="space-y-1">
                {log.events.map((event, eventIdx) => (
                  <p
                    key={eventIdx}
                    className="text-[11px] leading-relaxed text-orange-100"
                  >
                    {event}
                  </p>
                ))}
              </div>

            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default GameLogComp;