import { ILoginUserDto } from "../dto";

export interface ILoginContext {
  payload: ILoginUserDto;
  setPayload: React.Dispatch<React.SetStateAction<ILoginUserDto>>;
}
