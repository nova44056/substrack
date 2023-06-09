import React from "react";
import { AddSubscriptionServices } from "../add-subscription-services";
import { ISubsciptionServices } from "../../../interface";

import { functions } from "../../../firebase";
import { httpsCallable } from "firebase/functions";
import { Button } from "../../button";
import { CostBreakdown } from "../cost-breakdown/CostBreakdown";
import { Spacer } from "../../spacer";
import { Card } from "../../card";
import { AddReview } from "../add-review";
import { Spinner } from "../../loading";
export const YOUR_SUBSCRIPTIONS = () => {
  const [subscriptionServices, setSubscriptionServices] =
    React.useState<ISubsciptionServices[]>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getSubscriptionServices = httpsCallable(
      functions,
      "getSubscriptionServices"
    );

    getSubscriptionServices().then((result) => {
      if (!result.data) return;
      setSubscriptionServices(
        Object.keys(result.data as any).map((key) => {
          return {
            id: key,
            ...(result.data as any)[key],
          };
        })
      );
    });
  }, []);

  return (
    <>
      <CostBreakdown />
      <Spacer direction="vertical" size={16} />
      <div>
        <div style={{ justifyContent: "space-between" }} className="row">
          <h1>Your Subscriptions</h1>
          <AddSubscriptionServices />
        </div>
        <Spacer direction="vertical" size={16} />
        <ul
          style={{
            height: "calc(100vh - 91.53px - 91.53px - 35.99px)",
            overflowY: "scroll",
          }}
        >
          <Spacer direction="vertical" size={16} />
          {subscriptionServices?.map((subscriptionService, index) => (
            <div key={index}>
              <Card.SecondaryOutline style={{ width: "100%" }} role="list">
                <h2>{subscriptionService.name}</h2>
                <p>Cost: ${subscriptionService.cost}</p>
                <p style={{ textTransform: "capitalize" }}>
                  Billing Period: {subscriptionService.billingPeriod}
                </p>
                <AddReview subscriptionServiceId={subscriptionService.id} />
                <Spacer direction="vertical" size={8} />
                <Button.Primary
                  disabled={loading}
                  onClick={() => {
                    setLoading(true);
                    const deleteSubscriptionService = httpsCallable(
                      functions,
                      "deleteSubscriptionService"
                    );
                    deleteSubscriptionService({
                      subscriptionServiceId: subscriptionService.id,
                    }).then((result) => {
                      setLoading(false);
                      window.location.reload();
                    });
                  }}
                >
                  {loading ? (
                    <Spinner visible color="#fff" size={16} />
                  ) : (
                    "Delete"
                  )}
                </Button.Primary>
              </Card.SecondaryOutline>
              <Spacer direction="vertical" size={16} />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
