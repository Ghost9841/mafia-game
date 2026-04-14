export const RoleReveal = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Role Reveal</h1>
        <p className="text-gray-700 mb-4 text-center">
          Your role is: <span className="font-bold text-blue-500">Villager</span>
        </p>
        {/* Placeholder for role details */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6 h-64 overflow-y-auto">
          <p className="text-gray-500 text-center mt-20">Role Details Area</p>
        </div>
      </div>
    </div>
  );
};

export default RoleReveal;