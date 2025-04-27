import React from "react";

type ModalProps = {
  isOpen: boolean;
  items: { id: string | number; name: string }[];
  onClose: () => void;
  onSelectItem: (id: string | number) => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  items,
  onClose,
  onSelectItem,
}) => {
  console.log(items);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h3>Select an Item</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items?.map((item) => (
            <li
              key={item.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
              }}
              onClick={() => {
                onSelectItem(item.id);
                onClose();
              }}
            >
              {item.fullName}
            </li>
          ))}
        </ul>
        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
