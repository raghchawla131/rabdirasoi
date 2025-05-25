import './Overlay.css';
export default function CartOverlay({ isVisible, onClick }) {
  if (!isVisible) return null;

  return <div className="overlayCart" onClick={onClick}></div>;
}
