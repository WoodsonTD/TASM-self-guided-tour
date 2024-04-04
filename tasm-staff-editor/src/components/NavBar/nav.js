import React from 'react'

function Nav({selected, setSelected}) {

  return (
    <div>
      <span className="nav">
        <a href='https://console.firebase.google.com/u/1/project/tasm-tour/analytics/app/web:NTQ5NzcyYjMtMTkyYS00NTJhLWEwNGItNGVlMzgwMGNmZDdi/overview/reports~2Fdashboard%3Fr%3Dfirebase-overview&fpn%3D602869699809'>Firebase Analytics Link</a>
      </span>
      {selected ?
        <span className="nav">
          <button onClick={() => setSelected(null)}>Back</button>
        </span>
        : null
      }
    </div>
  )
}

export default Nav;
