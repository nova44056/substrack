import React from "react";
import styles from "../../styles/Register.module.css";
import { Layout } from "../../../components/layout";
import { CREATE_ACCOUNT_STEP } from "../../../enum";
import { RegisterForm, Step } from "../../../components/register";
import { RegisterContext } from "../../../context";
import { Button } from "../../../components/button";
import { FcGoogle } from "react-icons/fc";
import { Spacer } from "../../../components/spacer";
import { IRegisterUserDto } from "../../../interface";

export default function Register() {
  const [currentStep, setCurrentStep] = React.useState<CREATE_ACCOUNT_STEP>(
    CREATE_ACCOUNT_STEP.YOUR_DETAILS
  );

  const [payload, setPayload] = React.useState<IRegisterUserDto>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <Layout>
      <RegisterContext.Provider
        value={{
          currentStep: currentStep,
          setCurrentStep: setCurrentStep,
          payload: payload,
          setPayload: setPayload,
        }}
      >
        <section className={styles.leftContainer}>
          {Object.entries(CREATE_ACCOUNT_STEP).map(([key, value], index) => (
            <Step
              key={index}
              title={key.split("_").join(" ").toLowerCase()}
              description={value}
            />
          ))}
        </section>
        <section className={styles.rightContainer}>
          <h2>
            Sign up for SubsTrack now and start managing your subscriptions and
            finances like a pro!
          </h2>
          <p>
            Simply enter your information below to get started and take control
            of your subscriptions today.
          </p>
          <Spacer direction="vertical" size={16} />
          <Button.SecondaryOutline>
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </Button.SecondaryOutline>
          <Spacer direction="vertical" size={16} />
          <div className={styles.or}>
            <p>or</p>
          </div>
          <Spacer direction="vertical" size={16} />
          <RegisterForm />
        </section>
      </RegisterContext.Provider>
    </Layout>
  );
}
