/* eslint-disable react/prop-types */

function ShowAddress({ ords }) {
  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#${ords._id}`}
      >
        See detail
      </button>

      <div
        className="modal fade"
        id={`${ords._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${ords._id}`}>
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
                    <td>Address Info:</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Room No: {ords.billing_Address.room_no}</td>
                  </tr>
                  <tr>
                    <td>Apartment Name: {ords.billing_Address.apt_name}</td>
                  </tr>
                  <tr>
                    <td>Area Name: {ords.billing_Address.area_name}</td>
                  </tr>
                  <tr>
                    <td>City: {ords.billing_Address.city_name}</td>
                  </tr>
                  <tr>
                    <td>Pin Code: {ords.billing_Address.pin_code}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowAddress;
