import Button from "../ButtonPanel/Button";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ListViewItem({ exhibit, setEntry, handleOrderChange, order }) {
  const [displayOrder, setDisplayOrder] = useState(order);

  if (!exhibit) {
    console.error("ERROR: exhibit is null");
    return null;
  }
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exhibit?");
    if (confirmDelete) {
      // Perform the delete operation here
      // Still needs to be added
      const superConfirm = window.confirm("Are you really sure you want to delete this exhibit?");
      if (superConfirm) {
        try {
          await deleteDoc(doc(db, "exhibits", exhibit.id));
        } catch (error) {
          console.error("ERROR: " + error);
        }
      }
    }
  };

  return (
    <tr className="border-t-8 border-opacity-0 border-darkBlue" key={exhibit.id}>
      <td className="max-w-0 md:w-auto md:max-w-none whitespace-nowrap bg-opacity-15 bg-lightBlue rounded-l-xl">
        {exhibit.data().title}
      </td>
      <td className="text-ellipsis text-center md:text-left bg-opacity-15 bg-lightBlue">
        {exhibit.data().exhibitID}
      </td>
      <td className="bg-opacity-15 bg-lightBlue">
        <div className="flex justify-center">
          <Button
            label="EDIT"
            onClick={() => setEntry(exhibit.id)}
            icon={null}
            className="btn rounded-md py-0.5 px-3 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          />
        </div>
      </td>
      {/* <td>HIDE</td> */}
      <td className="hidden md:w-16 md:table-cell bg-opacity-15 bg-lightBlue">
        <input
          type="number"
          className="orderInput text-black"
          value={displayOrder}
          onChange={(e) => { handleOrderChange(e, exhibit); }}
        />
      </td>
      <td className="bg-opacity-15 bg-lightBlue">
        <div className="flex justify-center">
          <Button
            label="MOVE"
            onClick={null}
            icon={ChevronUpIcon}
            iconProps={{ className: "w-6 h-6 md:w-5 md:h-5 ml-0 md:ml-1" }}
            iconPosition="right"
            textVisibilityClass="hidden md:inline"
            className="btn rounded-md py-0.5 px-2 md:pl-3 md:pr-2 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          />
        </div>
      </td>
      <td className="bg-opacity-15 bg-lightBlue">
        <div className="flex justify-center">
          <Button
            label="MOVE"
            onClick={null}
            icon={ChevronDownIcon}
            iconProps={{ className: "w-6 h-6 md:w-5 md:h-5 ml-0 md:ml-1" }}
            iconPosition="right"
            textVisibilityClass="hidden md:inline"
            className="btn rounded-md py-0.5 px-2 md:pl-3 md:pr-2 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          />
        </div>
      </td>
      <td className="hidden sm:table-cell bg-opacity-15 bg-lightBlue rounded-r-xl">
        <div className="flex justify-center">
          <Button
            label="DELETE"
            onClick={handleDelete}
            icon={null}
            className="btn rounded-md py-0.5 px-3 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          />
        </div>
      </td>
    </tr>
  );
}
