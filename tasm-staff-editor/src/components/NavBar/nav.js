import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';
import Button from '../ButtonPanel/Button';

function Nav({ entry, setEntry, setIsSignUpVisible }) {

  const handleBack = () => {
    const confirmDelete = window.confirm("Are you sure you want to go back? Any unsaved changes will be lost.");
    if (confirmDelete) {
      setEntry(null);
    }
  }

  return (
    <div className='flex flex-row-reverse justify-between mb-3'>
      <span className=''>
        <a
          className="nav py-2 px-4"
          href='https://console.firebase.google.com/u/1/project/tasm-tour/analytics/app/web:NTQ5NzcyYjMtMTkyYS00NTJhLWEwNGItNGVlMzgwMGNmZDdi/overview/reports~2Fdashboard%3Fr%3Dfirebase-overview&fpn%3D602869699809'>Firebase Analytics Link</a>
      </span>
      {entry ?
        <span className="">
          <Button
          onClick={handleBack}
          label="Back"
          icon={ChevronDoubleLeftIcon}
          iconProps={{className: "w-5 h-5"}}
          iconPosition="left"
          className={"btn_nav py-2 px-4"}
          />
        </span>
        :
        <span className="">
          <Button
          onClick={() => setIsSignUpVisible(true)}
          label="Sign Up"
          className={"btn_nav py-2 px-4"}
        />
      </span>
      }
    </div>
  )
}

export default Nav;
