// PresetsCustomSettings.tsx - Fixed Size with No Glitching
import { useState } from 'react';
import { Settings, BookOpen, Crown, Lock, Check } from 'lucide-react';

// Define types to fix TypeScript error
type Preset = {
    name: string;
    emoji: string;
    isPremium: boolean;
    roles: string[];
    roleIcons?: Record<string, string>; // Optional property
};

type PresetCustomSettingsProps = {
    isHost: boolean;
};

export const PresetCustomSettings = ({ isHost }: PresetCustomSettingsProps) => {
    const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
    const [hoveredPreset, setHoveredPreset] = useState<string | null>(null);
    const [selectedPresets, setSelectedPresets] = useState<string[]>(['classic']);

    const handleTabChange = (tab: 'presets' | 'custom') => {
        if (!isHost) return;
        setActiveTab(tab);
    };

    const presets: Record<string, Preset> = {
        classic: {
            name: "Classic",
            emoji: "🎭",
            isPremium: false,
            roles: ["Godfather", "Mafia", "Doctor", "Detective", "Villager"]
        },
        crazy: {
            name: "Crazy",
            emoji: "🤪",
            isPremium: false,
            roles: ["Vigilante", "Mayor", "Framer", "Executioner", "Jester"]
        },
        chaos: {
            name: "Chaos",
            emoji: "🌀",
            isPremium: false,
            roles: ["PI", "Spy", "Distractor", "Baiter", "Bomber"]
        },
        corona: {
            name: "Corona",
            emoji: "🦠",
            isPremium: false,
            roles: ["Watcher", "Plague Doctor", "Hoarder", "Hacker", "Goose"]
        },
        crimson: {
            name: "Crimson",
            emoji: "❤️",
            isPremium: false,
            roles: ["Link", "Mimic", "Alchemist"]
        },
        premium: {
            name: "Premium",
            emoji: "💎",
            isPremium: true,
            roles: ["Isekai", "Santa", "Silencer", "Gambler", "Shaman"],
            roleIcons: {
                Isekai: "✨",
                Santa: "🎅",
                Silencer: "🔇",
                Gambler: "🎲",
                Shaman: "🪶"
            }
        }
    };

    const togglePreset = (key: string, isPremium: boolean) => {
        if (!isHost || isPremium) return;

        setSelectedPresets(prev => {
            if (prev.includes(key)) {
                return prev.filter(p => p !== key);
            } else {
                return [...prev, key];
            }
        });
    };

    return (
        <div className="h-full w-full flex flex-col">
            {/* Toggle Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 flex-shrink-0">
                <div>
                    <h2 className="text-lg font-bold">Game Settings</h2>
                    {!isHost && (
                        <p className="text-xs text-gray-500">View only — waiting for host to update settings.</p>
                    )}
                </div>

                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        type="button"
                        disabled={!isHost}
                        onClick={() => handleTabChange('presets')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'presets'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            } ${!isHost ? 'cursor-not-allowed opacity-70' : ''}`}
                    >
                        <BookOpen className="w-4 h-4" />
                        Presets
                    </button>

                    <button
                        type="button"
                        disabled={!isHost}
                        onClick={() => handleTabChange('custom')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'custom'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            } ${!isHost ? 'cursor-not-allowed opacity-70' : ''}`}
                    >
                        <Settings className="w-4 h-4" />
                        Custom
                    </button>
                </div>
            </div>

            {/* Content - Fixed Size Grid */}
            {activeTab === 'presets' ? (
                <div className="grid grid-cols-2 gap-3 overflow-y-auto flex-1 pr-1">
                    {Object.entries(presets).map(([key, preset]) => {
                        const isSelected = selectedPresets.includes(key);
                        const disabledPreset = !isHost || preset.isPremium;

                        return (
                            <div
                                key={key}
                                onMouseEnter={() => setHoveredPreset(key)}
                                onMouseLeave={() => setHoveredPreset(null)}
                                onClick={() => !disabledPreset && togglePreset(key, preset.isPremium)}
                                className={`
                  border-2 rounded-lg p-3 transition-all
                  w-full h-[140px] overflow-hidden
                  ${disabledPreset
                                        ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-70'
                                        : 'cursor-pointer ' + (isSelected ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50')
                                    }
                `}
                            >
                                <div className="h-full w-full overflow-y-auto custom-scrollbar">
                                    {hoveredPreset === key ? (
                                        /* Show Roles on Hover with Fade In */
                                        <div className="animate-fadeIn">
                                            <div className="space-y-1">
                                                {preset.roles.map((role, idx) => (
                                                    <div key={idx} className="text-sm text-gray-700 flex items-center gap-1">
                                                        {preset.roleIcons?.[role] && (
                                                            <span>{preset.roleIcons[role]}</span>
                                                        )}
                                                        <span>{role}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        /* Show Preset Info */
                                        <div className="h-full flex flex-col">
                                            <div className="h-full flex flex-col">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex flex-col items-center justify-center flex-1 text-center">
                                                        <div className="text-3xl">{preset.emoji}</div>
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900 flex items-center gap-2 mt-1 justify-center">
                                                                {preset.name}
                                                                {preset.isPremium && (
                                                                    <Lock className="w-3 h-3 text-gray-500" />
                                                                )}
                                                            </h3>
                                                            <p className="text-xs text-gray-500">
                                                                {preset.roles.length} roles
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Selection Checkmark */}
                                                    {isSelected && !preset.isPremium && (
                                                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                                            <Check className="w-3 h-3 text-white" />
                                                        </div>
                                                    )}
                                                </div>


                                               
                                            </div>

                                            {preset.isPremium && (
                                                <div className="mt-2 flex items-center gap-1 text-xs text-amber-600 bg-amber-50 p-1.5 rounded-md">
                                                    <Crown className="w-3 h-3" />
                                                    <span>Premium Exclusive</span>
                                                </div>
                                            )}

                                            {/* Selected roles preview */}
                                            {isSelected && !preset.isPremium && (
                                                <div className="mt-2 pt-2 border-t border-blue-200">
                                                    <div className="flex flex-wrap gap-1">
                                                        {preset.roles.slice(0, 3).map((role, idx) => (
                                                            <span key={idx} className="text-xs text-blue-700">
                                                                {role}{idx < 2 ? " •" : ""}
                                                            </span>
                                                        ))}
                                                        {preset.roles.length > 3 && (
                                                            <span className="text-xs text-blue-500">
                                                                +{preset.roles.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-3 flex-1">
                    <p className="text-gray-600 text-sm">Custom settings coming soon...</p>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <span className="text-sm font-medium">Night Phase Duration</span>
                            <select disabled={!isHost} className={`border rounded-md px-2 py-1 text-sm ${!isHost ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}`}>
                                <option>30 seconds</option>
                                <option>45 seconds</option>
                                <option>60 seconds</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <span className="text-sm font-medium">Discussion Time</span>
                            <select disabled={!isHost} className={`border rounded-md px-2 py-1 text-sm ${!isHost ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}`}>
                                <option>60 seconds</option>
                                <option>90 seconds</option>
                                <option>120 seconds</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <span className="text-sm font-medium">Reveal Roles on Death</span>
                            <button disabled={!isHost} className={`w-10 h-5 rounded-full relative ${!isHost ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300'}`}>
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${!isHost ? 'left-1' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PresetCustomSettings;