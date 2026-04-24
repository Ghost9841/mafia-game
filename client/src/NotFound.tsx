export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#080808] relative overflow-hidden text-white flex items-center justify-center flex-col gap-4">
      
      {/* Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Glow */}
      <div className="fixed -bottom-[200px] -left-[100px] w-[700px] h-[700px] pointer-events-none z-0 bg-[radial-gradient(circle,rgba(160,0,0,0.2)_0%,transparent_70%)]" />

      {/* Content */}
      <h1 className="font-['Anton'] relative z-10 text-[120px] leading-none font-black text-[#e9b50b]">
        404
      </h1>
      <p className="relative z-10 text-xs tracking-[4px] text-white/40 uppercase">
        You went too deep
      </p>
      <a href="/" className="relative z-10 text-[#e9b50b] text-xs tracking-[2px] hover:underline">
        ← Return Home
      </a>
    </div>
  );
};

export default NotFound;