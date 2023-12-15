import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/user/userSlice";

const bankAccountsList = [
  {
    type: "Checking",
    number: "8349",
    balance: "2,082.79",
    balanceType: "Available",
  },
  {
    type: "Savings",
    number: "6712",
    balance: "10,928.42",
    balanceType: "Available",
  },
  {
    type: "Credit Card",
    number: "8349",
    balance: "184.30",
    balanceType: "Current",
  },
];

function Profile() {
  const { isConnected, firstName, lastName, token } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (!isConnected) navigate("/login");
  });

  async function onSubmitClick() {
    try {
      await dispatch(
        updateUserProfile({ token, editedFirstName, editedLastName })
      ).unwrap();
      if (errorMessage) {
        setErrorMessage(null);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!isFormOpen && `${firstName} ${lastName}!`}
        </h1>
        {!isFormOpen && (
          <button className="edit-button" onClick={() => setIsFormOpen(true)}>
            Edit Name
          </button>
        )}
        {isFormOpen && (
          <form className="edit-form">
            <div className="edit-name-inputs-group right">
              <input
              className="edit-name-input"
                type="text"
                name="firstName"
                defaultValue={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
              />
              <input
                type="submit"
                name="submit"
                value="Save"
                className="edit-button"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitClick();
                }}
              />
            </div>
            <div className="edit-name-inputs-group left">
              <input
              className="edit-name-input"
                type="text"
                name="lastName"
                defaultValue={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
              />
              <button
              className="edit-button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsFormOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
            <div className="error-message">{errorMessage}</div>
          </form>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {bankAccountsList.map((bankAccount, index) => (
        <section className="account" key={index}>
          <div className="account-content-wrapper">
            <h3 className="account-title">
              Argent Bank {bankAccount.type} (x{bankAccount.number})
            </h3>
            <p className="account-amount">${bankAccount.balance}</p>
            <p className="account-amount-description">
              {bankAccount.balanceType} Balance
            </p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
}

export default Profile;
