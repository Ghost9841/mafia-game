export const NightPhase = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Night Phase</h1>
        <p className="text-gray-700 mb-4 text-center">
          The werewolves are choosing their victim...
        </p>
        {/* Placeholder for night actions */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6 h-64 overflow-y-auto">
          <p className="text-gray-500 text-center mt-20">Night Actions Area</p>
        </div>
      </div>
    </div>
  );
};

export default NightPhase;