import React, { Fragment } from "react";

function Spinner() {
  return (
    <Fragment>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </Fragment>
  );
}

export default Spinner;
