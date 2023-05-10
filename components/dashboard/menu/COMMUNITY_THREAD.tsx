import { httpsCallable } from "firebase/functions";
import React from "react";
import { functions } from "../../../firebase";
import { Card } from "../../card";
import { IReview } from "../../../interface";
import { getTimeDiff } from "../../../utils";
export const COMMUNITY_THREAD = () => {
  const [reviews, setReviews] = React.useState<IReview[]>();

  React.useEffect(() => {
    const getReviews = httpsCallable(
      functions,
      "getSubscriptionServiceReviews"
    );

    getReviews().then((result) => {
      if (!result.data) return;
      console.log(result.data);
      setReviews(
        Object.keys(result.data as any)
          .map((key) => {
            return {
              id: key,
              ...(result.data as any)[key],
            };
          })
          .reverse()
      );
    });
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh - 32px)",
        overflowY: "scroll",
      }}
    >
      {reviews?.map((review, index) => (
        <div key={index}>
          <Card.SecondaryOutline style={{ width: "100%" }} key={index}>
            <div
              style={{ alignItems: "center", justifyContent: "space-between" }}
              className="row"
            >
              <h1>{review.subscriptionServiceName}</h1>
              <p>Posted {getTimeDiff(review.createdAt)}</p>
            </div>
            <p>Posted By: {review.postedBy}</p>
            <p>Ratings: {review.rating} out of 5</p>
            <p>Review: {review.review}</p>
          </Card.SecondaryOutline>
          <br />
        </div>
      ))}
    </div>
  );
};
