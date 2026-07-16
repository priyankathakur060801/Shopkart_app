import api from "./api";

export const downloadInvoice = async (orderId) => {
  try {
    const response = await api.get(`/invoice/${orderId}`, {
      responseType: "blob",
    });

    const file = new Blob([response.data], {
      type: "application/pdf",
    });

    const fileURL = window.URL.createObjectURL(file);

    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `Invoice-${orderId}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(fileURL);
  } catch (error) {
    console.error(error);
    alert("Failed to download invoice");
  }
};
