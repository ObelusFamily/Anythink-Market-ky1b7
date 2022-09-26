import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";
import React from "react";

const ItemList = (props) => {
  if (!props.items) {
    return <div className="py-4">Loading...</div>;
  }

  if (props.items.length === 0) {
    if (props.searchQuery != null) {
      return (
        <>
          <div className="py-4 no-items">Search yielded no results</div>
          <div
            id="empty"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "160px",
                width: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#662d85",
              }}
            >
              {/* It's unclear where we can get the icon from the design - this is close enough */}
              <i className="ion-sad" style={{ fontSize: "64px" }}></i>
              <div>
                No items found for <strong>"boring {props.searchQuery}"</strong>
                .
              </div>
            </div>
          </div>
        </>
      );
    }
    return <div className="py-4 no-items">No items are here... yet.</div>;
  }

  return (
    <div className="container py-2">
      <div className="row">
        {props.items.map((item) => {
          return (
            <div className="col-sm-4 pb-2" key={item.slug}>
              <ItemPreview item={item} />
            </div>
          );
        })}
      </div>

      <ListPagination
        pager={props.pager}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default ItemList;
