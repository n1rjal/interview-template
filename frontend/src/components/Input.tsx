import { FC } from "react";
import { FaEyeSlash } from "react-icons/fa6";
type InputType = {
  title?: string;
  isVerify?: boolean;
  message?: string;
  type: React.HTMLInputTypeAttribute;
  isShowSecureText?: boolean;
  isSecureText?: boolean;
  onSecureClick?: () => void;
  required?: boolean;
  className?: string;
  readonly?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | boolean;
  error?: string;
  info?: string | null;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  isPhonenumber?: boolean;
};

const Input: FC<InputType> = ({
  title,
  isVerify,
  message,
  readonly,
  type,
  isSecureText,
  onSecureClick,
  isShowSecureText,
  required,
  className,
  error,
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  isPhonenumber,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <h6 className=" text-light_grey text-base font-normal">
          {title}
          {required && <span style={{ color: "#407BFF" }}>*</span>}
        </h6>
        {isShowSecureText && (
          <div
            className="flex flex-row items-center  text-lg cursor-pointer"
            onClick={onSecureClick}
          >
            {!isSecureText ? <FaEyeSlash /> : <FaEye />}
            <span className="ml-1 text-sm">
              {!isSecureText ? "Hide" : "Show"}
            </span>
          </div>
        )}
      </div>
      <div className="flex-flex-col gap-1">
        <div className="border border-border px-4 py-2 rounded-xl flex flex-row items-center shadow h-11">
          {isPhonenumber && (
            <p className="text-base font-Poppins text-black mr-1">+91</p>
          )}
          <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={type !== "checkbox" ? (value as string) : ""}
            checked={type === "checkbox" ? (value as boolean) : false}
            readOnly={readonly}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full outline-none font-Poppins ${
              readonly && "cursor-not-allowed text-gray-400"
            } text-black text-base`}
          ></input>

          {isVerify && (
            <button className="text-blue  text-sm underline">
              <a href="">Verify</a>
            </button>
          )}
          {message && (
            <span className="text-green  text-sm underline">{message}</span>
          )}
        </div>
        {error && <div className="text-red-500 text-sm ">{error}</div>}
      </div>
    </div>
  );
};
export default Input;
