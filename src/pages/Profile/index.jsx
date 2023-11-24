import React from "react";

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
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {bankAccountsList.map((bankAccount) => (
        <section className="account">
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
