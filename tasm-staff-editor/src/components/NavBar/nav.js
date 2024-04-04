import React from 'react'

function Nav({selected, setSelected}) {

  const handleBack = () => {
    const confirmDelete = window.confirm("Are you sure you want to go back? Any unsaved changes will be lost.");
    if (confirmDelete) {
      setSelected(null);
    }
  }

  return (
    <div>
      <span className="nav">
        <a href='https://console.firebase.google.com/u/1/project/tasm-tour/analytics/app/web:NTQ5NzcyYjMtMTkyYS00NTJhLWEwNGItNGVlMzgwMGNmZDdi/overview/reports~2Fdashboard%3Fr%3Dfirebase-overview&fpn%3D602869699809'>Firebase Analytics Link</a>
      </span>
      {selected ?
        <span className="nav">
          <button onClick={handleBack}>Back</button>
        </span>
        : null
      }
    </div>
  )
}

export default Nav;
