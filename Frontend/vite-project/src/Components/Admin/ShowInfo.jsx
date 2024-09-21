/* eslint-disable react/prop-types */
function ShowInfo({ ords }) {
  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#${ords.orderId}`}
      >
        See detail
      </button>

      <div
        className="modal fade"
        id={`${ords.orderId}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${ords.orderId}`}>
                Details:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <td>Product Info:</td>
                  </tr>
                </thead>
                {ords.products.map((item) => {
                  return (
                    <tbody
                      key={item.productId}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <tr>
                        <td>{item.name}</td>
                      </tr>
                      <tr>
                        <td>{item.quantity}</td>
                      </tr>
                      <tr>
                        <td>{item.price}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowInfo;
