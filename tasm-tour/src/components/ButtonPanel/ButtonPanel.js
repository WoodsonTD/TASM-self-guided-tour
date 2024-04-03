import Button from './Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ButtonPanel({ setExhibitID, nextExhibit, prevExhibit }) {
  return (
    <div className="flex justify-around p-4">
      {prevExhibit ?
        <Button
          label="Prev"
          onClick={() => setExhibitID(prevExhibit)}
          icon={ChevronLeftIcon}
          iconProps={{ className: "w-7 h-7" }}
          iconPosition="left"
          className="btn rounded-l-full pl-1 pr-3 py-1 text-xl drop-shadow-[-2px_3px_4px_rgba(0,0,0,0.25)]"
        />
        : null}
      {nextExhibit ?
        <Button
          label="Next"
          onClick={() => setExhibitID(nextExhibit)}
          icon={ChevronRightIcon}
          iconProps={{ className: "w-7 h-7" }}
          iconPosition="right"
          className="btn rounded-r-full pr-1 pl-3 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
        />
        : null}
    </div>
  );
}
