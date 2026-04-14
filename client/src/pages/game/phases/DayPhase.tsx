export const DayPhase = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Day Phase</h1>
        <p className="text-gray-700 mb-4 text-center">
          Discuss and decide who to vote for.
        </p>
        {/* Placeholder for discussion area */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6 h-64 overflow-y-auto">
          <p className="text-gray-500 text-center mt-20">Discussion Area</p>
        </div>
        {/* Placeholder for voting button */}
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayPhase;