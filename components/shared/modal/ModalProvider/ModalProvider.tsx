"use client";
import { AnimatePresence } from "motion/react";
import { nanoid } from "nanoid";
import { usePathname } from "next/navigation";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { ModalProps } from "@/components/shared/modal/Modal";
import { cn } from "@/lib/utils";
import PortalToBody from "@/components/shared/utils/portal-to-body";
import { lockBody } from "@/components/shared/lockBody";

interface ModalItem {
  component: FC<ModalProps>;
  props: Parameters<FC<ModalProps>>[0];
  id: string;
}

interface ModalsContextType {
  open: <Props extends ModalProps>(
    modal: FC<Props>,
    props?: Omit<Props, keyof ModalProps>,
  ) => void;
  close: (modal?: FC<ModalProps>) => void;
  closeAll: () => void;
}

const ModalsContext = createContext<ModalsContextType>({
  open: () => {},
  close: () => {},
  closeAll: () => {},
});

export const useModals = () => useContext(ModalsContext);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const open: ModalsContextType["open"] = (modal, props) => {
    const modalComponent = modal as FC<ModalProps>;
    const modalId = modalComponent.name || nanoid();

    // Check if modal already exists
    const existingModalIndex = modals.findIndex((m) => m.id === modalId);

    if (existingModalIndex !== -1) {
      // Update existing modal props
      setModals((prevModals) => {
        const newModals = [...prevModals];
        newModals[existingModalIndex] = {
          ...newModals[existingModalIndex],
          props: props as unknown as ModalProps,
        };

        return newModals;
      });
    } else {
      // Add new modal
      setModals((prevModals) => [
        ...prevModals,
        {
          component: modalComponent,
          props: props as unknown as ModalProps,
          id: modalId,
        },
      ]);
    }
  };

  const close = useCallback(
    (modal?: FC<ModalProps>) => {
      if (modal) {
        const modalId = modal.name || "";
        setModals((prevModals) => prevModals.filter((m) => m.id !== modalId));
      } else if (modals.length > 0) {
        // Close the most recently opened modal if no component is provided
        setModals((prevModals) => prevModals.slice(0, -1));
      }
    },
    [modals],
  );

  const closeAll = () => {
    setModals([]);
  };

  const pathname = usePathname();

  useEffect(closeAll, [pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (modals.length === 0) return;

      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [modals, close]);

  useEffect(() => {
    lockBody("modal", modals.length > 0);
  }, [modals]);

  return (
    <ModalsContext.Provider
      value={{
        open,
        close,
        closeAll,
      }}
    >
      {children}

      <PortalToBody>
        <AnimatePresence>
          {modals.map((modal) => (
            <modal.component
              key={modal.id}
              {...modal.props}
              setIsOpen={(v) => {
                if (!v) {
                  close(modal.component);
                }
              }}
              isOpen
            />
          ))}
        </AnimatePresence>
      </PortalToBody>
    </ModalsContext.Provider>
  );
}

export function ModalTrigger<Props extends ModalProps>({
  children,
  modal,
  onClick,
  className,
  preventDefault,
  stopPropagation,
  ...props
}: {
  children: ReactNode;
  modal: FC<Props>;
  onClick?: () => void;
  className?: string;
  preventDefault?: boolean;
  stopPropagation?: boolean;
} & Omit<Props, keyof ModalProps>) {
  const { open } = useModals();

  return (
    <div
      className={cn("contents", className)}
      // data-modal-trigger
      tabIndex={-1}
      onClickCapture={(e) => {
        // if (preventDefault) {
        //   e.preventDefault();
        // }
        // if (stopPropagation) {
        //   e.stopPropagation();
        // }
      }}
      onClick={(e) => {
        // if (preventDefault) {
        //   e.preventDefault();
        // }

        // if (stopPropagation) {
        //   e.stopPropagation();
        // }

        open(modal, props as any);
        onClick?.();
      }}
    >
      {children}
    </div>
  );
}

export function ModalClose({ children }: { children: ReactNode }) {
  const { close } = useModals();

  return (
    <div className="contents" tabIndex={-1} onClick={() => close()}>
      {children}
    </div>
  );
}
