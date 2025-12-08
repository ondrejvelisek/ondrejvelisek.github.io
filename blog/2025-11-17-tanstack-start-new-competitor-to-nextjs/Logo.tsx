export default function Logo(props) {
  return (
    <div className={`flex justify-end z-20 relative ${props.cls}`}>
      <img
        alt={props.alt}
        className="w-8 h-8 -m-4 relative -left-8"
        {...props}
      />
    </div>
  );
}
