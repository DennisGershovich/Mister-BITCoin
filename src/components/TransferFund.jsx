import { userService } from "../services/userService";
import { useRef } from "react";

export const TransferFund = ({ userName, userId, onTransfer }) => {
  const inputRef = useRef();
  const transferCoins = () => {
    const logedInUser = userService.getUser();
    const transferAmount = +inputRef.current.value;
    userService.addMove(logedInUser, transferAmount, userName);
    inputRef.current.value = "";
    onTransfer();
  };
  return (
    <div className="transfer-fund-box">
      <h4 className="transfer-fund-box-title">
        Transfer coins to {userName} :
      </h4>
      <div className="transfer-fund-box-input-box">
        <input className="transfer-fund-box-input" type="text" ref={inputRef} />
        <button
          className="transfer-fund-box-btn"
          onClick={() => transferCoins()}
        >
          Transfer
        </button>
      </div>
    </div>
  );
};
