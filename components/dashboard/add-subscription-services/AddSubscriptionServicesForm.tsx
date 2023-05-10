import React from "react";
import { Button } from "../../button";
import { Spacer } from "../../spacer";
import { AddSubscriptionServicesContext } from "../../../context";
import {
  IAddSubscriptionServicesContext,
  IAddSubscriptionServicesDto,
} from "../../../interface";
import { Input } from "../../input";
import { Select } from "../../select";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase";
import { useRouter } from "next/router";
export const AddSubscriptionServicesForm = () => {
  const { dialog } = React.useContext(
    AddSubscriptionServicesContext
  ) as IAddSubscriptionServicesContext;
  const form = React.useRef<HTMLFormElement>(null);
  const [payload, setPayload] = React.useState<IAddSubscriptionServicesDto>({
    name: "",
    description: "",
    cost: "",
    billingPeriod: "",
  });

  const router = useRouter();
  return (
    <form
      ref={form}
      onSubmit={(event) => {
        event.preventDefault();
        if (form.current?.reportValidity()) {
          const addSubscriptionServices = httpsCallable(
            functions,
            "addSubscriptionServices"
          );
          addSubscriptionServices({
            ...payload,
            cost: Number(payload.cost),
          }).then((result: any) => {
            if (result.data.success) {
              dialog.current?.close();
              window.location.reload();
            }
          });
        }
      }}
    >
      <Input.Text
        value={payload.name}
        onChange={(event) => {
          setPayload({
            ...payload,
            name: event.target.value,
          });
        }}
        name="name"
        label="Name"
        autoComplete="off"
        id="name"
        required={true}
      />
      <Spacer direction="vertical" size={16} />
      <Input.TextArea
        onChange={(event) => {
          setPayload({
            ...payload,
            description: event.target.value,
          });
        }}
        required={false}
        value={payload.description}
        autoComplete="off"
        id="description"
        label="Description"
      />
      <Spacer direction="vertical" size={16} />
      <Input.Text
        value={payload.cost}
        onChange={(event) => {
          if (!isNaN(Number(event.target.value))) {
            setPayload({
              ...payload,
              cost: event.target.value,
            });
          }
        }}
        name="cost"
        label="Cost ($)"
        autoComplete="off"
        id="cost"
        required={true}
      />
      <Spacer direction="vertical" size={16} />
      <Select
        value={payload.billingPeriod}
        onChange={(event) => {
          setPayload({
            ...payload,
            billingPeriod: event.target.value,
          });
        }}
        label="Billing Period"
        id="billing-period"
        name="billing-period"
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly" },
        ]}
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
