import Button from "../ButtonPanel/Button";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';


/**
 * 
 * @param {*} exhibit Exhibit doc object from firestore, contains exhibit data
 * @param {*} setEntry Function to set the entry in the parent component, used to open the edit form
 * @param {*} handleOrderChange Function to handle order change
 * @param {*} order Order value to determine order of the exhibit in the list
 * @param {*} moveUp Function to move the exhibit up in the list
 * @param {*} moveDown Function to move the exhibit down in the list
 * @param {*} fetch Function to fetch the exhibits from firestore, refreshes the list
 * @param {*} index key value of item in list, used for alternating row colors
 * @returns ListViewItem, a row in the list of exhibits
 */
export default function ListViewItem({ exhibit, setEntry, handleOrderChange, order, moveUp, moveDown, fetch, index}) {
  const [displayOrder, setDisplayOrder] = useState(order);

  useEffect(() => {
    setDisplayOrder(order);
  }, [order]);


  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exhibit?");
    if (confirmDelete) {
      const superConfirm = window.confirm("Are you really sure you want to delete this exhibit?");
      if (superConfirm) {
        try {
          await deleteDoc(doc(db, "exhibits", exhibit.id));
          fetch();
        } catch (error) {
          console.error("ERROR: " + error);
        }
      }
    }
  };

  const bgOpacity = order < 0 ? "bg-opacity-0":(index % 2 === 0 ? "bg-opacity-20" : "bg-opacity-35");

  return (
    <tr className="border-t-8 border-darkBlue ">
      <td className={"max-w-0 md:w-auto md:max-w-none whitespace-nowrap bg-lightBlue rounded-l-xl " + bgOpacity}>
        {exhibit.title}
      </td>
      <td className={"text-ellipsis text-center md:text-left bg-lightBlue " + bgOpacity}>
        {exhibit.exhibitID}
      </td>
      <td className={"bg-lightBlue "+ bgOpacity}>
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
      <td className={"hidden md:w-16 md:table-cell bg-lightBlue "+ bgOpacity}>
        <input
          type="number"
          className="orderInput text-black"
          value={displayOrder}
          onChange={(e) => {
            setDisplayOrder(e.target.value);

          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleOrderChange(e, exhibit);
              //deselect the input
              e.target.blur();
            }}}
        />
      </td>
      <td className={"bg-lightBlue "+ bgOpacity}>
        <div className="flex justify-center">
          <Button
            label="MOVE"
            onClick={moveUp}
            icon={ChevronUpIcon}
            iconProps={{ className: "w-6 h-6 md:w-5 md:h-5 ml-0 md:ml-1" }}
            iconPosition="right"
            textVisibilityClass="hidden md:inline"
            className="btn rounded-md py-0.5 px-2 md:pl-3 md:pr-2 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          />
        </div>
      </td>
      <td className={"bg-lightBlue "+ bgOpacity}>
        <div className="flex justify-center">
          <Button
            label="MOVE"
            onClick={moveDown}
            icon={ChevronDownIcon}
            iconProps={{ className: "w-6 h-6 md:w-5 md:h-5 ml-0 md:ml-1" }}
            iconPosition="right"
            textVisibilityClass="hidden md:inline"
            className="btn rounded-md py-0.5 px-2 md:pl-3 md:pr-2 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          />
        </div>
      </td>
      <td className={"hidden sm:table-cell bg-lightBlue rounded-r-xl "+ bgOpacity}>
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
