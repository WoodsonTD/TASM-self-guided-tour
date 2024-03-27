
export default function ExhibitTitle({ title = 'Exhibit Title' }) {
  return (
    <div>
      <h1 className="text-6xl text-black text-center shadow-xl">{title}</h1>
    </div>
  );
}
