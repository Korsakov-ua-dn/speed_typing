import { useEffect } from "react";

import { Portal } from "../Portal";

type Props = {
  children: React.ReactNode;
  title?: string;
  onClose: VoidFunction;
};

export const Modal: React.FC<Props> = ({ children, title, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return (
    <Portal>
      <div className="modal">
        <div className="modal__header">
          {title && <span className="modal__title">{title}</span>}

          {/* <CloseIcon onClick={onClose} className="modal__close" /> */}
        </div>

        <div className="modal__body">{children}</div>
      </div>

      <div className="backdrop" onClick={onClose} />
    </Portal>
  );
};
