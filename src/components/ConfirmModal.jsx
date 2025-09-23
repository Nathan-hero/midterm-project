export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  // Literally as it states, confirm modal but specifically for cancelling bookings
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
        <p className="mb-6">Are you sure you want to cancel this booking?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            No
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
