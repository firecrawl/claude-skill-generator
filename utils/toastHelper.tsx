import { toast, type ExternalToast } from "sonner";

export enum ToastType {
  INFO = "info",
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

const defaultToastOptions: ExternalToast = {
  position: "bottom-right",
  duration: 3000,
};

const variantDotClass = (type?: ToastType) => {
  switch (type) {
    case ToastType.SUCCESS:
      return "bg-accent-forest";
    case ToastType.ERROR:
      return "bg-accent-crimson";
    case ToastType.WARNING:
      return "bg-accent-honey";
    case ToastType.INFO:
    default:
      return "bg-accent-bluetron";
  }
};

export const showToast = (
  title: string,
  message: string | null,
  type?: ToastType,
  duration?: number,
  position?: ExternalToast["position"],
) => {
  const options: ExternalToast = {
    ...defaultToastOptions,
    ...(position ? { position } : {}),
    ...(duration ? { duration } : {}),
  };

  toast.custom(
    () => (
      <div
        className="rounded-12 min-h-64 w-300 flex items-center border border-border-faint bg-white backdrop-blur-md shadow-lg text-accent-black dark:text-accent-white"
        style={{
          paddingLeft: "8px",
          paddingRight: "18px",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        <div className="flex items-start gap-12">
          <span className={`cs-8 rounded-full ${variantDotClass(type)}`} />
          <div className="flex-1 min-w-0">
            <p className="text-label-medium font-[450] whitespace-normal break-words">
              {title}
            </p>
            {message ? (
              <p className="text-body-small opacity-80 mt-4 whitespace-normal break-words">
                {message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    ),
    options,
  );
};

export const showActionToast = (message: string, params: ExternalToast) => {
  const merged: ExternalToast = {
    ...defaultToastOptions,
    ...params,
    duration: params?.duration ?? defaultToastOptions.duration,
    position: params?.position ?? defaultToastOptions.position,
  };

  const renderAction = () => {
    const action = params?.action as any;
    if (!action) return null;
    if (
      typeof action === "object" &&
      action.label &&
      typeof action.onClick === "function"
    ) {
      return (
        <button
          onClick={action.onClick}
          className="rounded-8 bg-heat-100 text-accent-white px-12 py-6 text-label-small"
        >
          {action.label}
        </button>
      );
    }
    return action as React.ReactNode;
  };

  const renderCancel = () => {
    const cancel = params?.cancel as any;
    if (!cancel) return null;
    if (
      typeof cancel === "object" &&
      cancel.label &&
      typeof cancel.onClick === "function"
    ) {
      return (
        <button
          onClick={cancel.onClick}
          className="rounded-8 border border-border-faint bg-transparent text-accent-black dark:text-accent-white px-12 py-6 text-label-small"
        >
          {cancel.label}
        </button>
      );
    }
    return cancel as React.ReactNode;
  };

  toast.custom(
    () => (
      <div className="rounded-12 border border-border-faint bg-white-alpha-72 dark:bg-black-alpha-56 backdrop-blur-md shadow-lg px-12 py-8 text-accent-black dark:text-accent-white">
        <div className="flex items-start gap-12">
          <span className="cs-8 rounded-full bg-accent-bluetron" />
          <div className="flex-1 min-w-0">
            <p className="text-label-medium font-[450] whitespace-normal break-words">
              {message}
            </p>
            {params?.description ? (
              <div className="text-body-small opacity-80 mt-4 break-words">
                {params.description as React.ReactNode}
              </div>
            ) : null}
          </div>
          {params?.action || params?.cancel ? (
            <div className="flex items-center gap-8">
              {renderCancel()}
              {renderAction()}
            </div>
          ) : null}
        </div>
      </div>
    ),
    merged,
  );
};
