export default function Pokeball({ className, size = 64 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#f1f3f9" stroke="#0e1016" strokeWidth="6" />
      <path d="M4 50a46 46 0 0 1 92 0Z" fill="#e5484d" stroke="#0e1016" strokeWidth="6" />
      <line x1="4" y1="50" x2="96" y2="50" stroke="#0e1016" strokeWidth="6" />
      <circle cx="50" cy="50" r="13" fill="#f1f3f9" stroke="#0e1016" strokeWidth="6" />
    </svg>
  );
}