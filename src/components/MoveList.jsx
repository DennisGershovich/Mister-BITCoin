import { useEffect, useState, useContext } from "react";
import { userService } from "../services/userService";
import { AppContext } from "../App";

export const MoveList = ({ transfer, userName }) => {
  const [moves, setMoves] = useState(null);
  const btcUSDprice = useContext(AppContext);
  useEffect(() => {
    const user = userService.getUser();
    let moves = user.moves;
    if (userName) moves = user.moves.filter((move) => move.to === userName);
    else {
      if (moves.length > 3)
        moves = moves.splice(moves.length - 3, moves.length - 1);
    }
    setMoves(moves);
  }, [transfer]);
  return (
    <div className="moves">
      <h3 className="moves-header">
        {userName ? "Your Moves:" : "Your last 3 moves"}
      </h3>
      {moves &&
        moves.map(({ to, at, time, amount }) => (
          <div className="move-box" key={time}>
            <p className="amount">
              <span className="bit-coin">₿{amount}</span>|$
              {(amount * btcUSDprice.bitCoinUsdPrice).toFixed(2)}
            </p>
            <p className="time">
              {at},{time}
            </p>
          </div>
        ))}
    </div>
  );
};
