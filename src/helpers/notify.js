import toast from 'toastr';

toast.options = {
  progressBar: false,
  closeButton: true,
  preventDuplicates: true,
  positionClass: 'toast-top-center',
  closeHtml: `
    <button class="custom-close-btn">
      <img alt="close btn"/>
    </button>
  `,
};

export const notifySuccess = (message) => toast.success(message);
export const notifyError = (message) => toast.error(message);
