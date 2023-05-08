import { CREATE_ACCOUNT_STEP } from "../../enum";
import { RegisterUserDto } from "../dto";

export interface IRegisterContext {
  currentStep: CREATE_ACCOUNT_STEP;
  setCurrentStep: React.Dispatch<React.SetStateAction<CREATE_ACCOUNT_STEP>>;
  payload: RegisterUserDto;
  setPayload: React.Dispatch<React.SetStateAction<RegisterUserDto>>;
}
