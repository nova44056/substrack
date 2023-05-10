import { httpsCallable } from "firebase/functions";
import React from "react";
import { functions } from "../../../firebase";
import { Spacer } from "../../spacer";
import { Card } from "../../card";
export const CostBreakdown = () => {
  const [totalMonthlyCost, setTotalMonthlyCost] = React.useState<number | null>(
    null
  );

  const [totalYearlyCost, setTotalYearlyCost] = React.useState<number | null>(
    null
  );
  React.useEffect(() => {
    const getCostBreakdown = httpsCallable(functions, "getCostBreakdown");
    getCostBreakdown().then((result) => {
      if (!result.data) {
        setTotalMonthlyCost(0);
        setTotalYearlyCost(0);
      } else {
        setTotalYearlyCost(Number((result.data as any).totalYearlyCost));
        setTotalMonthlyCost(Number((result.data as any).totalMonthlyCost));
      }
    });
  }, []);

  return (
    <div className="row">
      <Card.Primary>
        <h1>
          <span>Estimiated Total Monthly Cost: </span>
        </h1>
        <p>
          <span>$</span>
          <span>
            {typeof totalMonthlyCost === "number"
              ? totalMonthlyCost.toFixed(2)
              : "Caculating..."}
          </span>
        </p>
      </Card.Primary>
      <Spacer direction="horizontal" size={32} />
      <Card.Primary>
        <h1>
          <span>Estimated Total Yearly Cost: </span>
        </h1>
        <p>
          <span>$</span>
          <span>
            {typeof totalYearlyCost === "number"
              ? totalYearlyCost.toFixed(2)
              : "Caculating..."}
          </span>
        </p>
      </Card.Primary>
    </div>
  );
};
