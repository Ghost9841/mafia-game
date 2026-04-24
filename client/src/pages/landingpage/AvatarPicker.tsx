// AvatarPicker.tsx
// Add more chars to this array as you get more artwork
import mafiaChar from "@/assets/charpreset/mafiachar.png";

const CHAR_PRESETS = [
  { name: "The Don", url: mafiaChar },
  // add more like:
  { name: "Detective", url: mafiaChar },
  { name: "Doctor", url: mafiaChar },
];

type AvatarPickerProps = {
  onSelect: (url: string) => void;
  onClose: () => void;
};

export const AvatarPicker = ({ onSelect, onClose }: AvatarPickerProps) => {
  return (
    <div className="avatar-picker-overlay" onClick={onClose}>
      <div className="avatar-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="avatar-picker-header">
          <p className="home-section-label">CHOOSE YOUR CHARACTER</p>
          <button className="avatar-picker-close" onClick={onClose}>✕</button>
        </div>
        <div className="avatar-picker-grid">
          {CHAR_PRESETS.map((char) => (
            <div
              key={char.name}
              className="avatar-picker-item"
              onClick={() => onSelect(char.url)}
            >
              <img src={char.url} alt={char.name} className="avatar-picker-img" />
              <span className="avatar-picker-name">{char.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarPicker;