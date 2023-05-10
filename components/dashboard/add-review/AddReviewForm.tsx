import React from "react";
import { Button } from "../../button";
import { Spacer } from "../../spacer";
import { AddReviewContext } from "../../../context";
import {
  IAddReviewContext,
  IAddReviewDto,
  IAddSubscriptionServicesDto,
} from "../../../interface";
import { Input } from "../../input";
import { Select } from "../../select";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase";
export const AddReviewForm = () => {
  const { dialog, subscriptionServiceId } = React.useContext(
    AddReviewContext
  ) as IAddReviewContext;
  const form = React.useRef<HTMLFormElement>(null);
  const [payload, setPayload] = React.useState<IAddReviewDto>({
    review: "",
    rating: "",
    subscriptionServiceId: subscriptionServiceId,
  });

  return (
    <form
      ref={form}
      onSubmit={(event) => {
        event.preventDefault();
        const postSubscriptionServiceReview = httpsCallable(
          functions,
          "postSubscriptionServiceReview"
        );
        postSubscriptionServiceReview({
          ...payload,
          rating: Number(payload.rating),
        }).then((result: any) => {
          if (!result.data) return;
          dialog.current?.close();
          window.location.reload();
        });
      }}
    >
      <Input.TextArea
        onChange={(event) => {
          setPayload({
            ...payload,
            review: event.target.value,
          });
        }}
        required={false}
        value={payload.review}
        autoComplete="off"
        id="review"
        label="Review"
      />
      <Spacer direction="vertical" size={16} />
      <Input.Text
        value={payload.rating}
        onChange={(event) => {
          if (
            !isNaN(Number(event.target.value)) &&
            Number(event.target.value) <= 5
          ) {
            setPayload({
              ...payload,
              rating: event.target.value,
            });
          }
        }}
        name="rating"
        label="Rating (out of 5)"
        autoComplete="off"
        id="rating"
        required={true}
      />
      <Spacer direction="vertical" size={16} />
      <div className="row nowrap">
        <Button.SecondaryOutline onClick={() => dialog.current?.close()}>
          Close
        </Button.SecondaryOutline>
        <Spacer direction="horizontal" size={16} />
        <Button.Primary type="submit">Add</Button.Primary>
      </div>
    </form>
  );
};
