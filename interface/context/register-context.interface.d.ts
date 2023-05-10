import { CREATE_ACCOUNT_STEP } from "../../enum";
import { IRegisterUserDto } from "../dto";

export interface IRegisterContext {
  currentStep: CREATE_ACCOUNT_STEP;
  setCurrentStep: React.Dispatch<React.SetStateAction<CREATE_ACCOUNT_STEP>>;
  payload: IRegisterUserDto;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterUserDto>>;
}
