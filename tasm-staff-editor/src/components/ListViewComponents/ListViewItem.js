import Button from "../ButtonPanel/Button";
export default function ListViewItem({ exhibit }) {
  if (!exhibit) {
    console.error("ERROR: exhibit is null");
    return null;
  }
  return (
    <tr key={exhibit.id}>
      <td>{exhibit.data().title}</td>
      <td>{exhibit.data().fourDigitCode}</td>
      <td><Button
        label="EDIT"
        onClick={() => console.log('Next clicked')}
        icon={null}
        className="btn rounded-r-full pr-1 pl-3 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
      /></td>
      <td>HIDE</td>
      <td>ORDER</td>
      <td>Move Up</td>
      <td>Move Down</td>
      <td>Delete Exhibit Page</td>
    </tr>
  );
}
