import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationCircle,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { readState } from "../operations/query";
import { setState } from "../operations/mutation";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { RESET_TOAST } from "../cache";

export default function Toast() {
  let id;
  const {
    data: {
      readState: { showToast },
    },
  } = useQuery(readState("showToast"));
  const toast = setToast(showToast);

  useEffect(() => {
    id = setTimeout(() => {
      setState({ showToast: RESET_TOAST });
    }, 3000);
    return () => clearTimeout(id);
  }, [showToast]);

  if (!showToast.show) {
    return null;
  }
  return (
    <div
      className={`animate-fade-in-up hover:scale-105 min-w-1/4 transition-all bg-gray-50 border-l-4 ${toast.borderColor} p-4 py-4 shadow-lg flex items-center justify-between mb-6 bottom-3 left-1/2 -translate-x-1/2 fixed transform z-50`}
      role="alert"
    >
      <span className="mx-auto mr-5 ml-0">
        <FontAwesomeIcon
          className={toast.imgColor}
          size='2x'
          icon={toast.img}
        />
      </span>
      <div className="sm:text-left w-full sm:mb-0 mb-3 mr-10 text-left">
        <p className="font-bold mb-1 text-lg">{toast.header}</p>
      <p className="text-grey-dark inline-block">{toast.message}</p>
      </div>
      <FontAwesomeIcon
        onClick={() => {
          clearTimeout(id);
          setState({ showToast: RESET_TOAST });
        }}
        className="flex-no-shrink fill-current text-center text-gray-600 cursor-pointer mb-8" 
        size="lg"
        icon={faTimes} //setStatusImage(showToast.status)
      />
    </div>
  );
}

function setToast(toastInfo) {
  switch (toastInfo.status) {
    case "info":
      return {
        borderColor: "border-blue-500",
        imgColor: "text-blue-500",
        img: faInfoCircle,
        message: toastInfo.message,
        header: toastInfo.header,
      };
      break;
    case "warning":
      return {
        borderColor: "border-yellow-500",
        imgColor: "text-yellow-500",
        img: faExclamationCircle,
        message: toastInfo.message,
        header: toastInfo.header,
      };
      break;
    case "error":
      return {
        borderColor: "border-red-500",
        imgColor: "text-red-500",
        img: faTimes,
        message: toastInfo.message,
        header: toastInfo.header,
      };
      break;
    case "success":
      return {
        borderColor: "border-green-500",
        imgColor: "text-green-500",
        img: faCheck,
        message: toastInfo.message,
        header: toastInfo.header,
      };
      break;
    default:
  }
}
