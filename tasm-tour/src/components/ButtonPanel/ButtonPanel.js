import Button from './Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

export default function ButtonPanel({ exhibitID }) {
  return (
    <div className="flex">
      <Button
        label="Previous"
        onClick={() => console.log('Previous clicked')}
        icon={ChevronLeftIcon}
        iconProps={{ className: "w-5 h-5" }}
        iconPosition="left"
        className="rounded-l-full px-4 py-1"
      />
      <Button
        label="Next"
        onClick={() => console.log('Next clicked')}
        icon={ChevronRightIcon}
        iconProps={{ className: "w-5 h-5" }}
        iconPosition="right"
        className="rounded-r-full px-4 py-1"
      />
    </div>
  );
}
