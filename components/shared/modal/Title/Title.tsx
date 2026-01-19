import Button from "@/components/ui/shadcn/button";
import { ModalClose } from "@/components/shared/modal/ModalProvider/ModalProvider";

import Close from "./_svg/Close";

export default function ModalTitle({
  title,
  onClose,
}: {
  title: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className="py-10 pr-10 pl-16 border-b border-black-alpha-8 flex justify-between items-center">
      <div className="text-label-medium">{title}</div>

      {onClose ? (
        <Button variant="tertiary" onClick={onClose} aria-label="Close">
          <Close />
        </Button>
      ) : (
        <ModalClose>
          <Button variant="tertiary" aria-label="Close">
            <Close />
          </Button>
        </ModalClose>
      )}
    </div>
  );
}
