import React from "react";
import { AddSubscriptionServices } from "../add-subscription-services";
import { IAuthContext, ISubsciptionServices } from "../../../interface";
import { AuthContext } from "../../../context";
import { functions } from "../../../firebase";
import { httpsCallable } from "firebase/functions";
import { Button } from "../../button";
export const YOUR_SUBSCRIPTIONS = () => {
  const { currentUser } = React.useContext(AuthContext) as IAuthContext;
  const [subscriptionServices, setSubscriptionServices] =
    React.useState<ISubsciptionServices[]>();

  React.useEffect(() => {
    const getSubscriptionServices = httpsCallable(
      functions,
      "getSubscriptionServices"
    );

    getSubscriptionServices().then((result) => {
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
      <AddSubscriptionServices />
      <div>
        <h1>Your Subscriptions</h1>
        <ul>
          {subscriptionServices?.map((subscriptionService) => (
            <li key={subscriptionService.id}>
              <span>{subscriptionService.name}</span>
              <Button.SecondaryOutline>Delete</Button.SecondaryOutline>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
