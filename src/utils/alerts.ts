import Swal from "sweetalert2";

export const fireErrorAlert = (message: string) => {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
  });
};

export const fireSuccessAlert = (message: string) => {
  Swal.fire({
    title: "Success",
    text: message,
    icon: "success",
  });
};
