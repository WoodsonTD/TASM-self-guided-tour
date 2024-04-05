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
    <tr className="my-20 border-collapse border-t-2 border-opacity-50 border-darkBlue" key={exhibit.id}>
      <td className="bg-opacity-15 bg-lightBlue  rounded-l-xl">{exhibit.data().title}</td>
      <td className="bg-opacity-15 bg-lightBlue">{exhibit.data().exhibitID}</td>
      <td className="bg-opacity-15 bg-lightBlue">
        <Button
          label="EDIT"
          onClick={() => setEntry(exhibit.id)}
          icon={null}
          className="btn rounded-md py-0.5 px-3 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
        />
      </td>
      {/* <td>HIDE</td> */}
      <td className="bg-opacity-15 bg-lightBlue">ORDER</td>
      <td className="bg-opacity-15 bg-lightBlue">Move Up</td>
      <td className="bg-opacity-15 bg-lightBlue">Move Down</td>
      <td className="bg-opacity-15 bg-lightBlue rounded-r-xl">
        <Button
          label="DELETE"
          onClick={handleDelete}
          icon={null}
          className="btn rounded-md py-0.5 px-3 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)] align-"
        />
      </td>
    </tr>
  );
}
