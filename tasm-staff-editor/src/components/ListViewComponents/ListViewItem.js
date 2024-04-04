import Button from "../ButtonPanel/Button";
export default function ListViewItem({ exhibit, setEntry }) {
  if (!exhibit) {
    console.error("ERROR: exhibit is null");
    return null;
  }
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exhibit?");
    if (confirmDelete) {
      // Perform the delete operation here
      // Still needs to be added
      console.warn("Delete operation not yet implemented!");
    }
  };

  return (
    <tr key={exhibit.id}>
      <td>{exhibit.data().title}</td>
      <td>{exhibit.data().exhibitID}</td>
      <td>
        <Button
          label="EDIT"
          onClick={() => setEntry(exhibit.id)}
          icon={null}
          className="btn rounded-md py-0.5 px-3 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
        />
      </td>
      {/* <td>HIDE</td> */}
      <td>ORDER</td>
      <td>Move Up</td>
      <td>Move Down</td>
      <td>
        <Button
          label="DELETE"
          onClick={handleDelete}
          icon={null}
          className="btn rounded-md py-0.5 px-3 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
        />
      </td>
    </tr>
  );
}
