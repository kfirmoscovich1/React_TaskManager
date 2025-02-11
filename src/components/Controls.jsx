import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import imgFilter from "../images/filter.png";
import imgSort from "../images/sort.png";

export default function TaskControls({
  searchQuery,
  setSearchQuery,
  sortType,
  setSortType,
  filterStatus,
  setFilterStatus,
}) {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <div className="d-flex justify-content-end align-items-center gap-2 col-12 col-xs-auto">
      <input
        type="text"
        className="d-inline-flex align-items-center border border-secondary rounded p-2 bg-transparent text-secondary"
        style={{ width: "30%" }}
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />

      <div className="d-inline-flex align-items-center border border-secondary rounded p-2 bg-transparent text-secondary">
        <strong className="text-danger me-3">High</strong>
        <strong className="text-warning me-3">Medium</strong>
        <strong className="text-success">Low</strong>
      </div>

      <Dropdown>
        <Dropdown.Toggle id="sortDropdown" className="bg-transparent border-secondary p-2 text-secondary">
          <img src={imgSort} alt="Sort" style={{ maxHeight: "20px", marginRight: "8px", verticalAlign: "middle" }} />
          {sortType === "date" ? "By Date" : "By Priority"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortType("date")}>By Date</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortType("priority")}>By Priority</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle id="filterDropdown" className="bg-transparent border-secondary p-2 text-secondary">
          <img src={imgFilter} alt="Filter" style={{ maxHeight: "20px", marginRight: "8px", verticalAlign: "middle" }} />
          {filterStatus === "all"
            ? "All"
            : filterStatus === "open"
            ? "Open"
            : filterStatus === "done"
            ? "Closed"
            : "Archived"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setFilterStatus("all")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterStatus("open")}>Open</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterStatus("done")}>Closed</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterStatus("archived")}>Archived</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}