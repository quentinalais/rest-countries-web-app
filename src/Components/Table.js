import { useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

function Table({ rowData, colDefs, onRowClicked }) {
  const gridRef = useRef();
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];
  const [activeTab, setActiveTab] = useState("all");

  const statuses = {
    all: "All",
    favorites: "Favourites",
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);

  const handleTabClick = useCallback((status) => {
    setActiveTab(status);
    gridRef.current.api
      .setColumnFilterModel(
        "Favorites",
        status === "all"
          ? null
          : { filterType: "text", type: "startsWith", filter: "favorite" }
      )
      .then(() => gridRef.current.api.onFilterChanged());
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <div className="global-filter">
        <span>Global Filter:</span>
        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          onInput={onFilterTextBoxChanged}
        />
      </div>

      <div>
        {Object.entries(statuses).map(([key, displayValue]) => (
          <button
            className={`tabButton${activeTab === key ? "_active" : ""}`}
            onClick={() => handleTabClick(key)}
            key={key}
          >
            {displayValue}
          </button>
        ))}
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        onRowClicked={onRowClicked}
      />
    </div>
  );
}

export default Table;
